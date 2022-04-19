import { Router } from "express";
import * as rechargeController from '../controllers/rechargeController.js';
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import rechargeSchema from "../schemas/rechargeSchema.js";


const rechargeRouter = Router();

rechargeRouter.post('/recharge', validateSchemaMiddleware(rechargeSchema), rechargeController.rechargeCard);


export default rechargeRouter