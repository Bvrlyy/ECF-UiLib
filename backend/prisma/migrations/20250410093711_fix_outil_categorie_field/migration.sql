/*
  Warnings:

  - You are about to drop the column `catégorie` on the `outil` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nom]` on the table `composant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nom]` on the table `methodologie` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categorie` to the `outil` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_outil" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "categorie" TEXT NOT NULL,
    "lien" TEXT NOT NULL
);
INSERT INTO "new_outil" ("id", "lien", "nom") SELECT "id", "lien", "nom" FROM "outil";
DROP TABLE "outil";
ALTER TABLE "new_outil" RENAME TO "outil";
CREATE UNIQUE INDEX "outil_nom_key" ON "outil"("nom");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "composant_nom_key" ON "composant"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "methodologie_nom_key" ON "methodologie"("nom");
