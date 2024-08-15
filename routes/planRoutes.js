import express from 'express';
import {createPlan, updatePlan, getPlanById ,getPlans, deletePlan, getPlanByUserId} from '../controllers/planController.js';
import isAuth from '../middlewares/auth.js';
import isAdmin from '../middlewares/admin.js';


const planRouter = express.Router();

planRouter.post('/plan',isAuth, createPlan);
planRouter.get('/plan', isAuth, getPlans);
planRouter.get('/plan/:id', isAuth, getPlanById);
planRouter.get('/plan/user/:userId', isAuth, getPlanByUserId);
planRouter.put('/plan/:id',isAuth, updatePlan);
planRouter.delete('/plan/:id',isAuth, deletePlan);

export default planRouter;