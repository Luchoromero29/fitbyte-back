
import { Activity } from '../models/index.js';



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

        res.status(201).json(newActivity);
    } catch (error) {
        res.status(400).json({ message: error.message || 'Error al crear la actividad' });
    }
};

export const getActivitys = async (req, res) => {
    try {
        const activities = await Activity.findAll();
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las actividades', error });
    }
};

export const getActivityById = async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity.findByPk(id);
        if (!activity) {
            return res.status(404).json({ message: 'actividad no encontrada' });
        }
        res.status(200).json(activity);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la actividad', error });
    }
};

export const getActivityByRoutineId = async (req, res) => {
    try {
        const { routineId } = req.params;

        const activities = await Activity.findAll({ where: { routineId } });
        if (activities.length === 0) {
            return res.status(404).json({ message: 'actividades no encontradas' });
        }

        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las actividades', error: error.message });
    }
};

export const updateActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const { note, rest, focus, postRest, name, exerciseId } = req.body;

        const activity = await Activity.findByPk(id);
        if (!activity) {
            return res.status(404).json({ message: 'actividad no encontrada' });
        }

        activity.note = note !== undefined ? note : activity.note;
        activity.name = name !== undefined ? name : activity.name;
        activity.rest = rest !== undefined ? rest : activity.rest;
        activity.postRest = postRest !== undefined ? postRest : activity.postRest;
        activity.focus = focus !== undefined ? focus : activity.focus;
        activity.exerciseId = exerciseId !== undefined ? exerciseId : activity.exerciseId;

        await activity.save();
        res.status(200).json(activity);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error al actualizar la actividad' });
    }
};

export const deleteActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity.findByPk(id);
        if (!activity) {
            return res.status(404).json({ message: 'actividad no encontrada' });
        }
        await activity.destroy();
        res.status(200).json({ message: 'actividad eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la actividad', error });
    }
};

