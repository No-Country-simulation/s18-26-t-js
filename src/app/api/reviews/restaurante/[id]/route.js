import db from '@/libs/db'
import { NextResponse } from 'next/server'

export async function GET(request, {params}) {
  const { id } = params;
  try {
    const reviews = await db.review.findMany({
      where: {
        id_restaurante: Number(id),
      },
      select: {
        id: true,
        comentario: true,
        calificacion: true,
        images: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
          }
        }
        // restaurante: {
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