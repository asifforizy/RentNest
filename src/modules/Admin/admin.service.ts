import { prisma } from "../../lib/prisma";

const getAllUsersFromDB = async () => {
  return prisma.user.findMany({
    omit: { password: true },
    orderBy: { createdAt: "desc" },
  });
};


export const adminService = {
  getAllUsersFromDB,
};