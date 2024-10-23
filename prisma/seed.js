import { PrismaClient } from '@prisma/client';
import { cities } from './citiesData.js';
import { categories } from './categoriesData.js';

const prisma = new PrismaClient();

//Script para cargar datos iniciales
const load = async () => {
  try {
    // Restablecer el auto incremento en MySQL
    // await prisma.$queryRaw`ALTER TABLE City AUTO_INCREMENT = 1`;

    // Eliminar registros de la tabla City
    await prisma.city.deleteMany();
    console.log('Deleted records in city table');

    // Restablecer el auto incremento para City (opcional)
    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='City'`;
    console.log('Reset city auto increment to 1');

    // Agregar datos de ciudades
    await prisma.city.createMany({
      data: cities,
    });
    console.log('Added cities data');

    // Eliminar registros de la tabla Category
    await prisma.category.deleteMany();
    console.log('Deleted records in category table');

    // Restablecer el auto incremento para Category (opcional)
    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='Category'`;
    console.log('Reset category auto increment to 1');

    // Agregar datos de categorías
    await prisma.category.createMany({
      data: categories,
    });
    console.log('Added categories data');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
