-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "elo" INTEGER NOT NULL
);
-- CreateTable
CREATE TABLE "Rating" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "authorId" INTEGER,
    "user1Id" INTEGER,
    "user2Id" INTEGER,
    CONSTRAINT "Rating_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT "Rating_user1Id_fkey" FOREIGN KEY ("user1Id") REFERENCES "User" ("id") ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT "Rating_user2Id_fkey" FOREIGN KEY ("user2Id") REFERENCES "User" ("id") ON DELETE
    SET NULL ON UPDATE CASCADE
);
-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");