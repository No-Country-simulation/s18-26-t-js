import { NextResponse } from 'next/server'

import db from '@/libs/db'

import actualizarPromedio from '@/helpers/promedio'
import uploadImages from '@/helpers/uploadImages'

// consultar todas las reseñas
export async function GET() {
  try {
    const reviews = await db.review.findMany({
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
    return NextResponse.json(reviews);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ response: 'Error al obtener las reseñas.' }, { status: 500 });
  }
}

// Crear Nueva Reseña
export async function POST(request) {
  const data = await request.formData();
  
  const comment = data.get('comment')
  const rating = +data.get('rating')
  const restaurantId = +data.get('restaurantId')
  const userId = +data.get('userId')
  const images = data.getAll('image')

  /*
    {
      comment: 'dddddd',
      rating: 3,
      restaurantId: 2,
      userId: 7,
      images: [
        File {
          size: 192586,
          type: 'image/png',
          name: 'Captura de pantalla 2024-01-09 183129.png',
          lastModified: 1729273642185
        },
        File {
          size: 61563,
          type: 'image/png',
          name: 'Captura de pantalla 2024-01-09 184028.png',
          lastModified: 1729273642185
        },
      ]
    }
   */

  if (rating < 1 || rating > 5) {
    return NextResponse.json({ response: 'Error al crear nueva reseña. La calificacion debe ser un numero entre 1 y 5.' }, { status: 400 });
  }

  try {
    const nuevaReview = await db.review.create({
      data: {
        comment,
        rating,
        restaurantId,
        userId
      },
    });

    await actualizarPromedio(restaurantId);

    if (images.length > 0) {
      const imagesUrl= await uploadImages(images);
      
      // Subir imagenes a la base de datos
      await db.reviewImage.createMany({
        data: imagesUrl.map((url, index) => ({
          imgUrl: url,
          reviewId: nuevaReview.id,
        })),
      });
      
    }

    return NextResponse.json(nuevaReview);
  } catch (e) {
    console.log(e)
    return NextResponse.json({response: 'Error al crear nueva reseña.'}, {status: 500});
  }
}
