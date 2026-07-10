import { prisma } from "../../lib/prisma";
import { IUpdatedStatus } from "./admin.interface";

const getAllUsersFromDB = async () => {
  return prisma.user.findMany({
    omit: { password: true },
    orderBy: { createdAt: "desc" },
  });
};



const updateUserStatusIntoDB = async (id: string, payload: IUpdatedStatus) => {
  const { status } = payload;

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      status,
    },
    omit: {
      password: true,
    },
  });

  return updatedUser;
};


export const adminService = {
  getAllUsersFromDB,
  updateUserStatusIntoDB,
};