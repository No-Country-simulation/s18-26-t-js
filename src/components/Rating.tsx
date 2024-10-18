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

  const reviews = restaurant.reviews;

  console.log('list', reviews);

  return (
    <div className='p-2'>
      <div className='flex pb-5 gap-16'>
        <div className='flex gap-2'>
          <span>
            <Estrella color='#F5D03A' />
          </span>
          <p>{restaurant.averageRating}</p>
        </div>
        <p>({calificacionesRestaurantes.reseñas} reseñas)</p>
      </div>
      <div className='flex gap-3'>
        <div className='flex gap-1 flex-col'>
          <p>Excelente</p>
          <p>Muy bueno</p>
          <p>Bueno</p>
          <p>Regular</p>
          <p>Malo</p>
        </div>
        <div className='flex gap-2 flex-col'>
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
        <div className='flex gap-2 flex-col'>
          <p>{calificacionesRestaurantes.tipos_de_reseñas.excelente}</p>
          <p>{calificacionesRestaurantes.tipos_de_reseñas.muy_bueno}</p>
          <p>{calificacionesRestaurantes.tipos_de_reseñas.bueno}</p>
          <p>{calificacionesRestaurantes.tipos_de_reseñas.regular}</p>
          <p>{calificacionesRestaurantes.tipos_de_reseñas.malo}</p>
        </div>
      </div>
    </div>
  );
};

export default Rating;
