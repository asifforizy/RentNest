import { Router } from "express";
import { lanlordController } from './landlord.controller';
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";




const router =Router()

router.post("/properties",  auth(UserRole.LANDLORD) ,lanlordController.createPropertyListing);
router.get("/my-properties", auth(UserRole.LANDLORD) , lanlordController.getMyProperties);



export const lanlordRoutes = router;
