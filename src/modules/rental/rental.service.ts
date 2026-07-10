
import { Availability } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { CreateRentalRequestPayload } from "./rental.interface";

const createRentalRequestIntoDB = async (tenantId: string, payload: CreateRentalRequestPayload) => {
  const { propertyId, moveInDate, message } = payload;
  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
    select: {
      id: true,
      landlordId: true,
      availability: true,
      title: true,
      rentPrice: true,
    },
  });

  if (!property) {
    throw new Error("Property not found.");
  }

  if (property.availability !== Availability.AVAILABLE) {
    throw new Error("This property is not available.");
  }

  if (property.landlordId === tenantId) {
    throw new Error("You cannot request your own property.");
  }

  const existingRequest = await prisma.rentalRequest.findFirst({
    where: {
      propertyId,
      tenantId,
    },
  });

  if (existingRequest) {
    throw new Error("You have already requested this property.");
  }

  const rentalRequest = await prisma.rentalRequest.create({
    data: {
      tenantId,
      propertyId,
      moveInDate,
      message,
    },
    include: {
      property: {
        select: {
          id: true,
          title: true,
          rentPrice: true,
        },
      },
    },
  });

  return rentalRequest;
};



const getMyRentalRequestsFromDB = async (tenantId: string) => {
  return prisma.rentalRequest.findMany({
    where: { tenantId },
    omit: { tenantId: true, propertyId: true },
    include: { property: true, payment: true },
    orderBy: { createdAt: "desc" },
  });
};


export const rentalService = {
  createRentalRequestIntoDB,
  getMyRentalRequestsFromDB,
  
};