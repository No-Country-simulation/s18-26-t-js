import { Restaurant } from '@/types/restaurant';
import Estrella from './iconos/Estrella';

interface Props {
  restaurant: Restaurant;
}

const Rating = ({ restaurant }: Props) => {
  const calificacionesRestaurantes = {
    reseñas: '115',
    tipos_de_reseñas: {
      excelente: 85,
      muy_bueno: 15,
      bueno: 10,
      regular: 4,
      malo: 1,
    },
  };

  const amountByRating = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  restaurant.reviews.forEach((review) => amountByRating[review.rating]++);

  return (
    <div className='p-2'>
      <div className='flex pb-5 gap-16'>
        <div className='flex gap-2'>
          <span>
            <Estrella color='#F5D03A' />
          </span>
          <p>{restaurant.averageRating}</p>
        </div>
        <p>({restaurant.reviews.length} reseñas)</p>
      </div>
      <div className='flex gap-3'>
        <div className='flex gap-1 flex-col justify-between'>
          <p>Excelente</p>
          <p>Muy bueno</p>
          <p>Bueno</p>
          <p>Regular</p>
          <p>Malo</p>
        </div>
        <div className='flex gap-2 flex-col justify-between'>
          <div className='flex gap-2'>
            <Estrella color='#F5D03A' />
            <Estrella color='#F5D03A' />
            <Estrella color='#F5D03A' />
            <Estrella color='#F5D03A' />
            <Estrella color='#F5D03A' />
          </div>
          <div className='flex gap-2'>
            <Estrella color='#F5D03A' />
            <Estrella color='#F5D03A' />
            <Estrella color='#F5D03A' />
            <Estrella color='#F5D03A' />
            <Estrella />
          </div>
          <div className='flex gap-2'>
            <Estrella color='#F5D03A' />
            <Estrella color='#F5D03A' />
            <Estrella color='#F5D03A' />
            <Estrella />
            <Estrella />
          </div>
          <div className='flex gap-2'>
            <Estrella color='#F5D03A' />
            <Estrella color='#F5D03A' />
            <Estrella />
            <Estrella />
            <Estrella />
          </div>
          <div className='flex gap-2'>
            <Estrella color='#F5D03A' />
            <Estrella />
            <Estrella />
            <Estrella />
            <Estrella />
          </div>
        </div>
        <div className='flex gap-2 flex-col text-right'>
          <p>{amountByRating[5]}</p>
          <p>{amountByRating[4]}</p>
          <p>{amountByRating[3]}</p>
          <p>{amountByRating[2]}</p>
          <p>{amountByRating[1]}</p>
        </div>
      </div>
    </div>
  );
};

export default Rating;
