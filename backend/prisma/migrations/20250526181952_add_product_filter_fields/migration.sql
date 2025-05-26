-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "ageRating" TEXT,
ADD COLUMN     "anime" TEXT,
ADD COLUMN     "brand" TEXT,
ADD COLUMN     "color" TEXT,
ADD COLUMN     "features" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "inStock" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "language" TEXT,
ADD COLUMN     "material" TEXT,
ADD COLUMN     "productType" TEXT,
ADD COLUMN     "rating" DOUBLE PRECISION,
ADD COLUMN     "size" TEXT;
