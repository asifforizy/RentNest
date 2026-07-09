
import { prisma } from "../../lib/prisma";


const getAllPropertiesFromDB = async () => {
  const result = await prisma.property.findMany({
    include: {
      category: true,
      landlord: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

const getPropertyByIdFromDB = async (id: string) => {
  const result = await prisma.property.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      landlord: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (!result) {
    throw new Error( "Property not found");
  }

  return result;
};

export const propertyService = {
  getAllPropertiesFromDB,
  getPropertyByIdFromDB,
};
