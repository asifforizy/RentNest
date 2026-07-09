import express from "express";
import { propertyController } from "./properties.controller";


const router = express.Router();


router.get("/", propertyController.getAllProperties);
router.get("/:id", propertyController.getPropertyById);

export const propertyRoutes = router;
