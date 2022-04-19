export function handleErrorMiddleware(error, req, res, next) {
    console.log(error);
    if (error.type === "conflict") {
        return res.sendStatus(409);
    }
    if (error.type === "unauthorized")
        return res.sendStatus(401);
    res.sendStatus(500);
}
//# sourceMappingURL=errorHandlerMiddleware.js.map