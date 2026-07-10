import express from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { adminController } from "./admin.controller";


const router = express.Router();



router.get("/users", auth(UserRole.ADMIN), adminController.getAllUsers);
router.patch("/users/:id", auth(UserRole.ADMIN), adminController.updateUserStatus);
router.get("/properties", auth(UserRole.ADMIN), adminController.getAllProperties);


export const adminRoutes = router;
