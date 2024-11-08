import { NextResponse } from 'next/server';
import prisma from '@/libs/db';
import { uploadSingleImage } from '@/libs/uploadSingleImage';


// POST .../api/users/[id]/update

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  // Extraer la imagen y los demás campos
  const formData = await request.formData();
   console.log(formData)
  const name = formData.get('name')?.toString();
  const lastName = formData.get('lastName')?.toString();

  const country = formData.get('country')?.toString();
  const avatarImage = formData.get('avatarUrl') as File | null;
  const birthDate = formData.get('birthDate') ? new Date(formData.get('birthDate')!.toString()) : undefined;
  const bio = formData.get('bio')?.toString();
  console.log(country, "soy country")
  try {
    let avatarUrl: string | undefined;

    // Si el usuario envía una nueva imagen, súbela a Cloudinary
    if (avatarImage) {
      avatarUrl = await uploadSingleImage(avatarImage);
    }

    // Actualizar los datos del usuario en la base de datos
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name,
        lastName,
        country,
        avatarUrl: avatarUrl || undefined, // Guardar la nueva URL si existe
        birthDate,
        bio,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error actualizando el usuario:', error);
    return NextResponse.json({ error: 'User update failed' }, { status: 500 });
  }
}
