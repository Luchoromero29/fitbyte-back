import { PreferenceUser, User } from '../models/index.js';

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

    const user =  await User.findByPk(userId);
    if (user) {
      user.preferenceId = newPreferenceUser.id;
      await user.save();
    }

    res.status(201).json({
      ok: true,
      status: 201,
      body: newPreferenceUser
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      status: 400,
      body: { message: error.message || 'Error al crear las preferencias del usuario' }
    });
  }
};

// Obtener todos los usuarios
export const getPreferencesUsers = async (req, res) => {
  try {
    const preferences = await PreferenceUser.findAll();
    res.status(200).json({
      ok: true,
      status: 200,
      body: preferences
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      body: { message: 'Error al obtener las preferencias', error }
    });
  }
};

// Obtener una preferencia por ID
export const getPreferenceUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const preference = await PreferenceUser.findByPk(id);
    if (!preference) {
      return res.status(404).json({
        ok: false,
        status: 404,
        body: { message: 'Preferencia no encontrada' }
      });
    }
    res.status(200).json({
      ok: true,
      status: 200,
      body: preference
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      body: { message: 'Error al obtener las preferencias', error }
    });
  }
};

// Obtener una preferencia por UserId
export const getPreferenceUserByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const preference = await PreferenceUser.findOne({ where: { userId } });
    if (!preference) {
      return res.status(404).json({
        ok: false,
        status: 404,
        body: { message: 'Preferencia no encontrada' }
      });
    }
    res.status(200).json({
      ok: true,
      status: 200,
      body: preference
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      body: { message: 'Error al obtener las preferencias', error: error.message }
    });
  }
};

// Actualizar preferencia de usuario
export const updatePreferenceUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { unitWeight, language, theme } = req.body;

    const preference = await PreferenceUser.findByPk(id);
    if (!preference) {
      return res.status(404).json({
        ok: false,
        status: 404,
        body: { message: 'Preferencia no encontrada' }
      });
    }

    preference.unitWeight = unitWeight !== undefined ? unitWeight : preference.unitWeight;
    preference.language = language !== undefined ? language : preference.language;
    preference.theme = theme !== undefined ? theme : preference.theme;

    await preference.save();
    res.status(200).json({
      ok: true,
      status: 200,
      body: preference
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      body: { message: error.message || 'Error al actualizar las preferencias' }
    });
  }
};

// Eliminar una preferencia
export const deletePreferenceUser = async (req, res) => {
  try {
    const { id } = req.params;
    const preference = await PreferenceUser.findByPk(id);
    if (!preference) {
      return res.status(404).json({
        ok: false,
        status: 404,
        body: { message: 'Preferencia no encontrada' }
      });
    }
    await preference.destroy();
    res.status(200).json({
      ok: true,
      status: 200,
      body: { message: 'Preferencia eliminada' }
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      body: { message: 'Error al eliminar la preferencia', error }
    });
  }
};
