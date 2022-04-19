import { Request, Response } from "express";
import { CardInsertData } from "../repositories/cardRepository.js";
import * as cardService from "../services/cardService.js";






export async function createCard(req: Request, res: Response) {
    const {employeeId, cardType} = req.body;
    const apiKey = req.header('x-api-key');

    await cardService.createCard(apiKey, employeeId, cardType);
    res.sendStatus(201);
}

export async function activateCard(req: Request, res: Response) {
    const {cardId, cvv, password} = req.body;

    await cardService.activateCard(cardId, cvv, password);
    res.sendStatus(201);
}
