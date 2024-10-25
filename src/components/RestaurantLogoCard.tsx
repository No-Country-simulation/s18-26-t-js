'use client';
import { Restaurant } from '@/types/restaurant';
import { useRouter } from 'next/navigation';
import React from 'react';

const RestaurantLogoCard = ({ item }: { item: Restaurant }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/restaurant/${item.id}`)}
      className='relative w-full h-full'
      key={item.id}
    >
      <div className='p-1 bg-black/50 text-white-color absolute inset-0 w-full flex justify-center opacity-0 hover:opacity-100 transition-opacity duration-500 overflow-auto'>
        <h3 className='font-semibold text-lg text-center'>{item.name}</h3>
      </div>
      <img
        src={item.logoUrl || '/img/restaurant-logo-default.jpg'}
        alt={item.name}
        className='w-full h-full object-cover'
      />
    </div>
  );
};

export default RestaurantLogoCard;
