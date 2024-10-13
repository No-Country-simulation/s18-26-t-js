import { Suspense } from 'react';
//import { getRestaurantById } from '@/libs/actions';
import ReviewItem from './ReviewItem';

interface ReviewsProps {
  restaurantId: string;
}

const fakeReviews = [
  {
    id: 1,
    name: 'María Gutierrez',
    photo: 'user.png',
    comentario:
      '¡Simplemente la mejor hamburguesa que he probado! La Big Pons Deluxe es una explosión de sabor: carne jugosa, queso derretido y esa salsa especial que la hace única. El ambiente es muy acogedor y el servicio fue excelente. ¡Volveré sin duda!',
    images: ['burger-1.png', 'burger-2.png', 'burger-3.png', 'burger-4.png'],
    calificacion: 5,
    createdAt: '2024-10-10T23:48:20.317Z',
  },

  {
    id: 2,
    name: 'Eugenia Moral',
    photo: 'user-2.png',
    comentario:
      'Las hamburguesas son riquísimas y tienen porciones generosas. Probé la BBQ Pons y me encantó, aunque me gustaría que tuvieran más opciones vegetarianas. El lugar siempre está lleno, así que es recomendable ir temprano. ¡Recomendado para los amantes de las hamburguesas!',
    images: [],
    calificacion: 4,
    createdAt: '2024-10-10T23:48:20.317Z',
  },

  {
    id: 3,
    name: 'Eugenia Moral',
    photo: 'user-2.png',
    comentario:
      'Las hamburguesas son riquísimas y tienen porciones generosas. Probé la BBQ Pons y me encantó, aunque me gustaría que tuvieran más opciones vegetarianas. El lugar siempre está lleno, así que es recomendable ir temprano. ¡Recomendado para los amantes de las hamburguesas!',
    images: [],
    calificacion: 4,
    createdAt: '2024-10-10T23:48:20.317Z',
  },

  {
    id: 4,
    name: 'Eleonor',
    photo: '',
    comentario:
      'La hamburguesa BBQ Pons es una verdadera delicia, con su jugosa carne y un sabor ahumado que resalta en cada bocado. Viene acompañada de ingredientes frescos y una salsa BBQ que le da un toque irresistible.',
    images: [],
    calificacion: 3,
    createdAt: '2024-10-10T23:48:20.317Z',
  },
];

export default async function ReviewsList({ restaurantId }: ReviewsProps) {
  // const { reviews } = await getRestaurantById(+restaurantId);
  //console.log(reviews);

  return (
    <ul className='scrollBar flex flex-col gap-4  h-[850px]'>
      <Suspense fallback={<p>loading...</p>}>
        {fakeReviews?.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </Suspense>
    </ul>
  );
}

// change -> ul: h-[850px]
