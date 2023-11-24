-- CreateTable
CREATE TABLE "Kyc" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "activity_factor" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "diet" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "target_weight" INTEGER NOT NULL,
    CONSTRAINT "Kyc_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
