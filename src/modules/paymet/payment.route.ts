import { Router } from "express";
import { paymentController } from "./payment.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";




const router = Router()


router.post("/create",auth(UserRole.TENANT), paymentController.createCheckoutSession)
router.get("/", auth(UserRole.ADMIN,UserRole.LANDLORD,UserRole.TENANT),paymentController.getMyPayments)
router.get("/:id",  auth(UserRole.LANDLORD, UserRole.TENANT, UserRole.ADMIN), paymentController.getPaymentById)
router.post("/confirm", auth(UserRole.TENANT), paymentController.confirmPayment);


export const paymentRoutes = router