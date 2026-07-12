import Stripe from "stripe";
import { prisma } from "../../lib/prisma";

export const handleCheckoutCompleted = async (session: Stripe.Checkout.Session) => {
  const paymentId = session.metadata?.paymentId;
  const rentalRequestId = session.metadata?.rentalRequestId;
 
  if (!paymentId || !rentalRequestId) {
    console.log("Webhook: checkout.session.completed missing metadata", session.id);
    return;
  }
 
  // Idempotency guard - Stripe may deliver the same event more than once
  const existing = await prisma.payment.findUnique({ where: { id: paymentId } });


  if (!existing) {
    console.log(`Webhook: no Payment found for id ${paymentId}`);
    return;
  }
  if (existing.status === "COMPLETED") {
    return; // already processed, nothing to do
  }
 
  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id;
 
  await prisma.$transaction([
    prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: "COMPLETED",
        paidAt: new Date(),
        method: "CARD", // this checkout flow is configured card-only; adjust if you add more payment_method_types
        stripePaymentIntentId: paymentIntentId,
      },
    }),
    prisma.rentalRequest.update({
      where: { id: rentalRequestId },
      data: { status: "ACTIVE" },
    }),
  ]);
};
 
/* -------------------------------------------------------------------------- */
/*  checkout.session.expired                                                  */
/*  Fires if the tenant abandons the hosted checkout page without paying.     */
/* -------------------------------------------------------------------------- */
 
export const handleCheckoutExpired = async (session: Stripe.Checkout.Session) => {
  const paymentId = session.metadata?.paymentId;
  if (!paymentId) {
    console.log("Webhook: checkout.session.expired missing metadata", session.id);
    return;
  }
 
  const existing = await prisma.payment.findUnique({ where: { id: paymentId } });
  if (!existing || existing.status === "COMPLETED") {
    return; // never downgrade a completed payment
  }
 
  await prisma.payment.update({
    where: { id: paymentId },
    data: { status: "FAILED" },
  });
};
 
/* -------------------------------------------------------------------------- */
/*  payment_intent.payment_failed                                             */
/*  Fires when a card is declined or a charge otherwise fails.                */
/* -------------------------------------------------------------------------- */
 
export const handlePaymentFailed = async (intent: Stripe.PaymentIntent) => {
  const paymentId = intent.metadata?.paymentId;
  if (!paymentId) {
    console.log("Webhook: payment_intent.payment_failed missing metadata", intent.id);
    return;
  }
 
  const existing = await prisma.payment.findUnique({ where: { id: paymentId } });
  if (!existing || existing.status === "COMPLETED") {
    return;
  }
 
  await prisma.payment.update({
    where: { id: paymentId },
    data: { status: "FAILED" },
  });
};