import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Handler GET (obtener un restaurante por ID)
export async function GET(req, { params }) {
  const { id } = params;

  try {
    const restaurante = await prisma.restaurante.findUnique({
      where: { id: parseInt(id) },
      include: {
        reviews: true,
      },
    });

    if (!restaurante) {
      return NextResponse.json({ error: 'Restaurante no encontrado' }, { status: 404 });
    }

    return NextResponse.json(restaurante, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al obtener el restaurante' }, { status: 500 });
  }
}
// Handler  PUT (actualizar un restaurante por ID)
export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();
  const { name, ubicacion, telefono } = body;

  try {
    const restauranteActualizado = await prisma.restaurante.update({
      where: { id: parseInt(id) },
      data: { name, ubicacion, telefono },
    });

    return NextResponse.json(restauranteActualizado, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al actualizar el restaurante' }, { status: 500 });
  }
}
// Handler DELETE (eliminar un restaurante por ID)
export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await prisma.restaurante.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al eliminar el restaurante' }, { status: 500 });
  }
}
