/*
  Warnings:

  - You are about to drop the column `deviceType` on the `login_history` table. All the data in the column will be lost.
  - You are about to drop the column `ipAddress` on the `login_history` table. All the data in the column will be lost.
  - You are about to drop the column `operatingSystem` on the `login_history` table. All the data in the column will be lost.
  - You are about to drop the column `userAgent` on the `login_history` table. All the data in the column will be lost.
  - You are about to drop the `plan_history` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ipaddress` to the `login_history` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "login_history" DROP CONSTRAINT "login_history_user_id_fkey";

-- DropForeignKey
ALTER TABLE "plan_history" DROP CONSTRAINT "plan_history_user_id_fkey";

-- AlterTable
ALTER TABLE "login_history" DROP COLUMN "deviceType",
DROP COLUMN "ipAddress",
DROP COLUMN "operatingSystem",
DROP COLUMN "userAgent",
ADD COLUMN     "devicetype" TEXT,
ADD COLUMN     "ipaddress" TEXT NOT NULL,
ADD COLUMN     "operatingsystem" TEXT,
ADD COLUMN     "useragent" TEXT,
ALTER COLUMN "user_id" DROP NOT NULL;

-- DropTable
DROP TABLE "plan_history";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "created_on" TIMESTAMP(0) NOT NULL,
    "modified_on" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "name" VARCHAR(50) NOT NULL,
    "address" TEXT,
    "profile_pic" VARCHAR(255),
    "token" VARCHAR(255),
    "role_id" INTEGER NOT NULL,
    "created_on" TIMESTAMP(0) NOT NULL,
    "modified_on" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "v_code" TEXT NOT NULL,
    "ipaddress" TEXT NOT NULL,
    "useragent" TEXT,
    "devicetype" TEXT,
    "operatingsystem" TEXT,
    "browser" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "role_name_key" ON "role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verification" ADD CONSTRAINT "verification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "login_history" ADD CONSTRAINT "login_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
