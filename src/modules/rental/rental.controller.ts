import { Request, Response } from "express";
import httpStatus from "http-status";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { rentalService } from "./rental.service";

const createRentalRequest = catchAsync(
  async (req: Request, res: Response) => {
    const tenantId = req.user?.id as string;

    const result = await rentalService.createRentalRequestIntoDB(
      tenantId,
      req.body
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Rental request submitted successfully",
      data: result,
    });
  }
);

export const rentalController = {
  createRentalRequest,
};