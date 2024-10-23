import { NextResponse } from 'next/server';
import prisma from '@/libs/db';

export async function GET() {
  try {
    const cities = await prisma.restaurant.findMany({
        select: {
          city: true,
        },
        where: {
          city: {
            not: null, //  excluir ciudades null
          },
        },
        distinct: ['city'], // Eliminar duplicadas
        orderBy: {
          city: 'asc', // Ordenar A-Z
        },
      });

    return NextResponse.json(cities);
  } catch (error) {
    console.error('Error fetching cities:', error);
    return NextResponse.json({ error: 'Error fetching cities' }, { status: 500 });
  }
}


