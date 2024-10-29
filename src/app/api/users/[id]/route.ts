import { NextResponse } from 'next/server';
import prisma from '@/libs/db';

// GET .../api/users/[id]
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: {
        reviews: true,
        restaurants: true,
        favorites: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}
