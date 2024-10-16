'use client';
import { Restaurant } from '@/types/restaurant';
import { useRouter } from 'next/navigation';
import React from 'react';

const RestaurantLogoCard = ({ item }: { item: Restaurant }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/restaurant/${item.id}`)}
      className='w-full h-full'
      key={item.id}
    >
      <img
        src={item.logoUrl}
        alt={item.name}
        className='w-full h-full object-cover'
      />
    </div>
  );
};

export default RestaurantLogoCard;
