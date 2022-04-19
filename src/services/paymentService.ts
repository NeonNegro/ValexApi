import * as cardRepository from '../repositories/cardRepository.js';
import * as businessRepository from '../repositories/businessRepository.js';
import * as paymentRepository from '../repositories/paymentRepository.js';
import { validateApiKey } from './companyService.js';
import * as cardService from './cardService.js';
//{ ensureCardIsNotExpired, getCard, validatePassword }
import { PaymentInsertData } from '../repositories/paymentRepository.js';

export async function insertPayment (cardId: number, password: string, businessId: number, amout: number){
        if(amout<= 0) 
            throw { type: 'conflict', message: 'The amount cannot be inferior to 1' };

        const payment = {} as PaymentInsertData;

        const card = await cardService.getCard(cardId);
        cardService.ensureCardIsNotExpired(card);
        cardService.validatePassword(password, card.password);
        const business = await ensureBusinessExists(businessId);
        ensureCardTypeIsSameOfBusiness(business.type, card.type);
        await cardService.ensureSuficientBalance(cardId, amout);


        payment.amount = amout;
        payment.cardId = cardId;
        payment.businessId = business.id;
        
        paymentRepository.insert(payment);
}


async function ensureBusinessExists(businessId: number) {
    const existingBusiness = await businessRepository.findById(businessId);
    if (!existingBusiness)
            throw { type: 'not_found', message: 'Business does not exists' };
    return existingBusiness;
}

function ensureCardTypeIsSameOfBusiness(businessType: cardRepository.TransactionTypes, cardType: cardRepository.TransactionTypes){
    if(businessType !== cardType){
        throw { type: 'conflict', message: 'Invalid type of card for this transaction' };
    }
}