import db from '@/libs/db'

export default async function actualizarPromedio (restaurantId) {
  
  // Obtener reseñas del restaurante
  const reviews = await db.review.findMany({
    where: {
      restaurantId,
    }
  });

  // Calcular promedio
  let averageRating = 0;
  if (reviews.length > 0) {
    const sumaCalificaciones = reviews.reduce((total, review) => total + review.rating, 0);
    averageRating = sumaCalificaciones / reviews.length; // Evitar redondeo
  }

  // Actualizar la calificación en la base de datos
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
