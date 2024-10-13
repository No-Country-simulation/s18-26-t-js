import { FiSearch } from 'react-icons/fi';
import AddReviewButton from './AddReviewButton';
import { getCurrentUser } from '@/libs/actions';
import ReviewsList from './ReviewsList';

interface ReviewsProps {
  restaurantId: string;
}

export default async function Reviews({ restaurantId }: ReviewsProps) {
  const user = await getCurrentUser();
  console.log('user', user);

  return (
    <div>
      <div className='mb-4 flex gap-4 '>
        <form action='#' className=' flex basis-[50%]'>
          <input
            type='text'
            placeholder='Buscar una opinión'
            className=' font-[inherit] text-[inherit] border-[1px] border-[#a0a0a07a] outline-none px-2 rounded-md w-[100%] mr-[-30px]'
          />
          <button type='button'>
            <FiSearch className='text-[#FB6800]' />
          </button>
        </form>

        <AddReviewButton isUser={user} />
      </div>

      <ReviewsList restaurantId={restaurantId} />
    </div>
  );
}
