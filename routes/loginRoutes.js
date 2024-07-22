import express from 'express';
import { login } from '../controllers/loginController.js';

const loginRouter = express.Router();

loginRouter.post('/login', login);
//loginRouter.get('/register', register);


export default loginRouter;