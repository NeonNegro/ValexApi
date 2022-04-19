import joi from "joi";

const rechargeSchema = joi.object({
    amount: joi.number().required(),
    cardId: joi.number().required(),
});

export default rechargeSchema;