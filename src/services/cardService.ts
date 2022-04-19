import * as cardRepository from '../repositories/cardRepository.js';
import * as companyRepository from '../repositories/companyRepository.js';
import * as employeeRepository from '../repositories/employeeRepository.js';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs'
import bcrypt from "bcrypt";
//import { v4 as uuid } from "uuid";

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
        const CVV = faker.finance.creditCardCVV();
        const encriptedCVV = bcrypt.hashSync(CVV, 10);
        return encriptedCVV
}
async function getEmployee(employeeId: number){
        const employee: any = await employeeRepository.findById(employeeId);
        if (!employee)
                throw {message: 'Employee does not exists'};
        return employee
}
async function ensureCardNumberIsUnique(cardNumber: string){
        const existingCard = await cardRepository.findByNumber(cardNumber);
        if (existingCard)
                throw {message: 'Card number already in use'};
}
function ensureIsMasterCard(number: string){
        const regex: RegExp = /^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)[0-9]{0,}/;
        console.log(number);
        if(!regex.test(number))
                throw { message: 'Not a MasterCard card'};
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
async function validateApiKey(apiKey: string) {
        const company = await companyRepository.findByApiKey(apiKey);
        if(!company)
                throw {message: 'Invalid ApiKey'}
}
