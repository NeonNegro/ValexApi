import joi from "joi";
var newCardSchema = joi.object({
    employeeId: joi.number().required(),
    cardType: joi.string().valid('groceries', 'restaurant', 'transport', 'education', 'health')
});
export default newCardSchema;
//# sourceMappingURL=newCardSchema.js.map