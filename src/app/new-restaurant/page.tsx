import NewRestaurantForm from '@/components/NewRestaurantForm';
import { getSession } from '@/libs/actions';
import Image from 'next/image';
import { redirect } from 'next/navigation';
export default async function Page() {
  const session = await getSession();
  if (!session) {
    redirect('/auth/login');
  }
  return (
    <main className='px-20 py-7 grid grid-cols-2 gap-6 bg-[#FBFBF4]'>
      <section className='flex flex-col gap-6'>
        <h1 className='text-3xl text-[#FB6800]'>Agregar restaurante</h1>
        <div>
          <NewRestaurantForm userId={session.user.id} />
        </div>
      </section>
      <aside className='flex justify-end items-start gap-4'>
        <picture className='w-1/3 relative aspect-square mt-24'>
          <Image
            src={'/img/new-restaurant-2.png'}
            alt=''
            fill
            className='object-contain'
          />
        </picture>
        <picture className='w-1/3 relative aspect-square'>
          <Image
            src={'/img/new-restaurant-1.png'}
            alt=''
            fill
            className='object-contain'
          />
        </picture>
      </aside>
    </main>
  );
}
