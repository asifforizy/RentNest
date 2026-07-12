import Stripe from "stripe";
import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { handleCheckoutCompleted, handleCheckoutExpired, handlePaymentFailed } from "./payment.util";

const stripe = new Stripe(config.stripe_secret_key as string);



const createCheckoutSession = async (userId: string, rentalRequestId: string) => {
  return await prisma.$transaction(async (tx) => {
  
    const rentalRequest = await tx.rentalRequest.findUnique({
      where: { id: rentalRequestId },
      include: { property: true, payment: true },
    });

    if (!rentalRequest) {
      throw new Error( "Rental request not found");
    }

 
    if (rentalRequest.tenantId !== userId) {
      throw new Error( "This is not your rental request");
    }

    if (rentalRequest.status !== "APPROVED") {
      throw new Error(
        
        "Rental request must be approved before payment"
      );
    }

   
    if (rentalRequest.payment?.status === "COMPLETED") {
      throw new Error("This rental has already been paid for");
    }

   
    const user = await tx.user.findUniqueOrThrow({ where: { id: userId } });

    let stripeCustomerId = user.stripeCustomerId;
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: { userId: user.id },
      });
      stripeCustomerId = customer.id;
      await tx.user.update({
        where: { id: userId },
        data: { stripeCustomerId },
      });
    }


    const amount = rentalRequest.property.rentPrice;
    if (!amount || amount <= 0) {
      throw new Error( "Invalid rent amount on property");
    }

  
    const payment = await tx.payment.upsert({
      where: { rentalRequestId },
      update: {
        amount,
        status: "PENDING",
        provider: "STRIPE",
      },
      create: {
        transactionId: `txn_${rentalRequestId}_${Date.now()}`,
        amount,
        provider: "STRIPE",
        status: "PENDING",
        rentalRequestId,
      },
    });

   
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer: stripeCustomerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Math.round(amount * 100), 
            product_data: {
              name: `Rent Payment - ${rentalRequest.property.title}`,
              description: `Rental request #${rentalRequest.id}`,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${config.app_url}/payments/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${config.app_url}/payments/cancel`,
      metadata: {
        paymentId: payment.id,
        rentalRequestId: rentalRequest.id,
        userId: user.id,
      },
      payment_intent_data: {
        metadata: {
          paymentId: payment.id,
          rentalRequestId: rentalRequest.id,
          userId: user.id,
        },
      },
    });

 
    await tx.payment.update({
      where: { id: payment.id },
      data: { stripeCheckoutSessionId: session.id },
    });

    return session.url;
  });
};


const handleWebhook = async (payload: Buffer, signature: string) => {
 
  const endpointSecret = config.stripe_webhook_secret_key as string;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
  } catch (err: any) {
    throw new Error( `Webhook signature verification failed: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
      break;

    case "checkout.session.expired":
      await handleCheckoutExpired(event.data.object as Stripe.Checkout.Session);
      break;

    case "payment_intent.payment_failed":
      await handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
      break;

    default:
      console.log(`Unhandled Stripe event type: ${event.type}`);
      break;
  }

  return { received: true };
};


const getMyPayments = async (userId: string, role: string) => {

  const where =
    role === "LANDLORD"
      ? { rentalRequest: { property: { landlordId: userId } } }
      : { rentalRequest: { tenantId: userId } };

  return prisma.payment.findMany({
    where,
    include: {
      rentalRequest: {
        include: { property: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

const getPaymentById = async (userId: string, role: string, paymentId: string) => {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: {
      rentalRequest: {
        include: { property: true, tenant: true },
      },
    },
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  const isTenant = payment.rentalRequest.tenantId === userId;
  const isLandlord = payment.rentalRequest.property.landlordId === userId;
  const isAdmin = role === "ADMIN";

  if (!isTenant && !isLandlord && !isAdmin) {
    throw new Error("You do not have access to this payment");
  }

  return payment;
};

export const paymentServices = {
  createCheckoutSession,
  handleWebhook,
  getMyPayments,
  getPaymentById,
};