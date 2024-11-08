'use client';

import React from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { useVisibility } from '@/context/VisibilityContext';

interface Review {
  id: number;
  comment: string;
  images: {
    id: number;
    imgUrl: string;
  };
  rating: number;
  createdAt: string;
  user: {
    id: number;
    username: string;
  };
}

interface ReviewItemProps {
  review: Review;
}

export default function ReviewItem({ review }: ReviewItemProps) {
  const { handleShow, handleData } = useVisibility();

  const { images, comment, rating, createdAt } = review;
  const { username } = review?.user;

  // const isPhoto = photo ? `/img/${photo}` : '/img/default-user.jpg';
  const isImage = Array.isArray(images) && images.length > 0;

  return (
    <li className='pt-4 mr-4  pb-4 border-bottom  grid grid-cols-[auto_1fr] gap-4'>
      <div className='rounded-full relative w-16 h-16  mt-5'>
        <Image
          src={'/img/default-user.jpg'}
          alt=''
          className='block object-cover rounded-full object-center'
          fill
        />
      </div>

      <div>
        <div className='flex mb-3 gap-2 items-center'>
          <h3 className='text-lg font-medium'>{username}</h3>

          <small className=' text-xs text-[--light-gray]'>
            {format(new Date(createdAt), 'MM/dd/yyyy')}
          </small>

          <small className='flex items-center gap-1 text-base'>
            <FaStar className=' text-[--yellow-color] ' />
            {rating.toFixed(1)}
          </small>
        </div>

        <p className='text-base mb-3 font-normal leading-6'>{comment}</p>

        {isImage && (
          <div className='flex  gap-3  w-[490px] pb-4 scrollBar'>
            {images.map(({ id, imgUrl }, index) => (
              <div
                key={id}
                className='relative w-28 h-28  flex-shrink-0'
                role='button'
                onClick={() => {
                  handleShow('review-img');
                  handleData('review-img', {
                    images,
                    index,
                  });
                }}
              >
                <Image
                  src={`${imgUrl}`}
                  alt=''
                  fill
                  className=' object-cover block object-center rounded-lg'
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}
