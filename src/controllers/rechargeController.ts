import { Request, Response } from "express";
import * as rechargeService from "../services/rechargeService.js";


export async function rechargeCard(req: Request, res: Response) {
    const {amount, cardId} = req.body;
    const apiKey = req.header('x-api-key');

    await rechargeService.insertRecharge(apiKey, cardId, amount);
    res.sendStatus(201);
}