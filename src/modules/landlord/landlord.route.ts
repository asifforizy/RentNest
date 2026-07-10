import { Router } from "express";
import { lanlordController } from './landlord.controller';
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";




const router =Router()

router.post("/properties",  auth(UserRole.LANDLORD) ,lanlordController.createPropertyListing);
router.get("/my-properties", auth(UserRole.LANDLORD) , lanlordController.getMyProperties);
router.patch("/properties/:id", auth(UserRole.LANDLORD) , lanlordController.updateProperty);
router.delete("/properties/:id", auth(UserRole.LANDLORD) , lanlordController.deleteProperty);



export const lanlordRoutes = router;
