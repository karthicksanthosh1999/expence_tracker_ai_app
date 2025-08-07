/*
  Warnings:

  - Added the required column `company` to the `leads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `leads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `leads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productFamily` to the `leads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productName` to the `leads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requestType` to the `leads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "leads" ADD COLUMN     "company" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "productFamily" TEXT NOT NULL,
ADD COLUMN     "productName" TEXT NOT NULL,
ADD COLUMN     "requestType" TEXT NOT NULL;
