import Reviews from '@/components/Reviews';

interface PageProps {
  params: {
    restaurantId: string;
  };
}

export default function Page({ params }: PageProps) {
  const { restaurantId } = params;

  return (
    <section className='p-7'>
      <div className='h-[299px]'>description</div>

      <div className='shadow-xl px-4 py-4  border-[1px] border-[#a0a0a07a] grid grid-cols-[1fr_2fr] grid-rows-[auto_1fr] max-w-6xl  m-auto rounded-xl'>
        <div className='row-[1/2] col-span-full'>Reseñas</div>
        <div className='row-[2/-1] col-[1/2]'>Rating</div>

        <div className='row-[2/-1] col-[2/-1]'>
          <Reviews restaurantId={restaurantId} />
        </div>
      </div>
    </section>
  );
}
