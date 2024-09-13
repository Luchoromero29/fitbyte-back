import { BodyPart } from '../models/index.js';

// Crear una nueva parte del cuerpo
export const createBodyPart = async (req, res) => {
  try {
    const { name } = req.body;

    const newBodyPart = await BodyPart.create({
      name
    });

    res.status(201).json({
      ok: true,
      status: 201,
      body: newBodyPart
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      status: 400,
      message: error.message || 'Error al crear la parte del cuerpo'
    });
  }
};

// Obtener todas las partes del cuerpo
export const getBodyParts = async (req, res) => {
  try {
    const bodyParts = await BodyPart.findAll();
    res.status(200).json({
      ok: true,
      status: 200,
      body: bodyParts
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: 'Error al obtener las partes del cuerpo',
      error: error.message
    });
  }
};

// Obtener una parte del cuerpo por ID
export const getBodyPartById = async (req, res) => {
  try {
    const { id } = req.params;
    const bodyPart = await BodyPart.findByPk(id);
    if (!bodyPart) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: 'Parte del cuerpo no encontrada'
      });
    }
    res.status(200).json({
      ok: true,
      status: 200,
      body: bodyPart
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: 'Error al obtener la parte del cuerpo',
      error: error.message
    });
  }
};

// Actualizar una parte del cuerpo por ID
export const updateBodyPart = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    const bodyPart = await BodyPart.findByPk(id);
    if (!bodyPart) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: 'Parte del cuerpo no encontrada'
      });
    }

    bodyPart.name = name !== undefined ? name : bodyPart.name;

    await bodyPart.save();
    res.status(200).json({
      ok: true,
      status: 200,
      body: bodyPart
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message || 'Error al actualizar la parte del cuerpo'
    });
  }
};

// Eliminar una parte del cuerpo por ID
export const deleteBodyPart = async (req, res) => {
  try {
    const { id } = req.params;
    const bodyPart = await BodyPart.findByPk(id);
    if (!bodyPart) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: 'Parte del cuerpo no encontrada'
      });
    }

    await bodyPart.destroy();
    res.status(200).json({
      ok: true,
      status: 200,
      message: 'Parte del cuerpo eliminada correctamente'
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: 'Error al eliminar la parte del cuerpo',
      error: error.message
    });
  }
};
