import { Router } from "express";
import { lanlordController } from './landlord.controller';




const router =Router()

router.post("/properties", lanlordController.createPropertyListing);



export const lanlordRoutes = router;
