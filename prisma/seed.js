import { PrismaClient } from '@prisma/client';
import { cities } from './citiesData.js';

const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.city.deleteMany();
    console.log('Deleted records in city table');

    // await prisma.$queryRaw`ALTER TABLE City AUTO_INCREMENT = 1`;
    // console.log('reset city auto increment to 1');

    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='City'`;
    console.log('Reset city auto increment to 1');

    await prisma.city.createMany({
      data: cities,
    });
    console.log('Added cities data');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
