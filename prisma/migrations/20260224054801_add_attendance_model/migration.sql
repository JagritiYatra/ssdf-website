-- CreateTable
CREATE TABLE "Attendance" (
    "id" TEXT NOT NULL,
    "registrationId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "markedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Attendance_date_idx" ON "Attendance"("date");

-- CreateIndex
CREATE INDEX "Attendance_registrationId_idx" ON "Attendance"("registrationId");

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_registrationId_date_key" ON "Attendance"("registrationId", "date");
