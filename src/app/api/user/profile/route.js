import { NextResponse } from 'next/server';
import { getSession } from 'next-auth/react'; // La sesión
import prisma from '@/libs/db';

export async function PATCH(req) {
  try {
    const session = await getSession({ req }); // Obtener autenticado

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Obtener el ID del usuario desde la sesión
    const userId = session.user.id; 

    const { name, lastname, birthDate, avatarUrl } = await req.json();

    // Actualizar los campos del perfil del usuario
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        lastname,
        birthDate: birthDate ? new Date(birthDate) : undefined,
        avatarUrl,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json({ error: 'Error updating user profile' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const session = await getSession({ req });

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ error: 'Error fetching user profile' }, { status: 500 });
  }
}
