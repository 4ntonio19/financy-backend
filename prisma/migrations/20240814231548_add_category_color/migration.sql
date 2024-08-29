/*
  Warnings:

  - Added the required column `category_color` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "category_color" TEXT NOT NULL;
