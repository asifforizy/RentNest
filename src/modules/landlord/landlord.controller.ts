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
    success: true,
    statusCode: httpStatus.CREATED, 
    message: "Property listing created successfully",
    data: result,
  });
});



const getMyProperties = catchAsync(async (req: Request, res: Response) => {
  const id = req.user?.id;
  const result = await landlordService.getMyPropertiesFromDB(id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Your properties retrieved successfully",
    data: result,
  });
});


const updateProperty = catchAsync(async (req: Request, res: Response) => {
  const landlordId = req.user?.id as string;
  const result = await landlordService.updatePropertyIntoDB(req.params.id as string, landlordId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Property updated successfully",
    data: result,
  });
});



const deleteProperty = catchAsync(async (req: Request, res: Response) => {
  const landlordId = req.user?.id as string;
  const result = await landlordService.deletePropertyFromDB(req.params.id as string, landlordId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Property removed successfully",
    data: result,
  });
});



export const lanlordController = {
  createPropertyListing,
  getMyProperties,
  updateProperty,
  deleteProperty
};
