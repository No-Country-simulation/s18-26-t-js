import prisma from '@/libs/db';
import { uploadSingleImage } from '@/libs/uploadSingleImage';
// import uploadImages from '@/helpers/uploadImages';


// GET .../api/restaurant

export async function GET() {
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: {
        category: true, // Incluir categorías si es necesario
        city: true, // Incluir información de la ciudad
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

    return new Response(JSON.stringify(restaurants), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Error fetching restaurants' }),
      { status: 500 },
    );
  }
}

// POST .../api/restaurant

export async function POST(req) {
  const data = await req.formData();

  const name = data.get('name');
  const cityId = +data.get('cityId');
  const userId = +data.get('userId');
  const description = data.get('description');
  const address = data.get('address');
  const image = data.get('imageUrl'); // Imagen del restaurante
  const logo = data.get('logoUrl'); // Logo del restaurante

  try {
    let imageUrl = null;
    let logoUrl = null;

    // Subir imagen del restaurante a Cloudinary si existe
    if (image) {
      imageUrl = await uploadSingleImage(image);
    } else {
      console.log('No se proporcionó una imagen para el restaurante.');
    }

    // Subir logo a Cloudinary si existe
    if (logo) {
      logoUrl = await uploadSingleImage(logo);
    } else {
      console.log('No se proporcionó una imagen para el logo del restaurante.');
    }
    const newRestaurant = await prisma.restaurant.create({
      data: {
        name,
        cityId,
        userId,
        description,
        imageUrl,
        logoUrl,
        address,
      },
    });

    return new Response(JSON.stringify(newRestaurant), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Error creating restaurant' }),
      { status: 500 },
    );
  }
}
