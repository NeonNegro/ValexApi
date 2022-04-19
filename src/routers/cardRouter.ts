import { Router } from "express";
import * as cardController from '../controllers/cardController.js';
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import newCardSchema from "../schemas/newCardSchema.js";


const cardRouter = Router();

cardRouter.post('/cards', validateSchemaMiddleware(newCardSchema), cardController.createCard);


export default cardRouter;