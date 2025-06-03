-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "city" TEXT,
ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "street" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3);
