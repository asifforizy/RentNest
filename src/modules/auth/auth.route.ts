import { Router } from "express";
import { authController } from "./auth.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";



const router =Router()

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/me", auth(UserRole.ADMIN, UserRole.LANDLORD,UserRole.TENANT), authController.getMyProfile);
router.patch("/update-my-profile", auth(UserRole.ADMIN, UserRole.LANDLORD,UserRole.TENANT), authController.updateMyProfile);


export const authRoutes = router;
