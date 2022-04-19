import * as cardRepository from '../repositories/cardRepository.js';
import * as rechargeRepository from '../repositories/rechargeRepository.js';
import { validateApiKey } from './companyService.js';
import { ensureCardIsNotExpired, getCard } from './cardService.js';
import { RechargeInsertData } from '../repositories/rechargeRepository.js';

export async function insertRecharge (apiKey: string, cardId: number, amout: number){
        if(amout<= 0) 
            throw { type: 'conflict', message: 'The amount cannot be inferior to 1' };

        const recharge = {} as RechargeInsertData;

        await validateApiKey(apiKey);
        const card = await getCard(cardId);
        ensureCardIsNotExpired(card);

        recharge.amount = amout;
        recharge.cardId = cardId;
        
        rechargeRepository.insert(recharge);
}

