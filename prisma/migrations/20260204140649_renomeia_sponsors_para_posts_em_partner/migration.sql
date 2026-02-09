/*
  Warnings:

  - You are about to drop the column `sponsorId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_sponsorId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "sponsorId",
ADD COLUMN     "partnerId" TEXT;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE SET NULL ON UPDATE CASCADE;
