import { Router } from "express";
import { handleErrorMiddleware } from "../middlewares/errorHandlerMiddleware.js";
import cardRouter from "./cardRouter.js";
var router = Router();
router.use(cardRouter);
router.use(handleErrorMiddleware);
export default router;
//# sourceMappingURL=index.js.map