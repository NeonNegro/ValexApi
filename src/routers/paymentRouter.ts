import { Router } from "express";
import * as paymentController from '../controllers/paymentController.js';
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import paymentSchema from "../schemas/paymentSchema.js";


const paymentRouter = Router();

paymentRouter.post('/payment', validateSchemaMiddleware(paymentSchema), paymentController.insertpayment);


export default paymentRouter