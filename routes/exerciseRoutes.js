import express from 'express';


import { createExercise, updateExercise, getExerciseById, getExercises, deleteExercise, upload} from '../controllers/exerciseController.js';
import isAuth from '../middlewares/auth.js';
import isAdmin from '../middlewares/admin.js';

const exerciseRouter = express.Router();

exerciseRouter.post('/exercise',isAdmin, upload.single('image'), createExercise);
exerciseRouter.get('/exercise', isAuth, getExercises);
exerciseRouter.get('/exercise/:id', isAuth, getExerciseById);
exerciseRouter.put('/exercise/:id',isAdmin, upload.single('image'), updateExercise);
exerciseRouter.delete('/exercise/:id',isAdmin, deleteExercise);

export default exerciseRouter;