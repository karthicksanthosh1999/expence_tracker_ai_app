/*
  Warnings:

  - Added the required column `accountNo` to the `Bank` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ifcode` to the `Bank` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Bank` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bank" ADD COLUMN     "accountNo" TEXT NOT NULL,
ADD COLUMN     "ifcode" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL;
