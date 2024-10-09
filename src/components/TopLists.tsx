'use client';

import React, { useState, useEffect } from 'react';
import restaurantsList from '../../public/restaurantsMockup.json';
import Carousel from './Carousel';
import { MdOutlineStarPurple500 } from 'react-icons/md';

const TopLists = () => {
  const [itemsToShowRated, setItemsToShowRated] = useState(9);
  const [itemsToShowReviewed, setItemsToShowReviewed] = useState(3);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      if (!isMounted) return;
      if (window.innerWidth < 800) {
        setItemsToShowRated(3);
        setItemsToShowReviewed(1);
      } else if (window.innerWidth < 1200) {
        setItemsToShowRated(6);
        setItemsToShowReviewed(2);
      } else {
        setItemsToShowRated(9);
        setItemsToShowReviewed(3);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isMounted]);

  const topRated = restaurantsList.filter((r) => r.averageRating > 4.3);
  const mostReviewed = restaurantsList.filter((r) => r.reviews.length > 0);

  const mostReviewedList = mostReviewed.map((item) => (
    <div className='' key={item.id}>
      <img
        className='block w-full h-24 object-cover'
        src={item.image}
        alt={item.name}
      />
      <div className='flex justify-between px-2 my-2'>
        <h4 className='text-gray-color text-lg font-semibold'>{item.name}</h4>
        <div className='flex items-center gap-1'>
          <MdOutlineStarPurple500 className='text-[#F5D03A]' size={20} />
          <span className='text-lg font-semibold text-light-gray'>
            {item.averageRating}
          </span>
        </div>
      </div>
      <p className='px-2 pb-2 text-lg font-semibold text-gray-color'>
        {item.location}
      </p>
    </div>
  ));

  return (
    <section className='w-max m-auto flex flex-col gap-10'>
      <Carousel
        title='Nuestros usuarios recomiendan'
        itemsToShow={itemsToShowRated}
        objectList={topRated}
        itemWidth={120}
      />
      <Carousel
        title='Lugares más reseñados'
        itemsToShow={itemsToShowReviewed}
        elementList={mostReviewedList}
        itemWidth={376}
      />
    </section>
  );
};

export default TopLists;
