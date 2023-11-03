-- CreateTable
CREATE TABLE "Kyc" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "goal" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "activity" TEXT NOT NULL,
    "diet" TEXT NOT NULL,
    "assignedToUserId" TEXT NOT NULL,
    CONSTRAINT "Kyc_assignedToUserId_fkey" FOREIGN KEY ("assignedToUserId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
