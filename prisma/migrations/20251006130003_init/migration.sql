-- CreateTable
CREATE TABLE "Pet" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "dono" TEXT NOT NULL,

    CONSTRAINT "Pet_db" PRIMARY KEY ("id")
);
