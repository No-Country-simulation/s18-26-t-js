import prisma from '@/libs/db';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = params;
  try {
    const city = await prisma.city.findUnique({
      where: { id: Number(id) },
    });

    if (!city) {
      return NextResponse.json(
        { error: 'Ciudad no encontrada.' },
        { status: 404 },
      );
    }

    return NextResponse.json(city);
  } catch (error) {
    console.error('Error fetching city:', error);
    return NextResponse.json(
      { error: 'Error al obtener la ciudad.' },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  try {
    const { name } = await request.json();

    const foundCity = await prisma.city.findUnique({
      where: { id: Number(id) },
    });

    if (!foundCity) {
      return NextResponse.json(
        { error: 'Ciudad no encontrada.' },
        { status: 404 },
      );
    }

    if (!name)
      return NextResponse.json(
        { error: 'Campo name es requerido.' },
        { status: 500 },
      );

    const city = await prisma.city.update({
      where: { id: Number(id) },
      data: { name },
    });

    return NextResponse.json(city);
  } catch (error) {
    console.error('Error updating city:', error);
    return NextResponse.json(
      { error: 'Error al actualizar la ciudad.' },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    const city = await prisma.city.findUnique({
      where: { id: Number(id) },
    });

    if (!city) {
      return NextResponse.json(
        { error: 'Ciudad no encontrada.' },
        { status: 404 },
      );
    }

    await prisma.city.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: 'Ciudad eliminada con éxito.' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error deleting city:', error);
    return NextResponse.json(
      { error: 'Error al eliminar la ciudad.' },
      { status: 500 },
    );
  }
}
