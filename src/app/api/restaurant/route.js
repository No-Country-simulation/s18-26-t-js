import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Handler GET
export async function GET() {
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: {
        reviews: true
      }
    });
    return NextResponse.json(restaurants, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al obtener los restaurantes' }, { status: 500 });
  }
}

// Handler POST
export async function POST(req) {
  try {
    const body = await req.json(); // Parsear el cuerpo de la solicitud
    const { name, city, location, phone, averageRating, imageUrl} = body;

    const newRestaurant = await prisma.restaurant.create({
      data: {
        name,
        city,
        location,
        phone,
        averageRating,
        imageUrl,
      },
    });
    return NextResponse.json(newRestaurant, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al crear el restaurante' }, { status: 500 });
  }
}