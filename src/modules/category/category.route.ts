import { Router } from "express";
import { auth } from "../../middleware/auth";
import { categoryController } from "./category.controller";

const router = Router();

router.get("/", categoryController.getAllCategories);
router.post("/", auth("ADMIN"), categoryController.createCategory);
router.patch("/:id", auth("ADMIN"), categoryController.updateCategory);

export const categoryRoutes = router;