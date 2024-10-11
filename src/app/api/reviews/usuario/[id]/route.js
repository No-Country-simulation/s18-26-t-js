import db from '@/libs/db'
import { NextResponse } from 'next/server'

// Get all reviews by user ID
export async function GET(request, {params}) {
  const { id } = params;
  console.log(id);
  try {
    const reviews = await db.review.findMany({
      where: {
        id_user: Number(id),
      },
      select: {
        id: true,
        comentario: true,
        calificacion: true,
        images: true,
        createdAt: true,
        // user: {
        //   select: {
        //     id: true,
        //     username: true,
        //   }
        // },
        restaurante: {
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