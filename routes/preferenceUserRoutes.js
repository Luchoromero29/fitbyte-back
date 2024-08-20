import express from 'express';
import {createPreferenceUser, updatePreferenceUser, getPreferenceUserById , getPreferencesUsers, deletePreferenceUser, getPreferenceUserByUserId} from '../controllers/preferenceUserController.js';
import isAuth from '../middlewares/auth.js';
import isAdmin from '../middlewares/admin.js';


const preferenceUserRouter = express.Router();

preferenceUserRouter.post('/preference', createPreferenceUser);
preferenceUserRouter.get('/preference', isAdmin, getPreferencesUsers);
preferenceUserRouter.get('/preference/:id', isAuth, getPreferenceUserById);
preferenceUserRouter.get('/preference/user/:userId', isAuth, getPreferenceUserByUserId);
preferenceUserRouter.put('/preference/:id',isAuth, updatePreferenceUser);
preferenceUserRouter.delete('/preference/:id',isAuth, deletePreferenceUser);


export default preferenceUserRouter;