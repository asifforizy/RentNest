import { prisma } from "../../lib/prisma";
import { ICreateReview } from "./revies.interface";

const createReview = async (tenantId: string, payload: ICreateReview) => {
  const { propertyId, rating, comment } = payload;

  const completedRental = await prisma.rentalRequest.findFirst({
    where: {
      tenantId,
      propertyId,
      status: "COMPLETED",
    },
  });

  if (!completedRental) {
    throw new Error("You can only review a property after your rental is completed");
  }

  const alreadyReviewed = await prisma.review.findFirst({
    where: {
      tenantId,
      propertyId,
    },
  });

  if (alreadyReviewed) {
    throw new Error("You have already reviewed this property");
  }

  const review = await prisma.review.create({
    data: {
      tenantId,
      propertyId,
      rating,
      comment,
    },
  });

  return review;
};

const getReviewsByProperty = async (propertyId: string) => {
  const reviews = await prisma.review.findMany({
    where: { propertyId },
  });

  return reviews;
};

export const reviewServices = {
  createReview,
  getReviewsByProperty,
};
