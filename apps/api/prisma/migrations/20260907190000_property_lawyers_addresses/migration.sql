-- CreateTable
CREATE TABLE "Lawyer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT,
    "specialty" TEXT,
    "phone" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lawyer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedAddress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT,
    "cityCode" TEXT,
    "streetCode" TEXT,
    "region" TEXT,
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedAddress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Lawyer_userId_idx" ON "Lawyer"("userId");

-- CreateIndex
CREATE INDEX "SavedAddress_userId_idx" ON "SavedAddress"("userId");

-- AddForeignKey
ALTER TABLE "Lawyer" ADD CONSTRAINT "Lawyer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedAddress" ADD CONSTRAINT "SavedAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
