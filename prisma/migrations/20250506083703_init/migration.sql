-- CreateTable
CREATE TABLE "LotteryResult" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "firstPrize" TEXT NOT NULL,
    "nearFirst" TEXT[],
    "front3Digits" TEXT[],
    "last3Digits" TEXT[],
    "last2Digits" TEXT NOT NULL,
    "secondPrize" TEXT[],
    "thirdPrize" TEXT[],
    "fourthPrize" TEXT[],
    "fifthPrize" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LotteryResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LotteryResult_date_key" ON "LotteryResult"("date");
