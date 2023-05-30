/*
  Warnings:

  - You are about to drop the column `cardToken` on the `transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `cardToken`,
    ADD COLUMN `transactionToken` VARCHAR(191) NULL;
