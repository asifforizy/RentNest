import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { propertyService } from "./properties.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const getAllProperties = catchAsync(async (req: Request, res: Response) => {

  const result = await propertyService.getAllPropertiesFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Properties retrieved successfully",
    data: result,
  });
});

const getPropertyById = catchAsync(async (req: Request, res: Response) => {

  const result = await propertyService.getPropertyByIdFromDB(req.params.id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Property retrieved successfully by id",
    data: result,
  });
});

export const propertyController = {
  getAllProperties,
  getPropertyById,
};
