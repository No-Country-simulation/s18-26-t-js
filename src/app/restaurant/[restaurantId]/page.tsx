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
  );
  const restaurantData = await res.json();

  return (
    <section className=''>
      <div>
        <RestaurantInfo restaurant={restaurantData} />
      </div>

      <div className='shadow-xl px-4 py-4  border-[1px] border-[#a0a0a07a] grid grid-cols-[1fr_2fr] grid-rows-[auto_1fr] max-w-6xl m-auto rounded-xl'>
        <div className='row-[1/2] col-span-full font-semibold text-2xl mb-4'>
          Reseñas
        </div>
        <div className='row-[2/-1] col-[1/2]'>
          <Rating />
        </div>

        <div className='row-[2/-1] col-[2/-1]'>
          <Reviews restaurantId={restaurantId} />
        </div>
      </div>
    </section>
  );
}
