import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";
import { ICreatecategory } from "./category.interface";

const createCategoryIntoDB = async (payload: ICreatecategory) => {
  const { name } = payload;
  const exists = await prisma.category.findUnique({
    where: {
      name,
    },
  });

  if (exists) {
    throw new Error("Category already exists");
  }

  const result = await prisma.category.create({
    data: { name },
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

const updateCategoryIntoDB = async (id: string, payload: ICreatecategory) => {
  const result = await prisma.category.update({
    where: { id },
    data: payload,
  });

  return result;
};


const deleteCategoryFromDB = async (id: string) => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });

  return result;
};



export const categoryService = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB
};
