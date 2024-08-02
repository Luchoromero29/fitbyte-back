import express from 'express';
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import isAuth from '../middlewares/auth.js';
import isAdmin from '../middlewares/admin.js';


const categoryRouter = express.Router();

categoryRouter.post('/category',isAdmin, createCategory);
categoryRouter.get('/category', isAuth, getCategories);
categoryRouter.get('/category/:id', isAuth, getCategoryById);
categoryRouter.put('/category/:id',isAdmin, updateCategory);
categoryRouter.delete('/category/:id',isAdmin, deleteCategory);

export default categoryRouter;