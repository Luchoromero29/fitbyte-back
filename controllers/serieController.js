import { Serie } from '../models/index.js';

// Crear una nueva serie
export const createSerie = async (req, res) => {
  try {
    const { weight, repetition, unit, activityId } = req.body;
    
    const newSerie = await Serie.create({
      weight,
      repetition,
      unit,
      activityId
    });

    res.status(201).json({
      ok: true,
      status: 201,
      body: newSerie
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      status: 400,
      body: { message: error.message || 'Error al crear la serie' }
    });
  }
};

// Obtener todas las series
export const getSeries = async (req, res) => {
  try {
    const series = await Serie.findAll();
    res.status(200).json({
      ok: true,
      status: 200,
      body: series
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      body: { message: 'Error al obtener las series', error }
    });
  }
};

// Obtener una serie por ID
export const getSerieById = async (req, res) => {
  try {
    const { id } = req.params;
    const serie = await Serie.findByPk(id);
    if (!serie) {
      return res.status(404).json({
        ok: false,
        status: 404,
        body: { message: 'Serie no encontrada' }
      });
    }
    res.status(200).json({
      ok: true,
      status: 200,
      body: serie
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      body: { message: 'Error al obtener la serie', error }
    });
  }
};

// Obtener series por activityId
export const getSerieByActivityId = async (req, res) => {
  try {
    const { activityId } = req.params;
    
    const series = await Serie.findAll({ where: { activityId } });
    if (series.length === 0) {
      return res.status(404).json({
        ok: false,
        status: 404,
        body: { message: 'Series no encontradas' }
      });
    }
    
    res.status(200).json({
      ok: true,
      status: 200,
      body: series
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      body: { message: 'Error al obtener las series', error: error.message }
    });
  }
};

// Actualizar una serie
export const updateSerie = async (req, res) => {
  try {
    const { id } = req.params;
    const { weight, repetition, unit } = req.body;
    
    const serie = await Serie.findByPk(id);
    if (!serie) {
      return res.status(404).json({
        ok: false,
        status: 404,
        body: { message: 'Serie no encontrada' }
      });
    }

    serie.weight = weight !== undefined ? weight : serie.weight;
    serie.repetition = repetition !== undefined ? repetition : serie.repetition;
    serie.unit = unit !== undefined ? unit : serie.unit;
    
    await serie.save();
    res.status(200).json({
      ok: true,
      status: 200,
      body: serie
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      body: { message: error.message || 'Error al actualizar la serie' }
    });
  }
};

// Eliminar una serie
export const deleteSerie = async (req, res) => {
  try {
    const { id } = req.params;
    const serie = await Serie.findByPk(id);
    if (!serie) {
      return res.status(404).json({
        ok: false,
        status: 404,
        body: { message: 'Serie no encontrada' }
      });
    }
    await serie.destroy();
    res.status(200).json({
      ok: true,
      status: 200,
      body: { message: 'Serie eliminada' }
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      body: { message: 'Error al eliminar la serie', error }
    });
  }
};
