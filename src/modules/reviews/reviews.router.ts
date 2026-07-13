import { Router } from "express";

import { auth } from "../../middleware/auth"; 
import { reviewController } from "./reviews.controller";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", auth(UserRole.TENANT), reviewController.createReview);
router.get("/property/:propertyId" , auth(UserRole.TENANT , UserRole.ADMIN,UserRole.LANDLORD) , reviewController.getReviewsByProperty);

export const reviewRoutes = router;