-- CreateTable
CREATE TABLE "jobs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "responsibilities" TEXT NOT NULL,
    "jobType" TEXT NOT NULL,
    "qualification" TEXT NOT NULL,
    "salaryRange" TEXT NOT NULL,
    "requiredSkills" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);
