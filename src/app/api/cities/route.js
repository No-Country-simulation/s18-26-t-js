import prisma from '@/libs/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const cities = await prisma.city.findMany();
    return NextResponse.json(cities);
  } catch (error) {
    console.error('Error fetching cities:', error);
    return NextResponse.json(
      { error: 'Error al obtener las ciudades.' },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const { name } = await request.json();
    const city = await prisma.city.create({
      data: { name },
    });

    return NextResponse.json(city);
  } catch (error) {
    if (error.code === 'P2002')
      return NextResponse.json({ error: 'Ciudad ya existe.' }, { status: 409 });
    console.error('Error creating city:', error);
    return NextResponse.json(
      { error: 'Error al crear ciudad.' },
      { status: 500 },
    );
  }
}
