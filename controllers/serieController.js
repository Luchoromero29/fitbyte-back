
import { Serie } from '../models/index.js';
import { SALT_ROUNDS } from '../config/config.js';

// Crear un nuevo usuario
export const createSerie = async (req, res) => {
  try {
    const { weight, repetition, unit, activityId } = req.body;

    const newSerie = await Serie.create({
      weight,
      repetition,
      unit,
      activityId
    });

    res.status(201).json(newSerie);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Error al crear la serie' });
  }
};

// Obtener todos los usuarios
export const getSeries = async (req, res) => {
  try {
    const series = await Serie.findAll();
    res.status(200).json(series);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las series', error });
  }
};

// Obtener un usuario por ID
export const getSerieById = async (req, res) => {
  try {
    const { id } = req.params;
    const serie = await Serie.findByPk(id);
    if (!serie) {
      return res.status(404).json({ message: 'serie no encontrada' });
    }
    res.status(200).json(serie);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la serie', error });
  }
};

export const getSerieByActivityId = async (req, res) => {
  try {
    const { activityId } = req.params;
    
    const series = await Serie.findAll({ where: { activityId } });
    if (series.length === 0) {
      return res.status(404).json({ message: 'series no encontradas' });
    }
    
    res.status(200).json(series);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las series', error: error.message });
  }
};





export const updateSerie = async (req, res) => {
  try {
    const { id } = req.params;
    const { weight, repetition, unit} = req.body;
    
    const serie = await Serie.findByPk(id);
    if (!serie) {
      return res.status(404).json({ message: 'serie no encontrada' });
    }

    serie.weight = weight !== undefined ? weight : Serie.weight;
    serie.repetition = repetition !== undefined ? repetition : Serie.repetition;
    serie.unit = unit !== undefined ? unit : Serie.unit;
    
    await serie.save();
    res.status(200).json(Serie);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error al actualizar la serie' });
  }
};

// Eliminar un usuario
export const deleteSerie = async (req, res) => {
  try {
    const { id } = req.params;
    const serie = await Serie.findByPk(id);
    console.log(serie);
    
    if (!serie) {
      return res.status(404).json({ message: 'serie no encontrada' });
    }
    await serie.destroy();
    res.status(200).json({ message: 'serie eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el serie', error });
  }
};

