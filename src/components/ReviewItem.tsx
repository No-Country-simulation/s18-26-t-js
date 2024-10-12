import React from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

interface Review {
  id: number;
  name: string;
  photo: string;
  comentario: string;
  images: string[];
  calificacion: number;
  createdAt: string;
}

interface ReviewItemProps {
  review: Review;
}

export default function ReviewItem({ review }: ReviewItemProps) {
  const { name, photo, images, calificacion, createdAt, comentario } = review;

  const isPhoto = photo ? `/img/${photo}` : '/img/default-user.jpg';

  return (
    <li className='pt-4 mr-4  pb-4 border-bottom  grid grid-cols-[auto_1fr] gap-4'>
      <div className='rounded-full relative w-16 h-16  mt-5'>
        <Image
          src={isPhoto}
          alt=''
          className='block object-cover rounded-full object-center'
          fill
        />
      </div>

      <div>
        <div className='flex mb-3 gap-2 items-center'>
          <h3 className='text-lg font-medium'>{name}</h3>

          <small className=' text-xs text-[--light-gray]'>
            {format(new Date(createdAt), 'MM/dd/yyyy')}
          </small>

          <small className='flex items-center gap-1 text-base'>
            <FaStar className=' text-[--yellow-color] ' />
            {calificacion}
          </small>
        </div>

        <p className='text-base mb-3 font-normal leading-6'>{comentario}</p>

        {images?.length > 0 && (
          <div className='flex  gap-3  w-[490px] pb-4 scrollBar'>
            {images.map((image, i) => (
              <div key={i} className='relative w-28 h-28  flex-shrink-0'>
                <Image
                  src={`/img/${image}`}
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
