'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Star from './Star';
import { useForm } from 'react-hook-form';
import { LuImagePlus } from 'react-icons/lu';

interface AddReviewProps {
  userId: string;
  restaurantId: string;
}

interface FormData {
  comment: string;
}

export default function AddReview({ userId, restaurantId }: AddReviewProps) {
  const router = useRouter();
  const [userRating, setUserRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { register, handleSubmit, reset } = useForm<FormData>();

  /////////////////////////

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    if (!userRating) {
      setIsLoading(false);
      setIsError(true);

      return;
    }

    const newReview = {
      ...data,
      rating: userRating,
      images: '',
      userId,
      restaurantId,
    };

    await axios
      .post('/api/reviews', newReview)
      .then(() => {
        console.log('La reseña se agregó exitosamente 🎉');
        router.refresh();
      })
      .catch(() => console.log('¡Algo salió mal!'))
      .finally(() => {
        reset();
        setIsLoading(false);
        setIsError(false);
      });
  }

  /////////////////////////

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col  h-full '>
      <div className='flex-grow flex flex-col gap-4  '>
        <p className='text-lg'>¿Cómo calificarías tu experiencia?</p>

        <div className='flex gap-2 items-center'>
          <div className='flex gap-2'>
            <Star
              size={27}
              onSetRating={setUserRating}
              currentRating={userRating}
            />
          </div>

          {isError && (
            <p className='text-xs font-medium text-[#FB6800]'>
              Este campo es obligatorio
            </p>
          )}
        </div>

        <p className='text-lg'>Escribe tu opinión sobre este lugar.</p>
        <textarea
          id='comment'
          className=' px-2 py-2 w-[80%] h-28 block font-[inherit] rounded-md border-[#a0a0a07a] border-[1px] outline-1 outline-[#FB6800]'
          disabled={isLoading}
          {...register('comment', {
            required: 'Este campo es obligatorio',
          })}
        ></textarea>

        <p className='text-lg'>Agrega algunas fotos.</p>
        <button
          type='button'
          className='w-[80%] h-28 flex justify-center items-center flex-col rounded-md border-[#a0a0a07a] border-[1px]'
        >
          <LuImagePlus className='text-2xl' />
          <span className='text-base'>Haz click para agregar fotos.</span>
        </button>
      </div>

      <div className=' ml-auto flex gap-3 pr-9 '>
        <button
          type='submit'
          disabled={isLoading}
          className='bg-[#FB6800] basis-[35%] font-medium  text-white-color px-8 py-1 rounded-md'
        >
          {isLoading ? 'Loading...' : 'Publicar'}
        </button>

        <button
          type='button'
          onClick={() => {
            reset();
            setUserRating(0);
          }}
          className='bg-[--gray-color] basis-[35%] font-medium  text-white-color px-8 py-1 rounded-md'
        >
          Eliminar
        </button>
      </div>
    </form>
  );
}
