-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "photoURL" TEXT
);

-- CreateTable
CREATE TABLE "Kyc" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "goal" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "activity" TEXT NOT NULL,
    "diet" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Kyc_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
