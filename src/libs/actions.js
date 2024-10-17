import { getServerSession } from 'next-auth';
import prisma from './db';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { authOptions } from '@/libs/auth';

export async function getSession() {
  return await getServerSession(authOptions);
}

// User -----

export async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) throw new Error('You must be logged in');

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) throw new Error('User not found');

    return currentUser;
  } catch (error) {
    console.error(`💥Error:`, error);
    return null;
  }
}

// Restaurant -----

export async function getRestaurantById(restaurantId) {
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
      include: { reviews: true },
    });

    if (!restaurant) throw new Error('Sorry, no restaurant was found');

    return restaurant;
  } catch (error) {
    console.error(`💥Error:`, error);
    return null;
  }
}

// Reviews -----

export async function getReviewsByRestaurantId(restaurantId) {
  try {
    const reviews = await prisma.review.findMany({
      where: { restaurantId: restaurantId },
      include: { user: true },
    });

    if (reviews.length === 0) throw new Error('Sorry,no reviews were found');

    return reviews;
  } catch (error) {
    console.error(`💥Error:`, error);
    return [];
  }
}
