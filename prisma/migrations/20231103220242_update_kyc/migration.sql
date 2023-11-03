/*
  Warnings:

  - You are about to alter the column `height` on the `Kyc` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `weight` on the `Kyc` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Kyc" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "goal" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "activity" TEXT NOT NULL,
    "diet" TEXT NOT NULL,
    "assignedToUserId" TEXT NOT NULL,
    CONSTRAINT "Kyc_assignedToUserId_fkey" FOREIGN KEY ("assignedToUserId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Kyc" ("activity", "assignedToUserId", "diet", "gender", "goal", "height", "id", "weight") SELECT "activity", "assignedToUserId", "diet", "gender", "goal", "height", "id", "weight" FROM "Kyc";
DROP TABLE "Kyc";
ALTER TABLE "new_Kyc" RENAME TO "Kyc";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
