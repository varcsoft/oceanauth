-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "name" VARCHAR(50) NOT NULL,
    "address" TEXT,
    "profile_pic" VARCHAR(255),
    "created_on" TIMESTAMP(0) NOT NULL,
    "modified_on" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "login_history" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "userAgent" TEXT,
    "deviceType" TEXT,
    "operatingSystem" TEXT,
    "browser" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "login_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan_history" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "service" TEXT NOT NULL,
    "purchase_date" TIMESTAMP(0) NOT NULL,
    "created_on" TIMESTAMP(0) NOT NULL,
    "modified_on" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "plan_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "login_history" ADD CONSTRAINT "login_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_history" ADD CONSTRAINT "plan_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
