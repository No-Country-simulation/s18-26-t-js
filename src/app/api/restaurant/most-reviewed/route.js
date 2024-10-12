// GET /api/restaurant/most-reviewed?limit=5&offset=0

import {NextResponse } from 'next/server';
import prisma from '@/libs/db'; 

export async function GET(req) {
  try {
    //  Paginación
    const { limit = 10, offset = 0 } = req.nextUrl.searchParams;

    // Obtener restaurantes ordenados por número de reseñas y calificación promedio
    const restaurants = await prisma.restaurant.findMany({
      // Incluir el recuento de reseñas en lugar de cargar todas las reseñas
      include: {
        _count: {
          select: { reviews: true }, // Solo contar las reseñas
        },
      },
      orderBy: [
        {
          reviews: { _count: 'desc' }, // Ordenar (mayor a menor)
        },
        {
          averageRating: 'desc', // Ordenar por mejor promedio
        },
      ],
      take: parseInt(limit, 10), // Limitar resultados
      skip: parseInt(offset, 10), // Desplazamiento 
    });

    // Formatear la respuesta
    const formattedRestaurants = restaurants.map((restaurant) => ({
      id: restaurant.id,
      name: restaurant.name,
      city: restaurant.city,
      location: restaurant.location,
      averageRating: restaurant.averageRating,
      reviewsCount: restaurant._count.reviews, // Número de reseñas
      imageUrl: restaurant.imageUrl,
      logoUrl: restaurant.logoUrl,
      description: restaurant.description,
    }));

    return NextResponse.json(formattedRestaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return NextResponse.json({ error: 'Error fetching restaurants' }, { status: 500 });
  }
}
