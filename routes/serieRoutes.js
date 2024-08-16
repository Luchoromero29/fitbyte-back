import express from 'express';
import { createSerie, getSerieById, getSerieByActivityId, getSeries, updateSerie, deleteSerie } from '../controllers/serieController.js';
import isAuth from '../middlewares/auth.js';
import isAdmin from '../middlewares/admin.js';


const serieRouter = express.Router();

serieRouter.post('/serie',isAuth, createSerie);
serieRouter.get('/serie', isAdmin, getSeries);
serieRouter.get('/serie/activity/:activityId', isAuth, getSerieByActivityId );
serieRouter.get('/serie/:id',isAuth, getSerieById);
serieRouter.put('/serie/:id',isAuth, updateSerie);
serieRouter.delete('/serie/:id',isAuth, deleteSerie);

export default serieRouter;