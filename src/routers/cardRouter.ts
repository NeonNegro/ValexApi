import { Router } from "express";
import * as cardController from '../controllers/cardController.js';
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import activateCardSchema from "../schemas/activateCardSchema.js";
import newCardSchema from "../schemas/newCardSchema.js";


const cardRouter = Router();

cardRouter.post('/cards', validateSchemaMiddleware(newCardSchema), cardController.createCard);
cardRouter.post('/cards/activate', validateSchemaMiddleware(activateCardSchema), cardController.activateCard);
cardRouter.get('/cards/:id/balance', cardController.getCardBalance);


export default cardRouter;