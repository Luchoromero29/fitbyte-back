import express from 'express';
import {createActivity, getActivityById, getActivitiesByRoutineId, getActivities, updateActivity, deleteActivity} from '../controllers/activityController.js';
import isAuth from '../middlewares/auth.js';



const activityRouter = express.Router();

activityRouter.post('/activity',isAuth, createActivity);
activityRouter.get('/activity', isAuth, getActivities);
activityRouter.get('/activity/:id', isAuth, getActivityById);
activityRouter.get('/activity/routine/:routineId', isAuth, getActivitiesByRoutineId);
activityRouter.put('/activity/:id',isAuth, updateActivity);
activityRouter.delete('/activity/:id',isAuth, deleteActivity);

export default activityRouter;