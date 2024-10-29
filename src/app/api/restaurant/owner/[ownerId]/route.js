import prisma from '@/libs/db';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { ownerId } = params;

  if (!ownerId) {
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
        userId: Number(ownerId),
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
          orderBy: {
            createdAt: 'desc',
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
