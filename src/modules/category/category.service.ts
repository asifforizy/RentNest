import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";
import { ICreatecategory } from "./category.interface";

const createCategoryIntoDB = async (payload: ICreatecategory) => {
  const exists = await prisma.category.findUnique({
    where: {
      name: payload.name,
    },
  });

  if (exists) {
    throw new Error("Category already exists");
  }

  const result = await prisma.category.create({
    data: payload,
  });

  return result;
};

const getAllCategoriesFromDB = async () => {
  return prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
};

export const categoryService = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
};
