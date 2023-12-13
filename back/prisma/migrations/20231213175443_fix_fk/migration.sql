-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Trainer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "UserId" INTEGER NOT NULL,
    CONSTRAINT "Trainer_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Trainer" ("UserId", "createdAt", "id", "updatedAt") SELECT "UserId", "createdAt", "id", "updatedAt" FROM "Trainer";
DROP TABLE "Trainer";
ALTER TABLE "new_Trainer" RENAME TO "Trainer";
CREATE UNIQUE INDEX "Trainer_UserId_key" ON "Trainer"("UserId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
