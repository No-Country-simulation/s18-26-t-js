import db from '@/libs/db'
import { NextResponse } from 'next/server'

// Get all reviews by user ID
export async function GET(request, {params}) {
  const { id } = params;
  try {
    const reviews = await db.review.findMany({
      where: {
        userId: Number(id),
      },
      select: {
        id: true,
        comment: true,
        rating: true,
        images: true,
        createdAt: true,
        // user: {
        //   select: {
        //     id: true,
        //     username: true,
        //   }
        // },
        restaurant: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    });

    

    return NextResponse.json(reviews);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ response: 'Error al obtener las reseñas del usuario.' }, { status: 500 });
  }
}