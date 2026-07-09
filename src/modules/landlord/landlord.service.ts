import { prisma } from "../../lib/prisma";

import { CreatePropertyPayload } from "./landlord.interface";

const createPropertyIntoDB = async (
  landlordId: string,
  payload: CreatePropertyPayload
) => {
  const { categoryName, ...rest } = payload;

  if (categoryName) {
    const category = await prisma.category.findUnique({
      where: { name: categoryName },
    });

    if (!category) {
      throw new Error("Category does not exist");
    }
  }

  return prisma.property.create({
    data: {
      ...rest,
      landlordId,
      categoryName,
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

const updatePropertyIntoDB = async (
  id: string,
  landlordId: string,
  payload: CreatePropertyPayload
) => {
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

export const landlordService = {
  createPropertyIntoDB,
  getMyPropertiesFromDB,
  updatePropertyIntoDB
};
