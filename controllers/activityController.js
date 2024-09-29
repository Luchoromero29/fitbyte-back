import { Activity, Serie, PreferenceUser, Routine, Plan, User } from '../models/index.js';

// Crear una nueva actividad
export const createActivity = async (req, res) => {
  try {
    const { name, focus, note, routineId, rest, postRest, exerciseId } = req.body;

    const newActivity = await Activity.create({
      name,
      focus,
      note,
      routineId,
      rest,
      postRest,
      exerciseId
    });

    const routine = await Routine.findByPk(routineId, {
      include: {
        model: Plan,
        include: {
          model: User,
          include: PreferenceUser // Incluir preferencias del usuario
        }
      }
    });

    if (!routine) {
      return res.status(404).json({ message: 'Routine not found' });
    }

    // Obtener las preferencias del usuario
    const preference = routine.Plan.User.PreferenceUser;


    switch (focus) {
      case "Fuerza":
        for (let i = 0; i < 4; i++) { // Generar 5 series
          await Serie.create({
            weight: 0, // Peso representativo
            repetition: 6, // Repeticiones para fuerza
            unit: "kg",
            activityId: newActivity.id
          });
        }
        break;
    
      case "Hipertrofia":
        for (let i = 0; i < 4; i++) { // Generar 4 series
          await Serie.create({
            weight: 0, // Peso representativo
            repetition: 10, // Repeticiones para hipertrofia
            unit: "kg",
            activityId: newActivity.id
          });
        }
        break;
    
      case "Calentamiento":
        for (let i = 0; i < 3; i++) { // Generar 3 series
          await Serie.create({
            weight: 0, // Peso ligero para calentamiento
            repetition: 12, // Repeticiones para calentamiento
            unit: "kg",
            activityId: newActivity.id
          });
        }
        break;
    
      case "Fallo":
        for (let i = 0; i < 3; i++) { // Generar 3 series
          await Serie.create({
            weight: 0, // Peso representativo
            repetition: 15, // Repeticiones para llegar al fallo
            unit: "kg",
            activityId: newActivity.id
          });
        }
        break;
    
      case "Personalizado":
        await Serie.create({
          weight: 0, // Peso inicial
          repetition: 0, // Repeticiones iniciales
          unit: "kg",
          activityId: newActivity.id
        });
        break;
    
      default:
        console.log("Enfoque no reconocido");
        break;
    }
    

    res.status(201).json({
      ok: true,
      status: 201,
      body: newActivity
    });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Error al crear la actividad' });
  }
};

// Obtener todas las actividades
export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.findAll();
    res.status(200).json({
      ok: true,
      status: 200,
      body: activities
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las actividades', error });
  }
};

// Obtener una actividad por ID
export const getActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByPk(id);
    if (!activity) {
      return res.status(404).json({ message: 'Actividad no encontrada' });
    }
    res.status(200).json({
      ok: true,
      status: 200,
      body: activity
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la actividad', error });
  }
};

// Obtener actividades por routineId
export const getActivitiesByRoutineId = async (req, res) => {
  try {
    const { routineId } = req.params;

    const activities = await Activity.findAll({ where: { routineId } });
    if (activities.length === 0) {
      return res.status(200).json({ message: 'Actividades no encontradas' });
    }

    res.status(200).json({
      ok: true,
      status: 200,
      body: activities
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las actividades', error: error.message });
  }
};

// Actualizar una actividad por ID
export const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { note, rest, focus, postRest, name, exerciseId } = req.body;

    const activity = await Activity.findByPk(id);
    if (!activity) {
      return res.status(404).json({ message: 'Actividad no encontrada' });
    }

    activity.note = note !== undefined ? note : activity.note;
    activity.name = name !== undefined ? name : activity.name;
    activity.rest = rest !== undefined ? rest : activity.rest;
    activity.postRest = postRest !== undefined ? postRest : activity.postRest;
    activity.focus = focus !== undefined ? focus : activity.focus;
    activity.exerciseId = exerciseId !== undefined ? exerciseId : activity.exerciseId;

    await activity.save();
    res.status(200).json({
      ok: true,
      status: 200,
      body: activity,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error al actualizar la actividad' });
  }
};

// Eliminar una actividad por ID
export const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByPk(id);
    if (!activity) {
      return res.status(404).json({ message: 'Actividad no encontrada' });
    }

    await activity.destroy();
    res.status(200).json({
      ok: true,
      status: 200,
      message: 'Actividad eliminada correctamente'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la actividad', error: error.message });
  }
};
