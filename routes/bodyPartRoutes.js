import express from 'express';
import { createBodyPart, getBodyParts, getBodyPartById, updateBodyPart, deleteBodyPart } from '../controllers/bodyPartController.js';
import isAuth from '../middlewares/auth.js';
import isAdmin from '../middlewares/admin.js';


const bodyPartRouter = express.Router();

bodyPartRouter.post('/bodypart',isAdmin, createBodyPart);
bodyPartRouter.get('/bodypart', isAuth, getBodyParts);
bodyPartRouter.get('/bodypart/:id', isAuth, getBodyPartById);
bodyPartRouter.put('/bodypart/:id',isAdmin, updateBodyPart);
bodyPartRouter.delete('/bodypart/:id',isAdmin, deleteBodyPart);

export default bodyPartRouter;