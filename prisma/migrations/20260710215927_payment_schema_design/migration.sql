/*
  Warnings:

  - The primary key for the `payment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_transactionId_fkey";

-- DropIndex
DROP INDEX "payment_transactionId_key";

-- AlterTable
ALTER TABLE "payment" DROP CONSTRAINT "payment_pkey",
DROP COLUMN "id",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "payment_pkey" PRIMARY KEY ("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "payment_userId_key" ON "payment"("userId");

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
