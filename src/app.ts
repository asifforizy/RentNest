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
import { stripe } from "./lib/stripe";





const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true
  })
);

const endpointSecret = config.stripe_webhook_secret_key


// app.post("/api/payments/webhook",express.raw({type :"application/json"}), (request, response)=>{
//    let event = request.body;
//   // Only verify the event if you have an endpoint secret defined.
//   // Otherwise use the basic event deserialized with JSON.parse
//   if (endpointSecret) {
//     // Get the signature sent by Stripe
//     const signature = request.headers['stripe-signature']!;
//     try {
//       event = stripe.webhooks.constructEvent(
//         request.body,
//         signature,
//         endpointSecret
//       );
//     } catch (err : any) {
//       console.log(`⚠️  Webhook signature verification failed.`, err.message);
//       return response.sendStatus(400).json({
//         message: err.message
//       })
//     }
//   }

//   // Handle the event
//   switch (event.type) {
//     case 'payment_intent.succeeded':
//       const paymentIntent = event.data.object;
//       console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
//       // Then define and call a method to handle the successful payment intent.
//       // handlePaymentIntentSucceeded(paymentIntent);
//       break;
//     case 'payment_method.attached':
//       const paymentMethod = event.data.object;
//       // Then define and call a method to handle the successful attachment of a PaymentMethod.
//       // handlePaymentMethodAttached(paymentMethod);
//       break;
//     default:
//       // Unexpected event type
//       console.log(`Unhandled event type ${event.type}.`);
//   }

//   // Return a 200 response to acknowledge receipt of the event
//   response.send();
// })



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
  res.send("hello world");
});


app.use("/api/auth", authRoutes);
app.use("/api/categories",categoryRoutes)
app.use("/api/properties",propertyRoutes)
app.use("/api/landlord",lanlordRoutes)
app.use("/api/rentals",rentalRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/payments",paymentRoutes)










app.use(notFound)
app.use(globalErrorHandler)
export default app;