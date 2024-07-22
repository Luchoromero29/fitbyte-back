import bcrypt from 'bcrypt';

import { User } from '../models/index.js';
import { SALT_ROUNDS } from '../config/config.js';

// Crear un nuevo usuario
export const createUser = async (req, res) => {
  try {

    const { name, lastname, email, password, weight, height, unit, birthdate  } = req.body;
    const rolId = 2
    const BMI = calcBMI(weight, height)
    const active = true

    if (!validationPassword) throw new Error() 
    if (existEmail) throw new Error("El email ya esta registrado") 

    //hasheo de password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    const newUser = await User.create({ 
      rolId,
      name, 
      lastname, 
      email, 
      hashedPassword, 
      weight, 
      height, 
      unit, 
      birthdate,
      BMI,
      active
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
};

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error });
  }
};

// Obtener un usuario por ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error });
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({where: {email: email}});
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error });
  }
};



export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname, email, password, weight, height, unit, birthdate } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.name = name !== undefined ? name : user.name;
    user.lastname = lastname !== undefined ? lastname : user.lastname;
    user.email = email !== undefined ? email : user.email;
    user.password = password !== undefined ? password : user.password;
    user.weight = weight !== undefined ? weight : user.weight;
    user.height = height !== undefined ? height : user.height;
    user.unit = unit !== undefined ? unit : user.unit;
    user.birthdate = birthdate !== undefined ? birthdate : user.birthdate;

    user.BMI = calcBMI(user.weight, user.height);

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error });
  }
};




// Eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    await user.destroy();
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error });
  }
};

const calcBMI = (weight, height) => {
  return (weight / (height ** 2))
}

const validationPassword = (password) => {
  if (typeof password !== "string") throw new Error('La contraseña debe ser una cadeba de texto')
  if (password.length < 8) throw new Error('La contraseña debe tener al menos 8 caracteres de largo')
  const regex = /\d/
  if (!regex.test(password)) throw new Error ('La contraseña debe tener al menos 1 numero')
  return true;
}

const existEmail = (email) => {
  return User.findOne({where: {email: email}})
}
