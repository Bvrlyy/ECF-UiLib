-- CreateTable
CREATE TABLE "methodologie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "usages" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "outil" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "catégorie" TEXT NOT NULL,
    "lien" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "composant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "exemple" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "composant_methodologie" (
    "id_composant_methodologie" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_composant" INTEGER NOT NULL,
    "id_methodologie" INTEGER NOT NULL,
    CONSTRAINT "composant_methodologie_id_composant_fkey" FOREIGN KEY ("id_composant") REFERENCES "composant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "composant_methodologie_id_methodologie_fkey" FOREIGN KEY ("id_methodologie") REFERENCES "methodologie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "composant_outil" (
    "id_composant_outil" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_composant" INTEGER NOT NULL,
    "id_outil" INTEGER NOT NULL,
    CONSTRAINT "composant_outil_id_composant_fkey" FOREIGN KEY ("id_composant") REFERENCES "composant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "composant_outil_id_outil_fkey" FOREIGN KEY ("id_outil") REFERENCES "outil" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "outil_methodologie" (
    "id_outil_methodologie" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_outil" INTEGER NOT NULL,
    "id_methodologie" INTEGER NOT NULL,
    CONSTRAINT "outil_methodologie_id_methodologie_fkey" FOREIGN KEY ("id_methodologie") REFERENCES "methodologie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "outil_methodologie_id_outil_fkey" FOREIGN KEY ("id_outil") REFERENCES "outil" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "composant_methodologie_id_composant_id_methodologie_key" ON "composant_methodologie"("id_composant", "id_methodologie");

-- CreateIndex
CREATE UNIQUE INDEX "composant_outil_id_composant_id_outil_key" ON "composant_outil"("id_composant", "id_outil");

-- CreateIndex
CREATE UNIQUE INDEX "outil_methodologie_id_outil_id_methodologie_key" ON "outil_methodologie"("id_outil", "id_methodologie");
