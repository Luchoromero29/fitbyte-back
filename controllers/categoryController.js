import { Category } from '../models/index.js';

// Crear una nueva categoría
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const newCategory = await Category.create({ name });

    res.status(201).json({
      ok: true,
      status: 201,
      body: newCategory,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      status: 400,
      message: error.message || 'Error al crear la categoría',
    });
  }
};

// Obtener todas las categorías
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json({
      ok: true,
      status: 200,
      body: categories,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: 'Error al obtener las categorías',
      error: error.message,
    });
  }
};

// Obtener una categoría por ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: 'Categoría no encontrada',
      });
    }
    res.status(200).json({
      ok: true,
      status: 200,
      body: category,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: 'Error al obtener la categoría',
      error: error.message,
    });
  }
};

// Actualizar una categoría por ID
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: 'Categoría no encontrada',
      });
    }

    category.name = name !== undefined ? name : category.name;

    await category.save();
    res.status(200).json({
      ok: true,
      status: 200,
      body: category,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message || 'Error al actualizar la categoría',
    });
  }
};

// Eliminar una categoría por ID
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: 'Categoría no encontrada',
      });
    }
    await category.destroy();
    res.status(200).json({
      ok: true,
      status: 200,
      message: 'Categoría eliminada correctamente',
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: 'Error al eliminar la categoría',
      error: error.message,
    });
  }
};
