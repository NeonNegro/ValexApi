import { Request, Response } from "express";
import * as paymentService from "../services/paymentService.js";


export async function insertpayment(req: Request, res: Response) {
    const {amout, cardId, password, businessId} = req.body;

    await paymentService.insertPayment(cardId, password, businessId, amout);
    res.sendStatus(201);
}
