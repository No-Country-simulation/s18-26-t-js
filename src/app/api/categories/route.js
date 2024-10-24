import prisma from '@/libs/db';
import { NextResponse } from 'next/server';

// Obtener todas las categorías
export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Error al obtener las categorías.' },
      { status: 500 },
    );
  }
}

// Crear una nueva categoría
export async function POST(request) {
  try {
    const { name } = await request.json();
    const category = await prisma.category.create({
      data: { name },
    });

    return NextResponse.json(category);
  } catch (error) {
    if (error.code === 'P2002')
      // Manejo de conflictos (categoría ya existe)
      return NextResponse.json(
        { error: 'Categoría ya existe.' },
        { status: 409 },
      );
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Error al crear la categoría.' },
      { status: 500 },
    );
  }
}
