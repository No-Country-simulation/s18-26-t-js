import db from '@/libs/db'
import { NextResponse } from 'next/server'
import actualizarPromedio from '@/helpers/promedio';

// Consultar Reseña por ID
export async function GET(request, {params}) {
  const { id } = params;
  
  try {
    const review = await db.review.findUnique({
      where: {
        id: Number(id),
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
        },
        restaurante: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    });
    console.log(review);
    return NextResponse.json(review);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ response: 'Error al obtener la reseña.' }, { status: 500 });
  }
}

// Actualizar Reseña por ID
export async function PUT(request, {params}) {
  const { id } = params;
  const data = await request.json();
  if (data.calificacion) {
    if (data.calificacion < 1 || data.calificacion > 5) {
      return NextResponse.json({ response: 'Error al actualizar la reseña. La calificacion debe ser un numero entre 1 y 5.' }, { status: 400 });
    }
  }
  
  try {

    const review = await db.review.update({
      where: {
        id: Number(id),
      },
      data
    })

    if (data.calificacion) {
      await actualizarPromedio(review.id_restaurante);
    }

    return NextResponse.json(review);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ response: 'Error al actualizar la reseña.' }, { status: 500 });
  }
}

// Borrar Reseña por ID
export async function DELETE(request, {params}) {
  const { id } = params;
  try {
    const review = await db.review.delete({
      where: {
        id: Number(id),
      },
    })

    await actualizarPromedio(review.id_restaurante);

    return NextResponse.json(review);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ response: 'Error al borrar la reseña.' }, { status: 500 });
  }
}