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
        },
        restaurant: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    });
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

  if (data.rating) {
    if (data.rating < 1 || data.rating > 5) {
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

    if (data.rating) {
      await actualizarPromedio(review.restaurantId);
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

    await actualizarPromedio(review.restaurantId);

    return NextResponse.json(review);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ response: 'Error al borrar la reseña.' }, { status: 500 });
  }
}