import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import config from "./config";
import cors from 'cors';
import { authRoutes } from "./modules/auth/auth.route";
import { notFound } from "./middleware/notFound";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { lanlordRoutes } from "./modules/landlord/landlord.route";
import { categoryRoutes } from "./modules/category/category.route";



const app: Application = express();
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
  res.send("hello world");
});


app.use("/api/auth", authRoutes);
app.use("/api/landlord",lanlordRoutes)
app.use("/api/categories",categoryRoutes)









app.use(globalErrorHandler)
app.use(notFound)
export default app;