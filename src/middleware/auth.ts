import { NextFunction, Request, Response } from "express";

import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { UserRole } from "../../generated/prisma/enums";
import { catchAsync } from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";



declare global {
  namespace Express {
    interface Request {
      user?: {
        email: string;
        name: string;
        id: string;
        role: string;
      };
    }
  }
}



export const auth = (...requiredRoles: UserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken
      ? req.cookies.accessToken
      : req.headers.authorization?.startsWith("Bearer")
      ? req.headers.authorization?.split(" ")[1]
      : req.headers.authorization;

    if (!token) {
      throw new Error("You are not loged in ,Please log in ");
    }

    const verifiedToken = jwtUtils.verifyToken(token, config.jwt_access_secret);

    if (!verifiedToken.success) {
      throw new Error(verifiedToken.message);
    }

    const { email, name, id, role } = verifiedToken.data as JwtPayload;

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new Error(
        "Forbidden , you dont have permission to access the resources."
      );
    }

    const user = await prisma.user.findUnique({
      where: { id, email, name, role },
    });

    if (!user) {
      throw new Error("User not found. Please login");
    }

    if (user.status === "BANNED") {
      throw new Error("Your account has been blocked. please contact support.");
    }

    req.user = {
      email,
      id,
      name,
      role,
    };

    next();
  });
};