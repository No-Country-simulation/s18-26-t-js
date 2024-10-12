// GET /api/restaurant/top-rated?limit=5&offset=10

import { NextResponse } from 'next/server';
import prisma from '@/libs/db'; 

export async function GET(req) {
  try {
    // Extraer parámetros de consulta si quieres manejar paginación o limitar resultados
    const { limit = 10, offset = 0 } = req.nextUrl.searchParams;

    const restaurants = await prisma.restaurant.findMany({
      where: {
        averageRating: {
          gt: 0, // Solo devolver restaurantes con calificación mayor a 0
        },
      },
      orderBy: {
        averageRating: 'desc', // Ordenar de mayor a menor por calificación promedio
      },
      take: parseInt(limit, 10), // Limitar la cantidad de resultados
      skip: parseInt(offset, 10), // Desplazamiento (útil para paginación)
    });

    return NextResponse.json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return NextResponse.json({ error: 'Error fetching restaurants' }, { status: 500 });
  }
}
