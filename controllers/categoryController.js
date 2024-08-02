
import { Category } from '../models/index.js';
import { SALT_ROUNDS } from '../config/config.js';

// Crear un nuevo usuario
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const newCategory = await Category.create({
      name
    });

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Error al crear la categoria' });
  }
};

// Obtener todos los usuarios
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las categorias', error });
  }
};

// Obtener un usuario por ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Categoria no encontrada' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la categoria', error });
  }
};



export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Categoria no encontrada' });
    }

    category.name = name !== undefined ? name : category.name;

    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error al actualizar la categoria' });
  }
};

// Eliminar un usuario
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Categoria no encontrada' });
    }
    await category.destroy();
    res.status(200).json({ message: 'Categoria eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la categoria', error });
  }
};

