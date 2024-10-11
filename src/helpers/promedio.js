import db from '@/libs/db'

export default async function actualizarPromedio (restaurantId) {
  
  // Obtener reseñas del restaurante...
  const reviews = await db.review.findMany({
    where: {
      restaurantId,
    }
  });

  // 3. Promedio...
  let averageRating = 0;
  if (reviews.length > 0) {
    const sumaCalificaciones = reviews.reduce((total, review) => total + review.rating, 0);
    averageRating = Math.round(sumaCalificaciones / reviews.length);
  }

  // 4. Actualizar la calificacion.. .
  await db.restaurant.update({
    where: { 
      id: restaurantId
    },
    data: { 
      averageRating 
    },
  });

  return true;
}