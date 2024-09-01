
import { ActivePlan } from '../models/index.js';
import { SALT_ROUNDS } from '../config/config.js';

// Crear un nuevo usuario
export const createActivePlan = async (req, res) => {
  try {
    const { planId, userId } = req.body;

    const newActivePlan = await ActivePlan.create({
      planId,
      userId    
    });

    res.status(201).json(newActivePlan);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Error al crear el Plan activo' });
  }
};

// Obtener todos los usuarios
export const getActivePlan = async (req, res) => {
  try {
    const activePlan = await ActivePlan.findAll();
    res.status(200).json(activePlan);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las Plan activos', error });
  }
};

// Obtener un usuario por ID
export const getActivePlanById = async (req, res) => {
  try {
    const { id } = req.params;
    const activePlan = await ActivePlan.findByPk(id);
    if (!activePlan) {
      return res.status(404).json({ message: 'Plan activo no encontrado' });
    }
    res.status(200).json(activePlan);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la Plan activo', error });
  }
};

export const getActivePlanByPlanId = async (req, res) => {
    try {
      const { planId } = req.params;
      const activePlan = await ActivePlan.findOne({ where: { planId: planId } });
      if (!activePlan) {
        return res.status(404).json({ message: 'Plan activo no encontrado' });
      }
      res.status(200).json(activePlan);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la Plan activo', error });
    }
  };

  export const getActivePlanByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
      const activePlan = await ActivePlan.findOne({ where: { userId: userId } });
      if (!activePlan) {
        return res.status(404).json({ message: 'Plan activo no encontrado' });
      }
      res.status(200).json(activePlan);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la Plan activo', error });
    }
  };



export const updateActivePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { planId } = req.body;
    
    const activePlan = await ActivePlan.findByPk(id);
    if (!activePlan) {
      return res.status(404).json({ message: 'Plan activo no encontrado' });
    }

    activePlan.planId = planId !== undefined ? planId : ActivePlan.planId;

    await activePlan.save();
    res.status(200).json(activePlan);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error al actualizar el Plan activo' });
  }
};

// Eliminar un usuario
export const deleteActivePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const activePlan = await ActivePlan.findByPk(id);
    if (!activePlan) {
      return res.status(404).json({ message: 'Plan activo no encontrado' });
    }
    await activePlan.destroy();
    res.status(200).json({ message: 'Plan activo eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el Plan activo', error });
  }
};

