import { NextResponse } from 'next/server';
import prisma from '@/libs/db';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        reviews: true,
        restaurants: true,
        favorites: true,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
