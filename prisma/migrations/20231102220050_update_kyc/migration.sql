/*
  Warnings:

  - You are about to drop the column `userId` on the `Kyc` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Kyc" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "goal" TEXT,
    "gender" TEXT,
    "height" TEXT,
    "weight" TEXT,
    "activity" TEXT,
    "diet" TEXT,
    "birthday" TEXT,
    "assignedToUserId" TEXT,
    CONSTRAINT "Kyc_assignedToUserId_fkey" FOREIGN KEY ("assignedToUserId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Kyc" ("activity", "birthday", "diet", "gender", "goal", "height", "id", "weight") SELECT "activity", "birthday", "diet", "gender", "goal", "height", "id", "weight" FROM "Kyc";
DROP TABLE "Kyc";
ALTER TABLE "new_Kyc" RENAME TO "Kyc";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
