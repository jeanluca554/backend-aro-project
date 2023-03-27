-- CreateTable
CREATE TABLE "transaction_unsuccessfully" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "errorCode" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "transaction_unsuccessfully_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer" ("identity") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_products_on_transactions" (
    "transactionId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "transactionUnsuccessfullyId" TEXT,

    PRIMARY KEY ("transactionId", "productId"),
    CONSTRAINT "products_on_transactions_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transaction" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "products_on_transactions_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "products_on_transactions_transactionUnsuccessfullyId_fkey" FOREIGN KEY ("transactionUnsuccessfullyId") REFERENCES "transaction_unsuccessfully" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_products_on_transactions" ("productId", "transactionId") SELECT "productId", "transactionId" FROM "products_on_transactions";
DROP TABLE "products_on_transactions";
ALTER TABLE "new_products_on_transactions" RENAME TO "products_on_transactions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
