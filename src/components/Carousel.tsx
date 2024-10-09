'use client';
import { Restaurant } from '@/types/restaurant';
import React, { useState, useRef, useEffect, ReactElement } from 'react';
import { MdArrowForwardIos, MdOutlineArrowBackIosNew } from 'react-icons/md';

interface Props {
  itemsToShow: number;
  objectList?: Restaurant[];
  elementList?: ReactElement[];
  itemWidth: number;
  title: string;
}

const Carousel = ({
  itemsToShow,
  objectList,
  elementList,
  itemWidth,
  title,
}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const gapWidth = 8;
  const totalItems = objectList?.length || elementList?.length || 1;
  const lastIndexToShow = totalItems - itemsToShow;

  const adjustIndex = (index: number) => {
    if (index < 0) return totalItems - itemsToShow;
    if (index > lastIndexToShow) return 0;
    return index;
  };
  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const totalWidth = itemWidth + gapWidth;
      carouselRef.current.scrollTo({
        left: totalWidth * index,
        behavior: 'smooth',
      });
    }
  };

  const next = () => {
    setCurrentIndex((prev) => adjustIndex(prev + 1));
  };

  const prev = () => {
    setCurrentIndex((prev) => adjustIndex(prev - 1));
  };

  useEffect(() => {
    scrollToIndex(currentIndex);
  }, [currentIndex]);

  return (
    <div className='relative w-max overflow-hidden'>
      <div className='flex justify-between items-center px-2 mb-2'>
        <h3 className='font-semibold text-xl'>{title}</h3>
        <div className='flex gap-2 '>
          <button
            onClick={prev}
            className='p-2 flex items-center justify-center bg-gray-200  rounded-full hover:bg-gray-400 transition-colors'
          >
            <MdOutlineArrowBackIosNew size={18} />
          </button>
          <button
            onClick={next}
            className='p-2 flex items-center justify-center bg-gray-200  rounded-full hover:bg-gray-400 transition-colors'
          >
            <MdArrowForwardIos size={18} />
          </button>
        </div>
      </div>
      <div
        ref={carouselRef}
        className='flex overflow-x-hidden scroll-smooth gap-2 px-2 py-1'
        style={{
          width: `${itemsToShow * (itemWidth + gapWidth) + gapWidth}px`,
        }}
      >
        {objectList && objectList.length > 0
          ? objectList.map((item) => (
              <div
                key={item.id}
                className={`flex-shrink-0 rounded-md overflow-hidden cursor-pointer`}
                style={{ width: itemWidth }}
              >
                <img
                  src={item.logo || ''}
                  alt={item.name}
                  className='w-full h-full object-cover'
                />
              </div>
            ))
          : null}

        {elementList && elementList.length > 0
          ? elementList.map((element) => (
              <div
                key={element.key}
                className={`flex-shrink-0 rounded-md overflow-hidden cursor-pointer shadow-md border border-gray-200`}
                style={{ width: itemWidth }}
              >
                {element}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Carousel;
