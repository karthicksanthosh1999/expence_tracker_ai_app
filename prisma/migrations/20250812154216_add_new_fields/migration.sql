/*
  Warnings:

  - You are about to drop the `jobs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `leads` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[mobile]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mobile` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryType` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "mobile" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "category" ADD COLUMN     "categoryType" TEXT NOT NULL;

-- DropTable
DROP TABLE "jobs";

-- DropTable
DROP TABLE "leads";

-- CreateIndex
CREATE UNIQUE INDEX "User_mobile_key" ON "User"("mobile");
