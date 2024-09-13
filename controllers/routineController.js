import { Routine } from '../models/index.js';

// Crear una nueva rutina
export const createRoutine = async (req, res) => {
  try {
    const { name, day, planId } = req.body;
    const duration = 0;

    const newRoutine = await Routine.create({
      name,
      day,
      planId,
      duration
    });

    res.status(201).json({
      ok: true,
      status: 201,
      body: newRoutine
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      status: 400,
      body: { message: error.message || 'Error al crear la rutina' }
    });
  }
};

// Obtener todas las rutinas
export const getRoutines = async (req, res) => {
  try {
    const routines = await Routine.findAll();
    res.status(200).json({
      ok: true,
      status: 200,
      body: routines
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      body: { message: 'Error al obtener las rutinas', error }
    });
  }
};

// Obtener una rutina por ID
export const getRoutineById = async (req, res) => {
  try {
    const { id } = req.params;
    const routine = await Routine.findByPk(id);
    if (!routine) {
      return res.status(404).json({
        ok: false,
        status: 404,
        body: { message: 'Rutina no encontrada' }
      });
    }
    res.status(200).json({
      ok: true,
      status: 200,
      body: routine
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      body: { message: 'Error al obtener la rutina', error }
    });
  }
};

// Obtener rutinas por planId
export const getRoutineByPlanId = async (req, res) => {
  try {
    const { planId } = req.params;
    const routines = await Routine.findAll({ where: { planId } });

    if (routines.length === 0) {
      return res.status(200).json({
        ok: false,
        status: 200,
        body: { message: 'Rutinas no encontradas' }
      });
    }

    res.status(200).json({
      ok: true,
      status: 200,
      body: routines
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      body: { message: 'Error al obtener las rutinas', error: error.message }
    });
  }
};

// Actualizar una rutina
export const updateRoutine = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, day } = req.body;

    const routine = await Routine.findByPk(id);
    if (!routine) {
      return res.status(404).json({
        ok: false,
        status: 404,
        body: { message: 'Rutina no encontrada' }
      });
    }

    routine.name = name !== undefined ? name : routine.name;
    routine.day = day !== undefined ? day : routine.day;

    await routine.save();
    res.status(200).json({
      ok: true,
      status: 200,
      body: routine
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      body: { message: error.message || 'Error al actualizar la rutina' }
    });
  }
};

// Eliminar una rutina
export const deleteRoutine = async (req, res) => {
  try {
    const { id } = req.params;
    const routine = await Routine.findByPk(id);
    if (!routine) {
      return res.status(404).json({
        ok: false,
        status: 404,
        body: { message: 'Rutina no encontrada' }
      });
    }
    await routine.destroy();
    res.status(200).json({
      ok: true,
      status: 200,
      body: { message: 'Rutina eliminada' }
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      body: { message: 'Error al eliminar la rutina', error }
    });
  }
};
