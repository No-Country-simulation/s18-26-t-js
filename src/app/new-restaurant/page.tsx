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
    <main className='px-5 sm:px-10 lg:px-20 py-7 grid grid-cols-5 gap-6 bg-[#FBFBF4]'>
      <section className='flex flex-col gap-6 col-span-full md:col-span-3'>
        <h1 className='text-3xl text-[#FB6800]'>Agregar restaurante</h1>
        <div>
          <NewRestaurantForm userId={session.user.id} />
        </div>
      </section>
      <aside className=' justify-end items-start gap-4 col-span-2 hidden md:flex'>
        <picture className='w-1/3 relative aspect-square mt-[25%]'>
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
