import joi from "joi";

const newCardSchema = joi.object({
  employeeId: joi.number().required(),
  cardType: joi.string().valid('groceries', 'restaurant','transport', 'education','health'),
});

export default newCardSchema;