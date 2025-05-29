-- CreateTable
CREATE TABLE "Submission" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);
