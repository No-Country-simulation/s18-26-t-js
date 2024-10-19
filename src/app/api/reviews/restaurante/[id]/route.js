import db from '@/libs/db'
import { NextResponse } from 'next/server'

export async function GET(request, {params}) {
  const { id } = params;
  try {
    const reviews = await db.review.findMany({
      where: {
        restaurantId: Number(id),
      },
      select: {
        id: true,
        comment: true,
        rating: true,
        images: {
          select: {
            id: true,
            imgUrl: true,
          }
        },
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
          }
        }
        // restaurant: {
        //   select: {
        //     id: true,
        //     name: true,
        //   }
        // }
      }
    });
    return NextResponse.json(reviews);
  } catch {
    return NextResponse.json({ response: 'Error al obtener las reseñas del restaurante.' }, { status: 500 });
  }
}