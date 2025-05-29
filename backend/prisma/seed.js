import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

async function main() {

  await prisma.category.createMany({
    data: [
      { name: "Manga" },
      { name: "Figure" },
      { name: "Poster" },
      { name: "Badge" },
      { name: "Clothing" },
      { name: "Accessories" },
      { name: "Funko Pop! Anime" },
      { name: "Stationery" },
    ],
    skipDuplicates: true,
  });


  console.log('✅ Демо-данные успішно додані!');
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
