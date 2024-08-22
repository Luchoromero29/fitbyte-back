import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser, getUserByEmail, setPreferenceId } from '../controllers/userController.js';
import isAuth from '../middlewares/auth.js';
import isAdmin from '../middlewares/admin.js';


const userRouter = express.Router();

userRouter.post('/users', createUser);
userRouter.get('/users', isAdmin, getUsers);
userRouter.get('/users/:id', isAuth,  getUserById);
userRouter.put('/users/:id',isAuth, updateUser);
userRouter.put('/users/preference/:id', isAuth, setPreferenceId);
userRouter.delete('/users/:id',isAuth, deleteUser);
userRouter.get('/users/email/:email',   isAuth , getUserByEmail);

export default userRouter;