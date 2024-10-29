import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { userId } = params;

  if (!userId) {
    return NextResponse.json(
      { error: 'User ID is required' },
      {
        status: 400,
      },
    );
  }

  try {
    const restaurants = await prisma.restaurant.findMany({
      where: {
        reviews: {
          some: {
            userId: parseInt(userId), // Filtra los restaurantes donde el usuario ha dejado reseñas
          },
        },
      },
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
      },
    });

    const formattedRestaurants = restaurants.map((restaurant) => ({
      ...restaurant,
      category: restaurant.category.map((rc) => rc.category.name),
      city: restaurant.city.name,
    }));

    return NextResponse.json(formattedRestaurants);
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Error fetching restaurants' }),
      { status: 500 },
    );
  }
}
