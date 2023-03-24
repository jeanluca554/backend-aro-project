/*
  Warnings:

  - Added the required column `cardToken` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `installments` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "price" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "products_on_transactions" (
    "transactionId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    PRIMARY KEY ("transactionId", "productId"),
    CONSTRAINT "products_on_transactions_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transaction" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "products_on_transactions_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "identity" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "adressCity" TEXT NOT NULL,
    "adressComplement" TEXT NOT NULL,
    "adressDistrict" TEXT NOT NULL,
    "adressNumber" TEXT NOT NULL,
    "adressStateInitials" TEXT NOT NULL,
    "adressStreet" TEXT NOT NULL,
    "adressZipCode" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "cardToken" TEXT NOT NULL,
    "installments" INTEGER NOT NULL,
    "discount" DECIMAL,
    "canceledAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "transaction_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_transaction" ("canceledAt", "createdAt", "id", "paymentMethod") SELECT "canceledAt", "createdAt", "id", "paymentMethod" FROM "transaction";
DROP TABLE "transaction";
ALTER TABLE "new_transaction" RENAME TO "transaction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "customer_email_key" ON "customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customer_identity_key" ON "customer"("identity");
