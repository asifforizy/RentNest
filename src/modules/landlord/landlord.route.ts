import { Router } from "express";
import { lanlordController } from './landlord.controller';
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";




const router =Router()

router.post("/properties",  auth(UserRole.LANDLORD) ,lanlordController.createPropertyListing);
router.get("/my-properties", auth(UserRole.LANDLORD) , lanlordController.getMyProperties);
router.patch("/properties/:id", auth(UserRole.LANDLORD) , lanlordController.updateProperty);
router.delete("/properties/:id", auth(UserRole.LANDLORD) , lanlordController.deleteProperty);
router.get("/requests", auth(UserRole.LANDLORD), lanlordController.getMyRentalRequests);
router.patch("/requests/:id", auth(UserRole.LANDLORD), lanlordController.updateRentalRequestStatus);



export const lanlordRoutes = router;
