/*
  Warnings:

  - The primary key for the `customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `customer` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "message" TEXT,
    "status" INTEGER,
    "cardToken" TEXT,
    "installments" INTEGER NOT NULL,
    "discount" DECIMAL,
    "canceledAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "transaction_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer" ("identity") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_transaction" ("canceledAt", "cardToken", "createdAt", "customerId", "discount", "id", "installments", "message", "paymentMethod", "status") SELECT "canceledAt", "cardToken", "createdAt", "customerId", "discount", "id", "installments", "message", "paymentMethod", "status" FROM "transaction";
DROP TABLE "transaction";
ALTER TABLE "new_transaction" RENAME TO "transaction";
CREATE TABLE "new_customer" (
    "email" TEXT NOT NULL,
    "identity" TEXT NOT NULL PRIMARY KEY,
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
INSERT INTO "new_customer" ("addressCity", "addressComplement", "addressDistrict", "addressNumber", "addressStateInitials", "addressStreet", "addressZipCode", "email", "identity", "name", "phone") SELECT "addressCity", "addressComplement", "addressDistrict", "addressNumber", "addressStateInitials", "addressStreet", "addressZipCode", "email", "identity", "name", "phone" FROM "customer";
DROP TABLE "customer";
ALTER TABLE "new_customer" RENAME TO "customer";
CREATE UNIQUE INDEX "customer_email_key" ON "customer"("email");
CREATE UNIQUE INDEX "customer_identity_key" ON "customer"("identity");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
