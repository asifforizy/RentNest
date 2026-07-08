import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { RegisterUserPayload } from "./auth.interface";
import config from "../../config";




const registeruserIntoDB = async (payload: RegisterUserPayload) => {
    const {name , email, password , profilePhoto } = payload;
    const isUserExist = await prisma.user.findUnique({
    where: { email },
  });

  if (isUserExist) {
    throw new Error("user ready exists with this email");
  }

  const hashedPasswod = await bcrypt.hash(
    password,
    Number(config.bycrypt_salt)
  );

  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPasswod,
      profile: {
        create: {
          profilePhoto ,
        },
      },
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: createdUser.id,
      email: createdUser.email || email,
    },
    omit: { password: true },
    include: { profile: true },
  });

  return user;
};




export const authService={
    registeruserIntoDB
}