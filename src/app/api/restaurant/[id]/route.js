import prisma from '@/libs/db';
import { uploadSingleImage } from '@/libs/uploadSingleImage';

// GET .../api/restaurant/[id]

export async function GET(req, { params }) {
  const { id } = params; // Obtenemos el ID de los parámetros de la solicitud

  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        category: {
          include: {
            category: true, // Incluir información de la categoría
          },
        },
        city: true, // Incluir  la ciudad
        reviews: {
          select: {
            id: true,
            comment: true,
            rating: true,
            user: {
              select: {
                id: true,
                username: true,
              },
            },
            images: {
              select: {
                id: true,
                imgUrl: true,
              },
            },
            createdAt: true,
          },
        },
      },
    });

    if (!restaurant) {
      return new Response(JSON.stringify({ error: 'Restaurant not found' }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({
        ...restaurant,
        category: restaurant.category.map((rc) => rc.category.name), // Cambiar la estructura de categorías
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Error fetching restaurant' }),
      { status: 500 },
    );
  }
}

// PUT .../api/restaurant/[id]

export async function PUT(req, { params }) {
  const { id } = params;
  const data = await req.formData();

  const name = data.get('name');
  const cityId = data.get('cityId') ? +data.get('cityId') : null; // Opcional
  const description = data.get('description');
  const address = data.get('address');
  const image = data.get('imageUrl');
  const logo = data.get('logoUrl');

  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: Number(id) },
    });

    if (!restaurant) {
      return new Response(JSON.stringify({ error: 'Restaurant not found' }), {
        status: 404,
      });
    }

    let imageUrl = restaurant.imageUrl; // Mantener la imagen anterior por defecto
    let logoUrl = restaurant.logoUrl; // Mantener el logo anterior por defecto

    // Subir nueva imagen si existe
    if (image) {
      imageUrl = await uploadSingleImage(image);
    }

    // Subir nuevo logo si existe
    if (logo) {
      logoUrl = await uploadSingleImage(logo);
    }

    // Crear el objeto `data` dinámicamente, solo con los campos que se envían
    const updateData = {
      ...(name && { name }), // Solo incluir si `name` no es nulo
      ...(description && { description }),
      ...(address && { address }),
      ...(cityId && { city: { connect: { id: cityId } } }), // Actualizar relación de ciudad si se proporciona
      imageUrl,
      logoUrl,
    };

    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return new Response(JSON.stringify(updatedRestaurant), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Error updating restaurant' }),
      { status: 500 },
    );
  }
}

// DELETE .../api/restaurant/[id]

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: Number(id) },
    });

    if (!restaurant) {
      return new Response(JSON.stringify({ error: 'Restaurant not found' }), {
        status: 404,
      });
    }

    await prisma.restaurant.delete({
      where: { id: Number(id) },
    });

    return new Response(
      JSON.stringify({ message: 'Restaurant deleted successfully' }),
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Error deleting restaurant' }),
      { status: 500 },
    );
  }
}
