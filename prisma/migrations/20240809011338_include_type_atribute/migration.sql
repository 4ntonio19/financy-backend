/*
  Warnings:

  - Added the required column `type` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "type" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "type" BOOLEAN NOT NULL;
