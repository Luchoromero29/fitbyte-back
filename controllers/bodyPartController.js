
import { BodyPart } from '../models/index.js';
import { SALT_ROUNDS } from '../config/config.js';

// Crear un nuevo usuario
export const createBodyPart = async (req, res) => {
  try {
    const { name } = req.body;

    const newBodyPart = await BodyPart.create({
      name
    });

    res.status(201).json(newBodyPart);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Error al crear la parte del cuerpo' });
  }
};

// Obtener todos los usuarios
export const getBodyParts = async (req, res) => {
  try {
    const bodyParts = await BodyPart.findAll();
    res.status(200).json(bodyParts);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las partes del cuerpo', error });
  }
};

// Obtener un usuario por ID
export const getBodyPartById = async (req, res) => {
  try {
    const { id } = req.params;
    const bodyPart = await BodyPart.findByPk(id);
    if (!bodyPart) {
      return res.status(404).json({ message: 'parte del cuerpo no encontrada' });
    }
    res.status(200).json(bodyPart);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la parte del cuerpo', error });
  }
};



export const updateBodyPart = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    const bodyPart = await BodyPart.findByPk(id);
    if (!bodyPart) {
      return res.status(404).json({ message: 'parte del cuerpo no encontrada' });
    }

    bodyPart.name = name !== undefined ? name : BodyPart.name;

    await bodyPart.save();
    res.status(200).json(bodyPart);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error al actualizar la parte del cuerpo' });
  }
};

// Eliminar un usuario
export const deleteBodyPart = async (req, res) => {
  try {
    const { id } = req.params;
    const bodyPart = await BodyPart.findByPk(id);
    if (!bodyPart) {
      return res.status(404).json({ message: 'parte del cuerpo no encontrada' });
    }
    await bodyPart.destroy();
    res.status(200).json({ message: 'parte del cuerpo eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la parte del cuerpo', error });
  }
};

