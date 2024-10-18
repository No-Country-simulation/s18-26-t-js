import Reviews from '@/components/Reviews';
import RestaurantInfo from '@/components/RestaurantInfo';
import Rating from '@/components/Rating';

interface PageProps {
  params: {
    restaurantId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { restaurantId } = params;

  const res = await fetch(
    `http://localhost:3000/api/restaurant/${restaurantId}`,
    { cache: 'no-store' },
  );
  const restaurantData = await res.json();

  return (
    <section className=''>
      <div>
        <RestaurantInfo restaurant={restaurantData} />
      </div>

      <div className='shadow-xl px-4 py-4 mx-4 mb-8 lg:mx-auto border-[1px] border-[#a0a0a07a] grid grid-cols-[1fr_2fr] grid-rows-[auto_1fr] max-w-6xl m-auto rounded-xl'>
        <div className='row-[1/2] col-span-full font-semibold text-2xl mb-4'>
          Reseñas
        </div>
        <div className='row-[2/-1] col-span-full md:col-[1/2] mb-8 md:mb-0 mx-auto'>
          <Rating restaurant={restaurantData} />
        </div>

        <div className='md:row-[2/-1] col-span-full md:col-[2/-1]'>
          <Reviews restaurantId={restaurantId} />
        </div>
      </div>
    </section>
  );
}
