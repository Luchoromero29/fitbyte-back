import bcrypt from 'bcrypt';
import { User, PreferenceUser } from '../models/index.js';
import { SALT_ROUNDS } from '../config/config.js';

// Crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    const { name, lastname, email, password, birthdate } = req.body;
    const rolId = 2;
    const active = true;
    console.log(name, lastname, email, password, birthdate);
    
    validationPassword(password);
    await existEmail(email);

    // Hash de password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await User.create({
      rolId,
      name,
      lastname,
      email,
      password: hashedPassword,
      birthdate,
      active
    });

    await PreferenceUser.create({
      userId: newUser.id,
      unitWeight: "KG",
      language: "ES",
      theme: "light",
      customMode: false
    });


    res.status(201).json({
      ok: true,
      status: 201,
      body: newUser
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      status: 400,
      body: { message: error.message || 'Error al crear el usuario' }
    });
  }
};

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      ok: true,
      status: 200,
      body: users
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      body: { message: 'Error al obtener los usuarios', error }
    });
  }
};

// Obtener un usuario por ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        ok: false,
        status: 404,
        body: { message: 'Usuario no encontrado' }
      });
    }
    res.status(200).json({
      ok: true,
      status: 200,
      body: user
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      body: { message: 'Error al obtener el usuario', error }
    });
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        ok: false,
        status: 404,
        body: { message: 'Usuario no encontrado' }
      });
    }
    res.status(200).json({
      ok: true,
      status: 200,
      body: user
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      body: { message: 'Error al obtener el usuario', error }
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname, email, password, birthdate, preferenceId } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        ok: false,
        status: 404,
        body: { message: 'Usuario no encontrado' }
      });
    }

    user.name = name !== undefined ? name : user.name;
    user.lastname = lastname !== undefined ? lastname : user.lastname;
    user.email = email !== undefined ? email : user.email;

    if (password !== undefined) {
      validationPassword(password);
      user.password = await bcrypt.hash(password, SALT_ROUNDS);
    }

    user.birthdate = birthdate !== undefined ? birthdate : user.birthdate;
    user.preferenceId = preferenceId !== undefined ? preferenceId : user.preferenceId;

    await user.save();
    res.status(200).json({
      ok: true,
      status: 200,
      body: user
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      body: { message: error.message || 'Error al actualizar el usuario' }
    });
  }
};

export const setPreferenceId = async (req, res) => {
  try {
    const { id } = req.params;
    const { preferenceId } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        ok: false,
        status: 404,
        body: { message: 'Usuario no encontrado' }
      });
    }
    user.preferenceId = preferenceId;
    await user.save();
    res.status(200).json({
      ok: true,
      status: 200,
      body: user
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      body: { message: error.message || 'Error al actualizar el usuario' }
    });
  }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        ok: false,
        status: 404,
        body: { message: 'Usuario no encontrado' }
      });
    }
    await user.destroy();
    res.status(200).json({
      ok: true,
      status: 200,
      body: { message: 'Usuario eliminado' }
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      body: { message: 'Error al eliminar el usuario', error }
    });
  }
};

// Función para calcular el IMC
const calcBMI = (weight, height) => {
  return weight / (height ** 2);
};

// Función para validar la contraseña
const validationPassword = (password) => {
  if (typeof password !== "string") throw new Error('La contraseña debe ser una cadena de texto');
  if (password.length < 8) throw new Error('La contraseña debe tener al menos 8 caracteres de largo');
  const regex = /\d/;
  if (!regex.test(password)) throw new Error('La contraseña debe tener al menos 1 número');
  return true;
};

// Función para verificar si el email ya existe
const existEmail = async (email) => {
  const exist = await User.findOne({ where: { email } });
  if (exist) throw new Error('Email ya registrado');
  return exist;
};
