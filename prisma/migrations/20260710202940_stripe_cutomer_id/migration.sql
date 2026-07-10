/*
  Warnings:

  - You are about to drop the column `strpeCustomerId` on the `payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripeCustomerId]` on the table `payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stripeCustomerId` to the `payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "payment_strpeCustomerId_key";

-- AlterTable
ALTER TABLE "payment" DROP COLUMN "strpeCustomerId",
ADD COLUMN     "stripeCustomerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "payment_stripeCustomerId_key" ON "payment"("stripeCustomerId");
