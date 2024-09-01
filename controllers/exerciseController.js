
import { Exercise } from '../models/index.js';
import cloudinary from '../config/cloudinary.js';
import multer from 'multer';
import path from 'path';

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

// Crear un nuevo usuario
export const createExercise = async (req, res) => {
  try {
    const { name, description, categoryId } = req.body;
    const image = req.file

    let urlImage = null;

    if(image) {
      const result = await cloudinary.uploader.upload(image.path);
      urlImage = result.secure_url; 
    }
    const newExercise = await Exercise.create({
      name,
      description,
      categoryId,
      urlImage,
    });

    res.status(201).json(newExercise);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Error al crear el ejercicio' });
  }
};

// Obtener todos los usuarios
export const getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.findAll();

    const exercisesWithImages = exercises.map(exercise => {
      const base64Image = exercise.image ? exercise.image.toString('base64') : null;
      const imageUrl = base64Image ? `data:image/jpeg;base64,${base64Image}` : null;

      return {
          ...exercise.toJSON(),
          imageUrl,
      };
  });

    res.status(200).json(exercisesWithImages) ;
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los ejercicios', error });
  }
};

// Obtener un usuario por ID
export const getExerciseById = async (req, res) => {
  try {
    const { id } = req.params;
    const exercise = await Exercise.findByPk(id);
    if (!exercise) {
      return res.status(404).json({ message: 'Ejercicio no encontrado' });
    }
    res.status(200).json(exercise);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el ejercicio', error });
  }
};



export const updateExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, categoryId } = req.body;
    const image = req.file
    console.log(name, description, categoryId);
    
    const exercise = await Exercise.findByPk(id);
    if (!exercise) {
      return res.status(404).json({ message: 'Ejercicio no encontrado' });
    }

    let urlImage = undefined;

    if(image) {
      const result = await cloudinary.uploader.upload(image.path);
      urlImage = result.secure_url; 
    }

    exercise.name = name !== undefined ? name : exercise.name;
    exercise.description = description !== undefined ? description : exercise.description;
    exercise.categoryId = categoryId !== undefined ? categoryId : exercise.categoryId;
    exercise.urlImage = urlImage !== undefined ? urlImage : exercise.urlImage;

    await exercise.save();
    res.status(200).json(exercise);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error al actualizar el ejercicio' });
  }
};

// Eliminar un usuario
export const deleteExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const exercise = await Exercise.findByPk(id);
    if (!exercise) {
      return res.status(404).json({ message: 'Ejercicio no encontrado' });
    }
    await exercise.destroy();
    res.status(200).json({ message: 'Ejercicio eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el ejercicio', error });
  }
};

