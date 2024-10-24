import prisma from '@/libs/db';

// GET .../api/restaurant/search2?value=mendoza
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const value = searchParams.get('value');

  try {
    if (!value) {
      return new Response(JSON.stringify({ error: 'Missing search value' }), { status: 400 });
    }

    // Obtener todos los restaurantes de la base de datos
    const restaurants = await prisma.restaurant.findMany({
      include: {
        // Incluir la relación de categoría para obtener el nombre de la categoría
        category: {
          include: {
            category: true, // Asegúrate de que esta relación esté correctamente configurada en tu esquema
          },
        },
        city: true,
        reviews: {
          select: {
            id: true,
            comment: true,
            rating: true,
            user: {
              select: {
                id: true,
                username: true,
              },
            },
            images: {
              select: {
                id: true,
                imgUrl: true,
              },
            },
            createdAt: true,
          },
        },
      },
    });

    // Normalizar el valor de búsqueda
    const normalizedInputValue = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    // Filtrar los restaurantes que coincidan con el valor
    const filteredRestaurants = restaurants.filter((restaurant) => {
      // Normalizar y comprobar el nombre del restaurante
      const normalizedRestaurantName = restaurant.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      const normalizedCityName = restaurant.city.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

      // Comprobar si el valor coincide con el nombre del restaurante, la ciudad o la categoría
      const matchesCategory = restaurant.category.some(rc => {
        const normalizedCategoryName = rc.category.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        return normalizedCategoryName.includes(normalizedInputValue);
      });

      return (
        normalizedRestaurantName.includes(normalizedInputValue) ||
        normalizedCityName.includes(normalizedInputValue) ||
        matchesCategory
      );
    });

    // Formatear los resultados para incluir solo los nombres de las categorías
    const formattedRestaurants = filteredRestaurants.map((restaurant) => ({
      ...restaurant,
      category: restaurant.category.map((rc) => ({
        id: rc.category.id,
        name: rc.category.name,
      })),
    }));

    return new Response(JSON.stringify(formattedRestaurants), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Error fetching restaurants' }),
      { status: 500 },
    );
  }
}
