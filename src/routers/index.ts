import { Router } from "express";
import { handleErrorMiddleware } from "../middlewares/errorHandlerMiddleware.js";
import cardRouter from "./cardRouter.js";


const router = Router();

router.use(cardRouter);

router.use(handleErrorMiddleware);

export default router;