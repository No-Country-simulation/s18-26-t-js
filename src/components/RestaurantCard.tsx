'use client';
import { Restaurant } from '@/types/restaurant';
import { useRouter } from 'next/navigation';
import { MdOutlineStarPurple500 } from 'react-icons/md';

const RestaurantCard = ({ item }: { item: Restaurant }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/restaurant/${item.id}`)}
      className='cursor-pointer'
      key={item.id}
    >
      <img
        className='block w-full h-24 object-cover'
        src={item.imageUrl || '/img/restaurant-default.png'}
        alt={item.name}
      />
      <div className='flex justify-between px-2 my-2'>
        <h4 className='text-gray-color text-lg font-semibold'>{item.name}</h4>
        <div className='flex items-center gap-1'>
          <MdOutlineStarPurple500 className='text-[#F5D03A]' size={20} />
          <span className='text-lg font-semibold text-light-gray'>
            {item.averageRating.toFixed(1)}
          </span>
        </div>
      </div>
      <p className='px-2 pb-2 text-lg font-semibold text-gray-color'>
        {item.city.name}
      </p>
    </div>
  );
};

export default RestaurantCard;
