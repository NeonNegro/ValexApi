export default function validateSchemaMiddleware(schema) {
    return function (req, res, next) {
        var validation = schema.validate(req.body);
        if (validation.error) {
            return res.sendStatus(422);
        }
        next();
    };
}
//# sourceMappingURL=validateSchemaMiddleware.js.map