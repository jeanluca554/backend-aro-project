/*
  Warnings:

  - You are about to alter the column `status` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

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
    CONSTRAINT "transaction_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_transaction" ("canceledAt", "cardToken", "createdAt", "customerId", "discount", "id", "installments", "message", "paymentMethod", "status") SELECT "canceledAt", "cardToken", "createdAt", "customerId", "discount", "id", "installments", "message", "paymentMethod", "status" FROM "transaction";
DROP TABLE "transaction";
ALTER TABLE "new_transaction" RENAME TO "transaction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
