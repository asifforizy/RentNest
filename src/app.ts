import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import config from "./config";
import cors from 'cors';
import { authRoutes } from "./modules/auth/auth.route";
import { notFound } from "./middleware/notFound";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { lanlordRoutes } from "./modules/landlord/landlord.route";
import { categoryRoutes } from "./modules/category/category.route";
import { propertyRoutes } from "./modules/properties/properties.route";
import { rentalRoutes } from "./modules/rental/rental.route";
import { adminRoutes } from "./modules/Admin/admin.route";
import { paymentRoutes } from './modules/paymet/payment.route';
import { reviewRoutes } from "./modules/reviews/reviews.router";






const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true
  })
);






app.use("/api/payments/webhook", express.raw({ type: 'application/json' }))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: config.app_url,
    credentials: true
  })
);

app.get("/", async (req: Request, res: Response) => {
  res.send("RentNest");
});


app.use("/api/auth", authRoutes);
app.use("/api/categories",categoryRoutes)
app.use("/api/properties",propertyRoutes)
app.use("/api/landlord",lanlordRoutes)
app.use("/api/rentals",rentalRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/payments",paymentRoutes)
app.use("/api/reviews",reviewRoutes)





app.use(notFound)
app.use(globalErrorHandler)
export default app;