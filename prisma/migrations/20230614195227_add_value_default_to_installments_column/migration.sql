/*
  Warnings:

  - Made the column `installments` on table `transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `transaction` MODIFY `installments` INTEGER NOT NULL DEFAULT 1;
