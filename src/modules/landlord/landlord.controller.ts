import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { landlordService } from "./landlord.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createPropertyListing = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    if(!req.user) {
       throw new Error("Forbiddin, Unauthorized access")
      }
 
      if (req.user.role !== "LANDLORD") {
        throw new Error("Only landlords can list properties")
      }

    const payload = req.body;
    const property = await landlordService.createPropertyListingInDB(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Property listed succesfully",
      data: { property },
    });
  }
);

export const lanlordController = {
  createPropertyListing,
};
