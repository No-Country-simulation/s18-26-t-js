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
          src={restaurant.imageUrl || '/img/restaurant-default.png'}
        />
      </div>
      <div className='max-w-6xl mx-auto mb-8 pt-8 px-4'>
        <div className='flex gap-8 items-center mb-2'>
          <h2 className='font-semibold text-2xl'>
            {restaurant.name} - {restaurant.city}
          </h2>
          <p className='flex gap-1 text-xl items-center'>
            <Estrella color='#F5D03A' />
            <span className='text-gray-color'>
              {restaurant.averageRating.toFixed(1)}
            </span>
          </p>
        </div>
        <div className='flex gap-4 mb-2 flex-wrap'>
          <p className='text-lg text-gray-color'>
            Dirección:
            <span className='ml-2 font-semibold'>
              {restaurant.address || 'No disponble'}
            </span>
          </p>
          <p className='text-lg text-gray-color'>
            Teléfono:
            <span className='ml-2 font-semibold'>
              {restaurant.phone || 'No disponble'}
            </span>
          </p>
          <p className='text-lg text-gray-color'>
            Horario de Atención:
            <span className='ml-2 font-semibold'>
              {restaurant.openingHours || 'No disponble'}
            </span>
          </p>
        </div>
        <p className='text-lg text-gray-color mb-4'>
          Categoría / Cocina:
          <span className='ml-2 font-semibold'>
            {restaurant.category.join(', ')}
          </span>
        </p>
        <p className='text-lg'>{restaurant.description}</p>
      </div>
    </section>
  );
};

export default RestaurantInfo;
