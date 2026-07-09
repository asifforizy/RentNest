/*
  Warnings:

  - You are about to drop the column `categoryId` on the `property` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "property" DROP CONSTRAINT "property_categoryId_fkey";

-- AlterTable
ALTER TABLE "property" DROP COLUMN "categoryId",
ADD COLUMN     "categoryName" TEXT;

-- DropEnum
DROP TYPE "Categories";

-- AddForeignKey
ALTER TABLE "property" ADD CONSTRAINT "property_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "category"("name") ON DELETE SET NULL ON UPDATE CASCADE;
