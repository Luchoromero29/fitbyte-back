import { ActivePlan, Plan, User } from '../models/index.js';
import { SALT_ROUNDS } from '../config/config.js';

// Crear un nuevo plan activo
export const createActivePlan = async (req, res) => {
  try {
    const { planId, userId } = req.body;

    const newActivePlan = await ActivePlan.create({
      planId,
      userId
    });

    res.status(201).json({
      ok: true,
      status: 201,
      body: newActivePlan
    });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Error al crear el Plan activo' });
  }
};

// Obtener todos los planes activos
export const getActivePlans = async (req, res) => {
  try {
    const activePlans = await ActivePlan.findAll();
    res.status(200).json({
      ok: true,
      status: 200,
      body: activePlans
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los Planes activos', error });
  }
};

// Obtener un plan activo por ID
export const getActivePlanById = async (req, res) => {
  try {
    const { id } = req.params;
    const activePlan = await ActivePlan.findByPk(id);
    if (!activePlan) {
      return res.status(205).json({ message: 'Plan activo no encontrado' });
    }
    res.status(200).json({
      ok: true,
      status: 200,
      body: activePlan
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el Plan activo', error });
  }
};

// Obtener un plan activo por planId
export const getActivePlanByPlanId = async (req, res) => {
  try {
    const { planId } = req.params;
    const activePlan = await ActivePlan.findOne({ where: { planId } });
    if (!activePlan) {
      return res.status(205).json({ message: 'Plan activo no encontrado' });
    }
    res.status(200).json({
      ok: true,
      status: 200,
      body: activePlan
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el Plan activo', error });
  }
};

// Obtener un plan activo por userId
export const getActivePlanByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const activePlan = await ActivePlan.findOne({ where: { userId }});

    const plan = await Plan.findByPk(activePlan.planId);

    

    if (!plan) {
      return res.status(206).json({ message: 'Plan activo no encontrado' });
    }
    res.status(200).json({
      ok: true,
      status: 200,
      body: plan
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el Plan activo', error });
  }
};

// Actualizar un plan activo por ID
export const updateActivePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { planId } = req.body;
    
    const activePlan = await ActivePlan.findByPk(id);
    if (!activePlan) {
      return res.status(404).json({ message: 'Plan activo no encontrado' });
    }

    activePlan.planId = planId !== undefined ?  planId : null;

    await activePlan.save();
    res.status(200).json({
      ok: true,
      status: 200,
      body: activePlan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error al actualizar el Plan activo' });
  }
};

export const updateActivePlanByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const { planId } = req.body;
    
    const activePlan = await ActivePlan.findOne({ where: { userId }});
    if (!activePlan) {
      return res.status(404).json({ message: 'Plan activo no encontrado' });
    }

    activePlan.planId = planId !== undefined ?  planId : null;

    await activePlan.save();
    res.status(200).json({
      ok: true,
      status: 200,
      body: activePlan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error al actualizar el Plan activo' });
  }
};

// Eliminar un plan activo por ID
export const deleteActivePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const activePlan = await ActivePlan.findByPk(id);
    if (!activePlan) {
      return res.status(404).json({ message: 'Plan activo no encontrado' });
    }

    await activePlan.destroy();
    res.status(200).json({
      ok: true,
      status: 200,
      message: 'Plan activo eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el Plan activo', error: error.message });
  }
};
