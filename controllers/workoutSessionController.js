import { workoutSession  } from '../models/index.js';

// Crear una nueva WokSes
export const createWokSes = async (req, res) => {
  try {
    const { routineId } = req.body;
    
    const timeNow = new Date();


    const newWokSes = await workoutSession.create({
      routineId,
      startTime: timeNow,
      endTime: null,
      completed: false
    });

    res.status(201).json({
      ok: true,
      status: 201,
      body: newWokSes
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      status: 400,
      body: { message: error.message || 'Error al crear la WokSes' }
    });
  }
};

// Obtener todas las WokSess
export const getWokSess = async (req, res) => {
  try {
    const wokSess = await workoutSession.findAll();
    res.status(200).json({
      ok: true,
      status: 200,
      body: wokSess
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      body: { message: 'Error al obtener las WokSess', error }
    });
  }
};

// Obtener una WokSes por ID
export const getWokSesById = async (req, res) => {
  try {
    const { id } = req.params;
    const wokSes = await workoutSession.findByPk(id);
    if (!wokSes) {
      return res.status(404).json({
        ok: false,
        status: 404,
        body: { message: 'WokSes no encontrada' }
      });
    }
    res.status(200).json({
      ok: true,
      status: 200,
      body: wokSes
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      body: { message: 'Error al obtener la WokSes', error }
    });
  }
};





// Eliminar una WokSes
export const deleteWokSes = async (req, res) => {
  try {
    const { id } = req.params;
    const wokSes = await workoutSession.findByPk(id);
    if (!wokSes) {
      return res.status(404).json({
        ok: false,
        status: 404,
        body: { message: 'WokSes no encontrada' }
      });
    }
    await wokSes.destroy();
    res.status(200).json({
      ok: true,
      status: 200,
      body: { message: 'WokSes eliminada' }
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      body: { message: 'Error al eliminar la WokSes', error }
    });
  }
};

export const completedWokSes = async (req, res) => {
  try {
    const { id } = req.params;
    const wokSes = await workoutSession.findByPk(id);
    if (!wokSes) {
      return res.status(404).json({
        ok: false,
        status: 404,
        body: { message: 'WokSes no encontrada' }
      });
    }
    await wokSes.update({ completed: !wokSes.completed,
        endTime: new Date()  // Cuando la WokSes se completa, se actualiza el endTime con la hora actual.  
     });
    res.status(200).json({
      ok: true,
      status: 200,
      body: { message: 'WokSes actualizada' }
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      body: { message: 'Error al eliminar la WokSes', error }
    });
  }
}