/*
  Warnings:

  - You are about to drop the column `image` on the `Town` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Town" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "alignment" TEXT NOT NULL,
    "nativeTerrain" TEXT,
    "imageWithFort" TEXT,
    "imageWithoutFort" TEXT,
    "imageMain" TEXT,
    "imageMainNoBuildings" TEXT,
    "soundtrack" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Town" ("alignment", "createdAt", "description", "id", "imageMain", "imageMainNoBuildings", "imageWithFort", "imageWithoutFort", "name", "nativeTerrain", "slug", "soundtrack", "updatedAt") SELECT "alignment", "createdAt", "description", "id", "imageMain", "imageMainNoBuildings", "imageWithFort", "imageWithoutFort", "name", "nativeTerrain", "slug", "soundtrack", "updatedAt" FROM "Town";
DROP TABLE "Town";
ALTER TABLE "new_Town" RENAME TO "Town";
CREATE UNIQUE INDEX "Town_slug_key" ON "Town"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
