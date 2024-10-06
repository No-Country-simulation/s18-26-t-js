import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  const { id_usuario, id_restaurante, comentario, calificacion } = await request.json();

  try {
    // 1. Guardar Reseña...
    const nuevaReview = await prisma.review.create({
      data: {
        comentario,
        calificacion,
        id_restaurante,
        id_usuario,
      },
    });

    // 2. Reseñas del restaurante...
    const reviews = await prisma.review.findMany({
      where: {
        id_restaurante,
      },
    });

    // 3. Promedio...
    const sumaCalificaciones = reviews.reduce((total, review) => total + review.calificacion, 0);
    const calificacionPromedio = sumaCalificaciones / reviews.length;

    // 4. Actualizar la calificacion.. .
    await prisma.restaurante.update({
      where: { id: id_restaurante },
      data: { calificacionPromedio },
    });

    return new Response(JSON.stringify(nuevaReview), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error al agregar la reseña.' }), { status: 500 });
  }
}
