/*
  Warnings:

  - A unique constraint covering the columns `[stripePaymentId]` on the table `payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stripePaymentId` to the `payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payment" ADD COLUMN     "stripePaymentId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "payment_stripePaymentId_key" ON "payment"("stripePaymentId");
