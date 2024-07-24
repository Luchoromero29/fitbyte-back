import express from 'express';
import { login, logout  } from '../controllers/singinController.js';
import isAuth from '../middlewares/auth.js';

const singinRouter = express.Router();

singinRouter.post('/login', login);
singinRouter.post('/logout', logout);
singinRouter.get('/checkAuthStatus', isAuth, (req, res) => {
    res.json(req.user)
})
//loginRouter.get('/register', register);


export default singinRouter;