import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function main() {
  const categories = [
    { name: "Manga", slug: "manga", image: "/images/mangacategory.png" },
    { name: "Figure", slug: "figures", image: "/images/narutocategory.png" },
    { name: "Poster", slug: "poster", image: "/images/postercategory.png" },
    { name: "Badge", slug: "badge", image: "/images/badgecategory.png" },
    { name: "Clothing", slug: "clothing", image: "/images/futbolkacategory.png" },
    { name: "Accessories", slug: "accessories", image: "/images/acsesyarycategory.png" },
    { name: "Funko Pop! Anime", slug: "funko-pop-anime", image: "/images/funkocategory.png" },
    { name: "Stationery", slug: "stationery", image: "/images/stationerycategory.png" },
  ];

  await prisma.category.createMany({
    data: categories,
    skipDuplicates: true,
  });

  console.log("Categories added successfully!");
}

main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());
