import express from 'express';
import {createRoutine, getRoutines, getRoutineById, getRoutineByPlanId, updateRoutine, deleteRoutine} from '../controllers/routineController.js';
import isAuth from '../middlewares/auth.js';



const routineRouter = express.Router();

routineRouter.post('/routine',isAuth, createRoutine);
routineRouter.get('/routine', isAuth, getRoutines);
routineRouter.get('/routine/:id', isAuth, getRoutineById);
routineRouter.get('/routine/plan/:planId', isAuth, getRoutineByPlanId);
routineRouter.put('/routine/:id',isAuth, updateRoutine);
routineRouter.delete('/routine/:id',isAuth, deleteRoutine);

export default routineRouter;