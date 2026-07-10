/*
  Warnings:

  - You are about to drop the column `amount` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `paidAt` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `rentalRequestId` on the `subscription` table. All the data in the column will be lost.
  - Added the required column `currentPeriodEnd` to the `subscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_rentalRequestId_fkey";

-- DropIndex
DROP INDEX "subscription_rentalRequestId_key";

-- AlterTable
ALTER TABLE "subscription" DROP COLUMN "amount",
DROP COLUMN "paidAt",
DROP COLUMN "rentalRequestId",
ADD COLUMN     "currentPeriodEnd" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "provider" DROP NOT NULL;
