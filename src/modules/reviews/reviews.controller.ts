import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { reviewServices } from "./revies.service";


const createReview = catchAsync(async (req: Request, res: Response) => {
  const tenantId = req.user?.id as string;
  

  const result = await reviewServices.createReview(tenantId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Review created successfully",
    data: result,
  });
});

const getReviewsByProperty = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewServices.getReviewsByProperty(req.params.propertyId as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Reviews fetched successfully",
    data: result,
  });
});

export const reviewController = {
  createReview,
  getReviewsByProperty,
};