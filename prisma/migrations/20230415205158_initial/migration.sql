-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolio-entries" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "clientName" TEXT,
    "clientLink" TEXT,
    "clientReview" TEXT,
    "coverImageUrl" TEXT,

    CONSTRAINT "portfolio-entries_pkey" PRIMARY KEY ("id")
);
