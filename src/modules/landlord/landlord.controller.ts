import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { propertyService } from "../properties/properties.service";
import { landlordService } from "./landlord.service";

const createPropertyListing = catchAsync(async (req: Request, res: Response) => {
  const landlordId = (req.user as { id: string }).id;
  const result = await landlordService.createPropertyIntoDB(landlordId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Property listing created successfully",
    data: result,
  });
});

export const lanlordController = {
  createPropertyListing,
};
