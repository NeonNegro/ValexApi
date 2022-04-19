import * as cardRepository from '../repositories/cardRepository.js';
import * as companyRepository from '../repositories/companyRepository.js';
import * as employeeRepository from '../repositories/employeeRepository.js';
import * as paymentRepository from '../repositories/paymentRepository.js';
import * as rechargeRepository from '../repositories/rechargeRepository.js';
import { validateApiKey } from './companyService.js';
import { faker } from '@faker-js/faker';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import dayjs from 'dayjs';
dayjs.extend(customParseFormat);
import bcrypt from "bcrypt";

export async function createCard (apiKey: string, employeeId: number, cardType: cardRepository.TransactionTypes){


        const employee = await getEmployee(employeeId);

        await validateApiKey(apiKey);
        await ensureUniqueCardTypeByEmployee(cardType, employeeId);
        const cardNumber = faker.finance.creditCardNumber('mastercard');
        //ensureIsMasterCard(cardNumber);
        await ensureCardNumberIsUnique(cardNumber);

        const newCard = fillCardFields(employee, cardNumber, cardType);
        
        cardRepository.insert(newCard);
}

export async function activateCard (cardId: number, cvv: string, password: string){
        const card = await getCard(cardId);

        ensureCardIsNotExpired(card);
        ensureNotAlreadyActivated(card.password);
        validateCvv(cvv, card.securityCode);
        validateNewPassword(password);

        const encriptedPassword = bcrypt.hashSync(password, 10);
        card.password = encriptedPassword;

        cardRepository.update(cardId, card);
}

export async function getBalanceAndTransactions(cardId: number){
        const card = await getCard(cardId);
        const transactions = await paymentRepository.findByCardId(cardId);
        const recharges = await rechargeRepository.findByCardId(cardId);
        const totalPayments = transactions.reduce((sum, t)=>sum + t.amount,0);
        const totalRecharges = recharges.reduce((sum, r)=>sum + r.amount,0);
        const balance = totalRecharges-totalPayments;

        return { balance, transactions, recharges }
}



function createCardName(employeeFullName: string){
        let subNames = employeeFullName.split(' ');
        subNames = subNames.filter(sN => sN.length > 2);
        subNames = subNames.map((sN,i, array) => (i === 0 || i === (array.length - 1)) ? sN : sN[0]);

        let cardName = subNames.join(' ');

        return cardName.toUpperCase();
}
function createCardExpirationDate(){
        return dayjs().add(5,'y').format('MM/YY');
}
function createSecurityCode(){
        const cvv = faker.finance.creditCardCVV();
        console.log(`CVV criado:${cvv}`);
        const encriptedCVV = bcrypt.hashSync(cvv, 10);
        return encriptedCVV
}
async function getEmployee(employeeId: number){
        const employee: any = await employeeRepository.findById(employeeId);
        if (!employee)
                throw {message: 'Employee does not exists'};
        return employee
}
export async function getCard(cardId: number){
        const card = await cardRepository.findById(cardId);
        if (!card)
                throw {type: 'not_found', message: 'Card not found'};
        return card
}
export async function ensureCardExists(cardId: number){
        const card = await getCard(cardId);
}
async function ensureCardNumberIsUnique(cardNumber: string){
        const existingCard = await cardRepository.findByNumber(cardNumber);
        if (existingCard)
                throw {message: 'Card number already in use'};
}
export function ensureCardIsNotExpired(card: cardRepository.Card){
        const expirationDate = card.expirationDate;
        const today = dayjs();
        const expirationDateDayJS = dayjs(expirationDate,'MM/YY');
        if(today.isAfter(expirationDateDayJS))
                throw { type: 'conflict', message: 'Expired Card' };
}
function validateCvv(cvv: string, encriptedCVV: string){
        if (!bcrypt.compareSync(cvv, encriptedCVV))
                throw { type: 'conflict', message: 'Wrong CVV' };
}
function validateNewPassword(newPassword: string){
        const reg = /^[0-9]{4}$/;
        if(!reg.test(newPassword))
                throw { type: 'conflict', message: 'The Password should be a 4 digits number only one' };       
}       
function ensureNotAlreadyActivated(password: string){
        if(password !== null && password !== undefined)
                throw { type: 'conflict', message: 'Card already activated' };
}
async function ensureUniqueCardTypeByEmployee(cardType: cardRepository.TransactionTypes, employeeId: number) {
        const existingCard = await cardRepository.findByTypeAndEmployeeId(cardType, employeeId);
        if (existingCard)
                throw { type: 'conflict', message: 'Employee already has a card of this type' };
}
function fillCardFields(employee: employeeRepository.Employee, cardNumber: string, cardType: cardRepository.TransactionTypes) {

        let cardData = {} as cardRepository.CardInsertData;

        cardData.employeeId = employee.id;
        cardData.number = cardNumber;
        cardData.cardholderName = createCardName(employee.fullName);
        cardData.securityCode = createSecurityCode();
        cardData.expirationDate = createCardExpirationDate();
        cardData.isVirtual = false;
        cardData.isBlocked = true;
        cardData.type = cardType;

        return cardData
}



// function ensureIsMasterCard(number: string){
//         const regex: RegExp = /^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)[0-9]{0,}/;
//         console.log(number);
//         if(!regex.test(number))
//                 throw { message: 'Not a MasterCard card'};
// }
