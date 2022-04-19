import joi from "joi";

const paymentSchema = joi.object({
    amout: joi.number().required(),
    cardId: joi.number().required(),
    businessId: joi.number().required(),
    password: joi.string().required()
});

export default paymentSchema;