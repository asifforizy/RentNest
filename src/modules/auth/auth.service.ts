import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { IloginUser, IUpdate, RegisterUserPayload } from "./auth.interface";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";

const registeruserIntoDB = async (payload: RegisterUserPayload) => {
  const { name, email, password, profilePhoto, phone, address, role } = payload;
  

  const isUserExist = await prisma.user.findUnique({
    where: { email },
  });

  if (isUserExist) {
    throw new Error("user ready exists with this email");
  }
  const finalRole = role === "LANDLORD" ? "LANDLORD" : "TENANT";

  const hashedPasswod = await bcrypt.hash(
    password,
    Number(config.bycrypt_salt)
  );

  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPasswod,
      profilePhoto,
      phone,
      address,
      role : finalRole,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: createdUser.id,
      email: createdUser.email || email,
    },
    omit: { password: true },
  });

  return user;
};

const loginUser = async (payload: IloginUser) => {
  const { email, password } = payload;

  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
  });

  if (user.status === "BANNED") {
    throw new Error("Your account has been Banned. please contact support.");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Passord is incorrect");
  }

  const jwtpayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtUtils.createToken(
    jwtpayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in
  );
  const refreshToken = jwtUtils.createToken(
    jwtpayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in
  );

  return {
    accessToken,
    refreshToken,
  };
};

const getmyProfileFromDB = async (userId: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    omit: { password: true },
  });

  return user;
};


const updatemyprofileInDB = async (userId: string, Payload: IUpdate) => {
  const { name, profilePhoto, phone, address,role, } = Payload;
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      profilePhoto,
      phone,
      address,
      role 
    },
    omit: { password: true },
  });


  return updatedUser;
};



export const authService = {
  registeruserIntoDB,
  loginUser,
  getmyProfileFromDB,
  updatemyprofileInDB
};
