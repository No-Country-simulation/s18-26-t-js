import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Handler GET
export async function GET() {
  try {
    const restaurantes = await prisma.restaurante.findMany({
      include: {
        reviews: true
      }
    });
    return NextResponse.json(restaurantes, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al obtener los restaurantes' }, { status: 500 });
  }
}

// Handler POST
export async function POST(req) {
  try {
    const body = await req.json(); // Parsear el cuerpo de la solicitud
    const { name, ubicacion, telefono } = body;

    const nuevoRestaurante = await prisma.restaurante.create({
      data: {
        name,
        ubicacion,
        telefono,
      },
    });
    return NextResponse.json(nuevoRestaurante, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al crear el restaurante' }, { status: 500 });
  }
}