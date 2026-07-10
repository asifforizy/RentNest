import express from "express";
import { auth } from "../../middleware/auth";
import { rentalController } from "./rental.controller";


const router = express.Router();

router.post("/", auth("TENANT"), rentalController.createRentalRequest);
router.get("/", auth("TENANT"), rentalController.getMyRentalRequests);
// router.get("/:id", auth(), rentalController.getRentalRequestById);

export const rentalRoutes = router;
