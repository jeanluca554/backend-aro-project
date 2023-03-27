-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transaction_unsuccessfully" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "message" TEXT,
    "errorCode" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "transaction_unsuccessfully_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer" ("identity") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_transaction_unsuccessfully" ("createdAt", "customerId", "errorCode", "id", "message", "paymentMethod") SELECT "createdAt", "customerId", "errorCode", "id", "message", "paymentMethod" FROM "transaction_unsuccessfully";
DROP TABLE "transaction_unsuccessfully";
ALTER TABLE "new_transaction_unsuccessfully" RENAME TO "transaction_unsuccessfully";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
