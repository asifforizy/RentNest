
import { prisma } from "../../lib/prisma";

import { CreatePropertyPayload } from "./landlord.interface";

const createPropertyIntoDB = async (landlordId: string,payload: CreatePropertyPayload) => {
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







export const landlordService = {
  createPropertyIntoDB,
  getMyPropertiesFromDB,
};