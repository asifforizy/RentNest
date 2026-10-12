import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const getAllPropertiesFromDB = async (query: Record<string, any>) => {
  const { searchTerm, type, bedrooms, sort, page = "1", limit = "9" } = query;

  const pageNum = Math.max(1, Number(page) || 1);
  const take = Math.min(50, Math.max(1, Number(limit) || 9));

  const where: Prisma.PropertyWhereInput = {
    ...(searchTerm && {
      OR: [
        { title: { contains: searchTerm, mode: "insensitive" } },
        { location: { contains: searchTerm, mode: "insensitive" } },
      ],
    }),
    ...(type && { type }),
    ...(bedrooms && { bedrooms: { gte: Number(bedrooms) } }),
  };

  const orderBy: Prisma.PropertyOrderByWithRelationInput =
    sort === "price-asc"
      ? { rentPrice: "asc" }
      : sort === "price-desc"
      ? { rentPrice: "desc" }
      : { createdAt: "desc" };

  const [data, total] = await Promise.all([
    prisma.property.findMany({
      where,
      orderBy,
      skip: (pageNum - 1) * take,
      take,
      include: {
        landlord: { select: { id: true, name: true, email: true } },
      },
    }),
    prisma.property.count({ where }),
  ]);

  return {
    data,
    meta: {
      page: pageNum,
      limit: take,
      total,
      totalPages: Math.ceil(total / take),
    },
  };
};
const getPropertyByIdFromDB = async (id: string) => {
  const result = await prisma.property.findUnique({
    where: {
      id,
    },
    include: {
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
    throw new Error("Property not found");
  }

  return result;
};

export const propertyService = {
  getAllPropertiesFromDB,
  getPropertyByIdFromDB,
};
