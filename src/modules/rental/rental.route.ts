import express from "express";
import { auth } from "../../middleware/auth";
import { rentalController } from "./rental.controller";
import { UserRole } from "../../../generated/prisma/enums";


const router = express.Router();

router.post("/", auth("TENANT"), rentalController.createRentalRequest);
router.get("/", auth("TENANT"), rentalController.getMyRentalRequests);
router.get("/:id", auth(UserRole.ADMIN, UserRole.LANDLORD,UserRole.TENANT), rentalController.getRentalRequestById);

export const rentalRoutes = router;
