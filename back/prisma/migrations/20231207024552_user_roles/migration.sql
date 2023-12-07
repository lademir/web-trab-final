-- CreateTable
CREATE TABLE "Role" (
    "rid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "UserRoles" (
    "userUid" INTEGER NOT NULL,
    "roleRid" INTEGER NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("userUid", "roleRid"),
    CONSTRAINT "UserRoles_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserRoles_roleRid_fkey" FOREIGN KEY ("roleRid") REFERENCES "Role" ("rid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");
