'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useVisibility } from '@/context/VisibilityContext';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

export default function ReviewImage() {
  const { isComponentVisible, handleHide, getComponentData } = useVisibility();
  const [currentIndex, setCurrentIndex] = useState(0);

  const isVisible = isComponentVisible('review-img');

  const { images = [], index } = isVisible
    ? getComponentData('review-img')
    : {};

  const totalImages = images?.length;

  useEffect(() => {
    if (isVisible && totalImages > 0 && index !== undefined) {
      setCurrentIndex(index);
    }
  }, [isVisible, index, totalImages]);

  const currentImageUrl = images[currentIndex]?.imgUrl;

  ///////////////////////////

  // <--
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalImages - 1 : prevIndex - 1,
    );
  };

  // -->
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalImages - 1 ? 0 : prevIndex + 1,
    );
  };

  ///////////////////////////

  return (
    isVisible &&
    createPortal(
      <div className='fixed inset-0 z-50 flex items-center justify-center'>
        <div
          onClick={() => handleHide('review-img')}
          className='bg-[#45424B80] inset-0 absolute cursor-pointer'
          aria-label='Close image preview'
          role='button'
        ></div>

        <div className='relative w-[450px] h-[450px] shadow-xl rounded-xl'>
          {currentImageUrl && (
            <Image
              src={currentImageUrl}
              alt='Image preview'
              fill
              className='object-cover block rounded-xl'
              sizes='(max-width: 450px) 100vw, 450px'
            />
          )}

          {totalImages > 1 && (
            <>
              <button
                onClick={handlePrev}
                aria-label='Previous image'
                className='absolute left-[-70px] top-1/2 transform -translate-y-1/2 bg-[#D9D9D9] rounded-full p-1'
              >
                <GoChevronLeft className='text-3xl' />
              </button>

              <button
                onClick={handleNext}
                aria-label='Next image'
                className='absolute right-[-70px] top-1/2 transform -translate-y-1/2 bg-[#D9D9D9] rounded-full p-1'
              >
                <GoChevronRight className='text-3xl' />
              </button>
            </>
          )}
        </div>
      </div>,
      document.body,
    )
  );
}
