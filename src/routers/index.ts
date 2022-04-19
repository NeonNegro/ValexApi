import { Router } from "express";
import { handleErrorMiddleware } from "../middlewares/errorHandlerMiddleware.js";
import cardRouter from "./cardRouter.js";
import paymentRouter from "./paymentRouter.js";
import rechargeRouter from "./rechargeRouter.js";


const router = Router();

router.use(cardRouter);
router.use(rechargeRouter);
router.use(paymentRouter);


router.use(handleErrorMiddleware);

export default router;