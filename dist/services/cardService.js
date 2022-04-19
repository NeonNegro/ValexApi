var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as cardRepository from '../repositories/cardRepository.js';
import * as companyRepository from '../repositories/companyRepository.js';
import * as employeeRepository from '../repositories/employeeRepository.js';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import bcrypt from "bcrypt";
//import { v4 as uuid } from "uuid";
export function createCard(apiKey, employeeId, cardType) {
    return __awaiter(this, void 0, void 0, function () {
        var employee, cardNumber, newCard;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getEmployee(employeeId)];
                case 1:
                    employee = _a.sent();
                    return [4 /*yield*/, validateApiKey(apiKey)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, ensureUniqueCardTypeByEmployee(cardType, employeeId)];
                case 3:
                    _a.sent();
                    cardNumber = faker.finance.creditCardNumber('mastercard');
                    //ensureIsMasterCard(cardNumber);
                    return [4 /*yield*/, ensureCardNumberIsUnique(cardNumber)];
                case 4:
                    //ensureIsMasterCard(cardNumber);
                    _a.sent();
                    newCard = fillCardFields(employee, cardNumber, cardType);
                    cardRepository.insert(newCard);
                    return [2 /*return*/];
            }
        });
    });
}
function createCardName(employeeFullName) {
    var subNames = employeeFullName.split(' ');
    subNames = subNames.filter(function (sN) { return sN.length > 2; });
    subNames = subNames.map(function (sN, i, array) { return (i === 0 || i === (array.length - 1)) ? sN : sN[0]; });
    var cardName = subNames.join(' ');
    return cardName.toUpperCase();
}
function createCardExpirationDate() {
    return dayjs().add(5, 'y').format('MM/YY');
}
function createSecurityCode() {
    var CVV = faker.finance.creditCardCVV();
    var encriptedCVV = bcrypt.hashSync(CVV, 10);
    return encriptedCVV;
}
function getEmployee(employeeId) {
    return __awaiter(this, void 0, void 0, function () {
        var employee;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, employeeRepository.findById(employeeId)];
                case 1:
                    employee = _a.sent();
                    if (!employee)
                        throw { message: 'Employee does not exists' };
                    return [2 /*return*/, employee];
            }
        });
    });
}
function ensureCardNumberIsUnique(cardNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var existingCard;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardRepository.findByNumber(cardNumber)];
                case 1:
                    existingCard = _a.sent();
                    if (existingCard)
                        throw { message: 'Card number already in use' };
                    return [2 /*return*/];
            }
        });
    });
}
function ensureIsMasterCard(number) {
    var regex = /^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)[0-9]{0,}/;
    console.log(number);
    if (!regex.test(number))
        throw { message: 'Not a MasterCard card' };
}
function ensureUniqueCardTypeByEmployee(cardType, employeeId) {
    return __awaiter(this, void 0, void 0, function () {
        var existingCard;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardRepository.findByTypeAndEmployeeId(cardType, employeeId)];
                case 1:
                    existingCard = _a.sent();
                    if (existingCard)
                        throw { type: 'conflict', message: 'Employee already has a card of this type' };
                    return [2 /*return*/];
            }
        });
    });
}
function fillCardFields(employee, cardNumber, cardType) {
    var cardData = {};
    cardData.employeeId = employee.id;
    cardData.number = cardNumber;
    cardData.cardholderName = createCardName(employee.fullName);
    cardData.securityCode = createSecurityCode();
    cardData.expirationDate = createCardExpirationDate();
    cardData.isVirtual = false;
    cardData.isBlocked = true;
    cardData.type = cardType;
    return cardData;
}
function validateApiKey(apiKey) {
    return __awaiter(this, void 0, void 0, function () {
        var company;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, companyRepository.findByApiKey(apiKey)];
                case 1:
                    company = _a.sent();
                    if (!company)
                        throw { message: 'Invalid ApiKey' };
                    return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=cardService.js.map