import db from '@/libs/db'

export default async function actualizarPromedio (restauranteId) {
  
  console.log(restauranteId)
  // Obtener reseñas del restaurante...
  const reviews = await db.review.findMany({
    where: {
      id_restaurante: restauranteId,
    }
  });

  // 3. Promedio...
  let calificacionPromedio = 0;
  if (reviews.length > 0) {
    const sumaCalificaciones = reviews.reduce((total, review) => total + review.calificacion, 0);
    calificacionPromedio = Math.round(sumaCalificaciones / reviews.length);
  }

  // 4. Actualizar la calificacion.. .
  await db.restaurante.update({
    where: { 
      id: restauranteId
    },
    data: { 
      calificacionPromedio 
    },
  });

  return true;
}