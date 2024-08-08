import express from 'express';
import {createPlan, updatePlan, getPlanById ,getPlans, deletePlan} from '../controllers/planController.js';
import isAuth from '../middlewares/auth.js';
import isAdmin from '../middlewares/admin.js';


const planRouter = express.Router();

planRouter.post('/plan',isAdmin, createPlan);
planRouter.get('/plan', isAuth, getPlans);
planRouter.get('/plan/:id', isAuth, getPlanById);
planRouter.put('/plan/:id',isAdmin, updatePlan);
planRouter.delete('/plan/:id',isAdmin, deletePlan);

export default planRouter;