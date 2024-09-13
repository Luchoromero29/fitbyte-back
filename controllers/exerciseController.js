import { Exercise } from '../models/index.js';
import cloudinary from '../config/cloudinary.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configurar Multer para guardar archivos temporalmente en la carpeta 'uploads'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

export const upload = multer({ storage });

// Crear un nuevo ejercicio
export const createExercise = async (req, res) => {
  try {
    const { name, description, categoryId } = req.body;
    const image = req.file;
    
    let urlImage = null;

    // Si hay una imagen, súbela a Cloudinary
    if (image) {
      const result = await cloudinary.uploader.upload(image.path);
      urlImage = result.secure_url;
      // Borrar archivo temporal
      fs.unlinkSync(image.path);
    }

    const newExercise = await Exercise.create({
      name,
      description,
      categoryId,
      urlImage,
    });

    res.status(201).json({
      ok: true,
      status: 201,
      body: newExercise,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      status: 400,
      message: error.message || 'Error al crear el ejercicio',
    });
  }
};

// Obtener todos los ejercicios
export const getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.findAll();
    res.status(200).json({
      ok: true,
      status: 200,
      body: exercises,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: 'Error al obtener los ejercicios',
      error: error.message,
    });
  }
};

// Obtener un ejercicio por ID
export const getExerciseById = async (req, res) => {
  try {
    const { id } = req.params;
    const exercise = await Exercise.findByPk(id);
    if (!exercise) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: 'Ejercicio no encontrado',
      });
    }
    res.status(200).json({
      ok: true,
      status: 200,
      body: exercise,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: 'Error al obtener el ejercicio',
      error: error.message,
    });
  }
};

// Actualizar un ejercicio
export const updateExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, categoryId } = req.body;
    const image = req.file;

    const exercise = await Exercise.findByPk(id);
    if (!exercise) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: 'Ejercicio no encontrado',
      });
    }

    let urlImage = exercise.urlImage;

    // Si hay una nueva imagen, súbela a Cloudinary
    if (image) {
      const result = await cloudinary.uploader.upload(image.path);
      urlImage = result.secure_url;
      // Borrar archivo temporal
      fs.unlinkSync(image.path);
    }

    // Actualizar los campos
    exercise.name = name !== undefined ? name : exercise.name;
    exercise.description = description !== undefined ? description : exercise.description;
    exercise.categoryId = categoryId !== undefined ? categoryId : exercise.categoryId;
    exercise.urlImage = urlImage;

    await exercise.save();

    res.status(200).json({
      ok: true,
      status: 200,
      body: exercise,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message || 'Error al actualizar el ejercicio',
    });
  }
};

// Eliminar un ejercicio
export const deleteExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const exercise = await Exercise.findByPk(id);
    if (!exercise) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: 'Ejercicio no encontrado',
      });
    }

    await exercise.destroy();
    res.status(200).json({
      ok: true,
      status: 200,
      message: 'Ejercicio eliminado correctamente',
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: 'Error al eliminar el ejercicio',
      error: error.message,
    });
  }
};
