import { Request, Response } from "express";
import httpStatus from "http-status";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { rentalService } from "./rental.service";

const createRentalRequest = catchAsync(async (req: Request, res: Response) => {
  const tenantId = req.user?.id as string;

  const result = await rentalService.createRentalRequestIntoDB(  tenantId,  req.body );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Rental request submitted successfully",
    data: result,
  });
});

const getMyRentalRequests = catchAsync(async (req: Request, res: Response) => {
  const tenantId = req.user?.id as string;
  const result = await rentalService.getMyRentalRequestsFromDB(tenantId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental requests retrieved successfully",
    data: result,
  });
});


const getRentalRequestById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const role = req.user?.role as string;
  const userId = req.user?.id as string;
  const result = await rentalService.getRentalRequestByIdFromDB(id as string, userId, role);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental request retrieved successfully by id",
    data: result,
  });
});

export const rentalController = {
  createRentalRequest,
  getMyRentalRequests,
  getRentalRequestById
};
