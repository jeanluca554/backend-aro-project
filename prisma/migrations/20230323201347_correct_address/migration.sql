/*
  Warnings:

  - You are about to drop the column `adressCity` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `adressComplement` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `adressDistrict` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `adressNumber` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `adressStateInitials` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `adressStreet` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `adressZipCode` on the `customer` table. All the data in the column will be lost.
  - Added the required column `addressCity` to the `customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressComplement` to the `customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressDistrict` to the `customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressNumber` to the `customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressStateInitials` to the `customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressStreet` to the `customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressZipCode` to the `customer` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "identity" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "addressCity" TEXT NOT NULL,
    "addressComplement" TEXT NOT NULL,
    "addressDistrict" TEXT NOT NULL,
    "addressNumber" TEXT NOT NULL,
    "addressStateInitials" TEXT NOT NULL,
    "addressStreet" TEXT NOT NULL,
    "addressZipCode" TEXT NOT NULL
);
INSERT INTO "new_customer" ("email", "id", "identity", "name", "phone") SELECT "email", "id", "identity", "name", "phone" FROM "customer";
DROP TABLE "customer";
ALTER TABLE "new_customer" RENAME TO "customer";
CREATE UNIQUE INDEX "customer_email_key" ON "customer"("email");
CREATE UNIQUE INDEX "customer_identity_key" ON "customer"("identity");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
