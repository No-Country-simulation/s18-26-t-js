import prisma from '@/libs/db';
import { NextResponse } from 'next/server';

// Obtener categoría por ID
export async function GET(request, { params }) {
  const { id } = params;
  try {
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Categoría no encontrada.' },
        { status: 404 },
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { error: 'Error al obtener la categoría.' },
      { status: 500 },
    );
  }
}

// Actualizar categoría
export async function PUT(request, { params }) {
  const { id } = params;
  try {
    const { name } = await request.json();

    const foundCategory = await prisma.category.findUnique({
      where: { id: Number(id) },
    });

    if (!foundCategory) {
      return NextResponse.json(
        { error: 'Categoría no encontrada.' },
        { status: 404 },
      );
    }

    if (!name)
      return NextResponse.json(
        { error: 'Campo name es requerido.' },
        { status: 400 },
      );

    const category = await prisma.category.update({
      where: { id: Number(id) },
      data: { name },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: 'Error al actualizar la categoría.' },
      { status: 500 },
    );
  }
}

// Eliminar categoría
export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Categoría no encontrada.' },
        { status: 404 },
      );
    }

    await prisma.category.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: 'Categoría eliminada con éxito.' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'Error al eliminar la categoría.' },
      { status: 500 },
    );
  }
}
