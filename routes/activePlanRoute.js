import express from 'express';
import { createActivePlan, getActivePlanById, getActivePlanByUserId, getActivePlanByPlanId, getActivePlans, updateActivePlan, deleteActivePlan } from '../controllers/activePlanController.js';
import isAuth from '../middlewares/auth.js';



const activePlanRouter = express.Router();

activePlanRouter.post('/activePlan',isAuth, createActivePlan);
activePlanRouter.get('/activePlan', isAuth, getActivePlans);
activePlanRouter.get('/activePlan/:id', isAuth, getActivePlanById);
activePlanRouter.get('/activePlan/plan/:planId', isAuth, getActivePlanByPlanId );
activePlanRouter.get('/activePlan/user/:userId', isAuth, getActivePlanByUserId);
activePlanRouter.put('/activePlan/:id',isAuth, updateActivePlan);
activePlanRouter.delete('/activePlan/:id',isAuth, deleteActivePlan);

export default activePlanRouter;