
import { PreferenceUser } from '../models/index.js';
import { SALT_ROUNDS } from '../config/config.js';

// Crear un nuevo usuario
export const createPreferenceUser = async (req, res) => {
  try {
    const { userId, unitWeight, language, theme } = req.body;

    const newPreferenceUser = await PreferenceUser.create({
      userId,
      unitWeight,
      language,
      theme
    });

    res.status(201).json(newPreferenceUser);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Error al crear las preferencias del usuario' });
  }
};

// Obtener todos los usuarios
export const getPreferencesUsers = async (req, res) => {
  try {
    const preferences = await PreferenceUser.findAll();
    res.status(200).json(preferences);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las preferencias', error });
  }
};

// Obtener un usuario por ID
export const getPreferenceUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const preference = await PreferenceUser.findByPk(id);
    if (!preference) {
      return res.status(404).json({ message: 'preferencias no encontradas' });
    }
    res.status(200).json(preference);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las preferencias', error });
  }
};

export const getPreferenceUserByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const preference = await PreferenceUser.findOne({ where: { userId } });
    if (!preference) {
      return res.status(404).json({ message: 'preferencias no encontradas' });
    }
    
    res.status(200).json(preference);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las rutinas', error: error.message });
  }
};





export const updatePreferenceUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { unitWeight, language, theme} = req.body;
    
    const preference = await PreferenceUser.findByPk(id);
    if (!preference) {
      return res.status(404).json({ message: 'preferencia no encontrada' });
    }

    preference.unitWeight = unitWeight !== undefined ? unitWeight : preference.unitWeight;
    preference.language = language !== undefined ? language : preference.language;
    preference.theme = theme !== undefined ? theme : preference.theme;
    
    await preference.save();
    res.status(200).json(preference);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error al actualizar las preferencias' });
  }
};

// Eliminar un usuario
export const deletePreferenceUser = async (req, res) => {
  try {
    const { id } = req.params;
    const preference = await PreferenceUser.findByPk(id);
    if (!preference) {
      return res.status(404).json({ message: 'preferencias no encontradas' });
    }
    await preference.destroy();
    res.status(200).json({ message: 'preferencia eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la preferencia', error });
  }
};

