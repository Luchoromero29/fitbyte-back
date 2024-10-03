import express from 'express';
import {createRoutine, getRoutines, getRoutineById, getRoutineByPlanId, updateRoutine, deleteRoutine, getRoutinesFromActivePlanByUserId, getTimeForRoutine} from '../controllers/routineController.js';
import isAuth from '../middlewares/auth.js';



const routineRouter = express.Router();

routineRouter.post('/routine',isAuth, createRoutine);
routineRouter.get('/routine', isAuth, getRoutines);
routineRouter.get('/routine/:id', isAuth, getRoutineById);
routineRouter.get('/routine/plan/:planId', isAuth, getRoutineByPlanId);
routineRouter.get('/routine/activeplan/:userId', isAuth, getRoutinesFromActivePlanByUserId);
routineRouter.get('/routine/duration/:id', isAuth, getTimeForRoutine);
routineRouter.put('/routine/:id',isAuth, updateRoutine);
routineRouter.delete('/routine/:id',isAuth, deleteRoutine);

export default routineRouter;