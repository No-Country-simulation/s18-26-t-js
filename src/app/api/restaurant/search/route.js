import prisma from '@/libs/db';

// GET .../api/restaurant/search?name=nombre_restaurante
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');

  try {
    // Si no hay un parámetro de nombre, devuelve todos los restaurantes
    if (!name) {
      const allRestaurants = await prisma.restaurant.findMany({
        include: {
          category: {
            include: {
              category: true,
            },
          },
          city: {
            select: {
              name: true,
            },
          },
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

      // Formatear los resultados para incluir solo los nombres de las categorías y la ciudad
      const formattedRestaurants = allRestaurants.map((restaurant) => ({
        ...restaurant,
        category: restaurant.category.map((rc) => ({
          id: rc.category.id,
          name: rc.category.name,
        })),
        city: restaurant.city.name,
      }));

      return new Response(JSON.stringify(formattedRestaurants), {
        status: 200,
      });
    }

    // Obtener todos los restaurantes de la base de datos si hay un nombre de búsqueda
    const restaurants = await prisma.restaurant.findMany({
      include: {
        category: {
          include: {
            category: true,
          },
        },
        city: {
          select: {
            name: true,
          },
        },
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

    // Normalizar los nombres y compararlos
    const normalizedInputName = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

    // Filtrar los restaurantes que coincidan con el nombre
    const filteredRestaurants = restaurants.filter((restaurant) => {
      const normalizedRestaurantName = restaurant.name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
      return normalizedRestaurantName.includes(normalizedInputName);
    });

    // Formatear los resultados para incluir solo los nombres de las categorías y la ciudad
    const formattedRestaurants = filteredRestaurants.map((restaurant) => ({
      ...restaurant,
      category: restaurant.category.map((rc) => ({
        id: rc.category.id,
        name: rc.category.name,
      })),
      city: restaurant.city.name,
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
