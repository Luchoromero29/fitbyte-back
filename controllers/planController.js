
import { Plan, ActivePlan } from '../models/index.js';
import { SALT_ROUNDS } from '../config/config.js';

// Crear un nuevo usuario
export const createPlan = async (req, res) => {
  try {
    const { name, description, userId } = req.body;


    const newPlan = await Plan.create({
      name,
      description,
      userId
    });

    res.status(201).json({
      ok: true,
      status: 201,
      body: newPlan
    });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Error al crear el plan' });
  }
};

// Obtener todos los usuarios
export const getPlans = async (req, res) => {
  try {
    const plans = await Plan.findAll();
    res.status(200).json({
      ok: true,
      status: 200,
      body: plans
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los planes', error });
  }
};

// Obtener un usuario por ID
export const getPlanById = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await Plan.findByPk(id);
    if (!plan) {
      return res.status(404).json({ message: 'Plan no encontrado' });
    }
    res.status(200).json({
      ok: true,
      status: 200,
      body: plan
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el plan', error });
  }
};

export const getPlanByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const plans = await Plan.findAll({ where: { userId } });
    
    res.status(200).json({
      ok: true,
      status: 200,
      body: plans
    }); // Retorna un array vacío si no hay planes, lo cual es válido.
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los planes', error: error.message });
  }
};





export const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    
    const plan = await Plan.findByPk(id);
    if (!plan) {
      return res.status(404).json({ message: 'Plan no encontrado' });
    }

    plan.name = name !== undefined ? name : plan.name;
    plan.description = description !== undefined ? description : plan.description;

    await plan.save();
    res.status(200).json({
      ok: true,
      status: 200,
      body: plan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error al actualizar el plan' });
  }
};


// Eliminar un plan por ID
export const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await Plan.findByPk(id);
    const activePlan = await ActivePlan.findOne({ where: { planId: id } });
    
    if (!plan) {
      return res.status(404).json({ message: 'Plan no encontrado' });
    }

    if (activePlan) {
      activePlan.planId = null;
      await activePlan.save();  
    }

    await plan.destroy();
    res.status(200).json({ 
      ok: true,
      status: 200,
      message: 'Plan eliminado correctamente' 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el plan', error: error.message });
  }
};


