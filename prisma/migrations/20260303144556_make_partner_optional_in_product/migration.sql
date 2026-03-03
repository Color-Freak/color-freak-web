-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_partnerId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "partnerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE SET NULL ON UPDATE CASCADE;
