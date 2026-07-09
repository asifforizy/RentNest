import httpStatus from "http-status";
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

export const landlordService = {
  createPropertyIntoDB,
};