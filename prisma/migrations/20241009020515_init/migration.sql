-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Restaurante" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "telefono" TEXT,
    "calificacionPromedio" REAL DEFAULT 0,
    "imagen" TEXT
);

-- CreateTable
CREATE TABLE "Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "comentario" TEXT NOT NULL,
    "calificacion" INTEGER NOT NULL,
    "id_restaurante" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    CONSTRAINT "Review_id_restaurante_fkey" FOREIGN KEY ("id_restaurante") REFERENCES "Restaurante" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
