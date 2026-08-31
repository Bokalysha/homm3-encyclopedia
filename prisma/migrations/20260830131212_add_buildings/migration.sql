-- CreateTable
CREATE TABLE "Building" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "townId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "goldCost" INTEGER NOT NULL DEFAULT 0,
    "woodCost" INTEGER NOT NULL DEFAULT 0,
    "oreCost" INTEGER NOT NULL DEFAULT 0,
    "mercuryCost" INTEGER NOT NULL DEFAULT 0,
    "sulfurCost" INTEGER NOT NULL DEFAULT 0,
    "crystalCost" INTEGER NOT NULL DEFAULT 0,
    "gemCost" INTEGER NOT NULL DEFAULT 0,
    "requirements" TEXT,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Building_townId_fkey" FOREIGN KEY ("townId") REFERENCES "Town" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
