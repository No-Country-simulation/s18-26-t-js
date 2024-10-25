import prisma from '@/libs/db';
import { uploadSingleImage } from '@/libs/uploadSingleImage';
// import uploadImages from '@/helpers/uploadImages';

// GET .../api/restaurant

export async function GET() {
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: {
        category: {
          include: {
            category: true, 
          },
        },
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
    
    //En Caso el Frontend necesita el obj con ID y Name
    // Mapear los restaurantes para incluir solo los id y nombres de las categorías
    // const formattedRestaurants = restaurants.map((restaurant) => ({
    //   ...restaurant,
    //   category: restaurant.category.map((rc) => ({
    //     id: rc.category.id,      
    //     name: rc.category.name,   
    //   })),
    // }));

    // Mapear los restaurantes para incluir solo los nombres de las categorías
    const formattedRestaurants = restaurants.map((restaurant) => ({
      ...restaurant,
      category: restaurant.category.map((rc) => rc.category.name), 
    }));

    return new Response(JSON.stringify(formattedRestaurants), { status: 200 });
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
  const categories = data.getAll('category[]');
  const description = data.get('description');
  const address = data.get('address');
  const phone = data.get('phone');
  const image = data.get('imageUrl'); // Imagen del restaurante
  const logo = data.get('logoUrl'); // Logo del restaurante

  console.log('valor category', categories);

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
        phone,
        category: {
          create: categories.map((id) => ({
            category: {
              connect: { id: +id }, // Conectas cada categoría usando el ID
            },
          })),
        },
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
