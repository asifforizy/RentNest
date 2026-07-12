import { prisma } from "../../lib/prisma";
import { CreatePropertyPayload, UpdateRentalRequestStatusPayload } from "./landlord.interface";

const createPropertyIntoDB = async (landlordId: string,payload: CreatePropertyPayload) => {
  const { categoryId, ...rest } = payload;

  if (categoryId) {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new Error("Category does not exist");
    }
  }

  return prisma.property.create({
    data: {
      ...rest,
      landlordId,
      categoryId,
    },
  });
};

const getMyPropertiesFromDB = async (landlordId: string) => {
  return prisma.property.findMany({
    where: { landlordId },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
};

const updatePropertyIntoDB = async (id: string,landlordId: string,payload: CreatePropertyPayload) => {
  const property = await prisma.property.findUnique({ where: { id } });

  if (!property) {
    throw new Error("Property not found");
  }

  if (property.landlordId !== landlordId) {
    throw new Error("You are not the owner of this property");
  }

  const result = prisma.property.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};


const deletePropertyFromDB = async (id: string, landlordId: string) => {
  const property = await prisma.property.findUnique({ where: { id } });

  if (!property) {
    throw new Error("Property not found");
  }

  if (property.landlordId !== landlordId) {
    throw new Error("You are not the owner of this property");
  }

  const result =  prisma.property.delete({ where: { id } });
  return result
};




const getRequestsForMyPropertiesFromDB = async (landlordId: string) => {
  return prisma.rentalRequest.findMany({
    where: { property: { landlordId } },
    include: { property: true, tenant: { select: { id: true, name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });
};




const updateRentalRequestStatusIntoDB = async (id: string, landlordId: string,payload: UpdateRentalRequestStatusPayload) => {
  const rentalRequest = await prisma.rentalRequest.findUnique({
    where: { id },
    include: { property: true },
  });

  if (!rentalRequest) {
    throw new Error("Rental request not found");
  }

  if (rentalRequest.property.landlordId !== landlordId) {
    throw new Error( "You do not own the property for this request");
  }

  

  return prisma.rentalRequest.update({
    where: { id },
    data: { status: payload.status },
  });
};














export const landlordService = {
  createPropertyIntoDB,
  getMyPropertiesFromDB,
  updatePropertyIntoDB,
  deletePropertyFromDB,
  getRequestsForMyPropertiesFromDB,
  updateRentalRequestStatusIntoDB
};
