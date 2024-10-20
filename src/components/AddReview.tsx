'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Star from './Star';
import { useForm } from 'react-hook-form';
import { LuImagePlus } from 'react-icons/lu';
import { useOpenModal } from '@/context/ModalContext';
import toast from 'react-hot-toast';

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
  const [images, setImages] = useState<FileList | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const { handleCloseModal } = useOpenModal();

  const { register, handleSubmit, reset } = useForm<FormData>();

  /////////////////////////

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    if (!userRating) {
      setIsLoading(false);
      setIsError(true);

      return;
    }

    const formData = new FormData()
    if (images) {
      Array.from(images).forEach( image => 
        formData.append('image', image))
    }

    formData.append('comment', data.comment);
    formData.append('rating', userRating.toString());
    formData.append('restaurantId', restaurantId);
    formData.append('userId', userId);

    await axios
      .post('/api/reviews', formData)
      .then(() => {
        toast.success('¡Tu reseña se subio con éxito!');
        router.refresh();
      })
      .catch(() =>
        toast.error(
          'Ups... Hubo un error \nNo se pudo subir tu reseña, intentalo nuevamente.',
        ),
      )
      .finally(() => {
        reset();
        setIsLoading(false);
        setIsError(false);
        handleCloseModal();
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
        <div className='flex items-center relative w-[80%] min-h-28 justify-center flex-col rounded-md border-[#a0a0a07a] border-[1px]'>
          <div className='flex gap-2 flex-wrap m-3 justify-center items-center'>
            {
              imagePreviews.length > 0 && (
                imagePreviews.map((preview, index) =>
                  <img key={index} src={preview} className='max-h-28 w-auto h-auto object-cover ' />
                )
              )
            }
            <div className='h-28 border-4 border-[#929292] border-dashed flex justify-center items-center flex-col p-3'>
              <LuImagePlus className='text-2xl' />
              <span className='text-base'>Haz click para agregar fotos.</span>
            </div>
          </div>
          <input type="file" 
              className='absolute border-4 opacity-0 w-full h-full z-10 cursor-pointer'
              multiple onChange={(e) => {
                const files = e.target.files

                if (!files) return
                const previews = Array.from(files).map(file => URL.createObjectURL(file));
                setImagePreviews(previews)

                setImages(files)
              }} />
        </div>
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
