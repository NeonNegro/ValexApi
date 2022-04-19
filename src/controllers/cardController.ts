import { Request, Response } from "express";
import { CardInsertData } from "../repositories/cardRepository";
import * as cardService from "../services/cardService.js";






export async function createCard(req: Request, res: Response) {
    const {employeeId, cardType} = req.body;
    const apiKey = req.header('x-api-key');

    await cardService.createCard(apiKey, employeeId, cardType);
    res.sendStatus(201);
}














//createCard