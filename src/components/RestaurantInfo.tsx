import Image from 'next/image';
import Estrella from './iconos/Estrella';
import { Restaurant } from '@/types/restaurant';

interface Props {
  restaurant: Restaurant;
}

const RestaurantInfo = ({ restaurant }: Props) => {
  return (
    <section>
      <div className='relative w-full min-h-64 max-h-52'>
        <Image
          fill
          className='object-cover'
          alt={restaurant.name}
          src={restaurant.imageUrl}
        />
      </div>
      <div className='max-w-6xl mx-auto mb-8 pt-8'>
        <div className='flex gap-8 items-center mb-2'>
          <h2 className='font-semibold text-2xl'>
            {restaurant.name} - {restaurant.location}
          </h2>
          <p className='flex gap-1 text-xl items-center'>
            <Estrella color='#F5D03A' />
            <span className='text-gray-color'>{restaurant.averageRating}</span>
          </p>
        </div>
        <p className='text-lg text-gray-color mb-4'>
          Teléfono: {restaurant.phone}
        </p>
        <p className='text-lg'>{restaurant.description}</p>
      </div>
    </section>
  );
};

export default RestaurantInfo;
