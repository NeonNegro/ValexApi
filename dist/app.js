import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import router from './routers/index.js';
var app = express();
app.use(json());
app.use(cors());
app.use(router);
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Listening to port ".concat(port));
});
// function renderTransaction(listElement: any, transaction: Transaction) {
// 	const itemElement = document.createElement("li");
// 	itemElement.innerHTML = createTransactionText(transaction);
// 	listElement.appendChild(itemElement);
// }
// function createTransactionText(transaction: Transaction){
//     const { price, discount, createdAt, approvedAt } = transaction;
//     const discountedPrice = calculateDiscountedPrice(price, discount);
//     return `
//         Preço: R$ ${centsToDollar(price)}<br>
//         Preço com desconto: R$ ${centsToDollar(discountedPrice)}<br>
//         Criado em: ${formatDateToBR(createdAt)}<br>
//         Aprovado em: ${formatDateToBR(approvedAt)}<br>
//     `
// }
// function calculateDiscountedPrice(price: number, discount: number){
//     return price * (1 - discount);
// }
// function centsToDollar(price: number){
//     return (price / 100).toFixed(2).replace('.', ',');
// }
// function formatDateToBR(date: string | Date | number){
//     return dayjs(date).format('DD/MM/YYYY')
// }
// interface Transaction {
//     price: number;
//     discount: number;
//     createdAt: number | Date | string;
//     approvedAt: number | Date | string;
// }
// async function createUser(userData) {
//     validateUserSchema(userData);
//     ensureUserDoesNotExists(userData.email);
//     persistUser(userData);
//     const createdUser = userRepository.findByEmail(userData.email);
// 	return createdUser.id;
// }
// function validateUserSchema(userData){
//     const { name, email } = userData;
//     if(name.length === 0 || email.length === 0) throw 'Invalid data';
// }
// async function persistUser(userData){
//     userData.createdAt = Date.now();
//     userData.active = false;
//     userData.balance = 0;
//     await userRepository.create(userData);
//     const createdUser = await userRepository.create(userData);
//     return createdUser.id;
// }
// async function ensureUserDoesNotExists(email: string){
//     const existingUser = await userRepository.findByEmail(email);
// 	if(existingUser) throw 'Duplicate Email';
// }
//# sourceMappingURL=app.js.map