import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"

import { sendResponse } from "../../utils/sendResponse"
import httpStatus from 'http-status';
import { paymentServices } from "./payment.service";

const createCheckoutSession = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  const { rentalRequestId } = req.body;
 
  const paymentUrl = await paymentServices.createCheckoutSession(userId, rentalRequestId);
 
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Checkout session created successfully",
    data: { paymentUrl },
  });
});


const handleWebhook = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body as Buffer; 
  const signature = req.headers["stripe-signature"] as string;
  const result = await paymentServices.handleWebhook(payload, signature);
  res.status(httpStatus.OK).json(result);
});


const getMyPayments = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  const role = req.user?.role as string;
 
  const result = await paymentServices.getMyPayments(userId, role);
 
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment history retrieved successfully",
    data: result,
  });
});


const getPaymentById = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  const role = req.user?.role as string;
  const { id } = req.params;
 
  const result = await paymentServices.getPaymentById(userId, role, id as string);
 
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment retrieved successfully",
    data: result,
  });
});


const confirmPayment = catchAsync(async (req: Request, res: Response) => {
  const { sessionId } = req.body;
  const result = await paymentServices.confirmPayment(sessionId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment confirmed successfully",
    data: result,
  });
});
 
export const paymentController = {
  createCheckoutSession,
  handleWebhook,
  getMyPayments,
  getPaymentById,
  confirmPayment
};
 