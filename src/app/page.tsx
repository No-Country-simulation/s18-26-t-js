// Rescrito para el deploy
import TopLists from '@/components/TopLists';
import { Restaurant } from '@/types/restaurant';

export default async function Home() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/restaurant`, { cache: "no-store" });
  const restaurants: Restaurant[] = await res.json();

  return (
    <main className='py-14'>
      <section className='bg-yellow-color min-h-[300px] w-[90%] mx-auto mb-12 px-8 flex items-center'>
        <h1 className='text-4xl sm:text-4xl md:text-5xl max-w-[700px] font-montserratBlack text-white-color'>
          Del restaurante a tu mesa, con reseñas confiables.
        </h1>
      </section>
      <TopLists restaurants={restaurants} />
    </main>
  );
}
