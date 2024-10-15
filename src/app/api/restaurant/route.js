import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import validator from 'validator';

const prisma = new PrismaClient();

// Handler GET
export async function GET(req) {
  try {
    // Extract query parameters from the URL
    const { searchParams } = new URL(req.url);
    let name = searchParams.get('name');
    let city = searchParams.get('city');

    // Sanitize inputs
    if (name) name = validator.escape(name);
    if (city) city = validator.escape(city);

    // Create a filter object based on provided parameters
    const filters = {};
    if (name) filters.name = { contains: name, mode: 'insensitive' }; // Case-insensitive search
    if (city) filters.city = { contains: city, mode: 'insensitive' }; // Case-insensitive search

    const restaurants = await prisma.restaurant.findMany({
      where: filters, // Apply filters if any,
      include: {
        reviews: true,
      },
    });
    return NextResponse.json(restaurants, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error al obtener los restaurantes' },
      { status: 500 },
    );
  }
}

// Handler POST
export async function POST(req) {
  try {
    const body = await req.json(); // Parsear el cuerpo de la solicitud
    const {
      name,
      city,
      location,
      phone,
      averageRating,
      imageUrl,
      logoUrl,
      description,
    } = body;

    const newRestaurant = await prisma.restaurant.create({
      data: {
        name,
        city,
        location,
        phone,
        averageRating,
        imageUrl,
        logoUrl,
        description,
      },
    });
    return NextResponse.json(newRestaurant, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error al crear el restaurante' },
      { status: 500 },
    );
  }
}
