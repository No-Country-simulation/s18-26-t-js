import db from '@/libs/db'
import { NextResponse } from 'next/server'
import actualizarPromedio from '@/helpers/promedio'

// consultar todas las reseñas
export async function GET() {
  try {
    const reviews = await db.review.findMany({
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
        },
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
    return NextResponse.json({ response: 'Error al obtener las reseñas.' }, { status: 500 });
  }
}

// Crear Nueva Reseña
export async function POST(request) {
  const { id_user, id_restaurante, comentario, calificacion, images } = await request.json();
  if (calificacion < 1 || calificacion > 5) {
    return NextResponse.json({ response: 'Error al crear nueva reseña. La calificacion debe ser un numero entre 1 y 5.' }, { status: 400 });
  }

  try {
    const nuevaReview = await db.review.create({
      data: {
        comentario,
        calificacion,
        id_restaurante,
        id_user,
        images,
      },
    });

    await actualizarPromedio(id_restaurante);

    return NextResponse.json(nuevaReview);
  } catch (e) {
    console.log(e)
    return NextResponse.json({response: 'Error al crear nueva reseña.'}, {status: 500});
  }
}
