import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser, getUserByEmail } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/users', createUser);
userRouter.get('/users', getUsers);
userRouter.get('/users/:id', getUserById);
userRouter.put('/users/:id', updateUser);
userRouter.delete('/users/:id', deleteUser);
userRouter.get('/users/email/:email', getUserByEmail);

export default userRouter;