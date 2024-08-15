
import { Routine } from '../models/index.js';
import { SALT_ROUNDS } from '../config/config.js';

// Crear un nuevo usuario
export const createRoutine = async (req, res) => {
  try {
    const { name, day, planId } = req.body;

    const duration = 0

    const newRoutine = await Routine.create({
      name,
      day,
      planId,
      duration
    });

    res.status(201).json(newRoutine);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Error al crear la rutina' });
  }
};

// Obtener todos los usuarios
export const getRoutines = async (req, res) => {
  try {
    const routines = await Routine.findAll();
    res.status(200).json(routines);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las rutinas', error });
  }
};

// Obtener un usuario por ID
export const getRoutineById = async (req, res) => {
  try {
    const { id } = req.params;
    const routine = await Routine.findByPk(id);
    if (!routine) {
      return res.status(404).json({ message: 'rutina no encontrado' });
    }
    res.status(200).json(routine);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la rutina', error });
  }
};

export const getRoutineByPlanId = async (req, res) => {
  try {
    const { planId } = req.params;
    
    const routines = await Routine.findAll({ where: { planId } });
    if (routines.length === 0) {
      return res.status(404).json({ message: 'rutinas no encontradas' });
    }
    
    res.status(200).json(routines);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las rutinas', error: error.message });
  }
};





export const updateRoutine = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, day} = req.body;
    
    const routine = await Routine.findByPk(id);
    if (!routine) {
      return res.status(404).json({ message: 'rutina no encontrada' });
    }

    routine.name = name !== undefined ? name : routine.name;
    routine.day = day !== undefined ? day : routine.day;
    
    await routine.save();
    res.status(200).json(routine);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error al actualizar la rutina' });
  }
};

// Eliminar un usuario
export const deleteRoutine = async (req, res) => {
  try {
    const { id } = req.params;
    const routine = await Routine.findByPk(id);
    if (!routine) {
      return res.status(404).json({ message: 'rutina no encontrada' });
    }
    await routine.destroy();
    res.status(200).json({ message: 'rutina eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el rutina', error });
  }
};

