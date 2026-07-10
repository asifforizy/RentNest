import { Router } from "express";
import { paymentController } from "./payment.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";




const router = Router()


router.post("/create",auth(UserRole.ADMIN,UserRole.LANDLORD,UserRole.TENANT), paymentController.createCheckoutSession)
router.post("/webhook",paymentController.handleWebhook)


export const paymentRoutes = router