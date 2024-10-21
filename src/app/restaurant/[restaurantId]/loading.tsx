const loading = () => {
  return (
    <>
      <div className='border-gray-200 animate-pulse mb-8'>
        <div className='relative w-full min-h-64 max-h-52 bg-gray-300'></div>

        <div className='max-w-6xl mx-auto mb-8 px-4 pt-8'>
          <div className='w-96 h-8 mb-4 bg-gray-300'></div>
          <div className='w-24 h-6 mb-4 bg-gray-300'></div>
        </div>

        <div className='max-w-6xl mx-4 sm:mx-auto h-24  mb-4 bg-gray-300'></div>

        <div className=' px-4 py-4 border-[1px] grid grid-cols-[1fr_2fr] grid-rows-[auto_1fr] gap-x-4 max-w-6xl m-auto rounded-xl'>
          <div className=' bg-gray-300 row-[1/2] col-span-full font-semibold w-52 h-8 mb-4'></div>
          <div className='row-[2/-1] col-span-full md:col-[1/2] mb-8 md:mb-0 mx-auto bg-gray-300 w-80 h-40'></div>

          <div className='md:row-[2/-1] col-span-full md:col-[2/-1]'>
            <div className='flex gap-4 mb-8'>
              <div className='bg-gray-300 w-96 h-6 rounded-md'></div>
              <div className=' bg-gray-300 h-6 w-72 rounded-md'></div>
            </div>

            <div className='flex gap-4 mb-4'>
              <div className='rounded-full relative w-16 h-16 bg-gray-300 mt-5'></div>
              <div className='w-full mb-8'>
                <div className=' bg-gray-300 w-48 h-6 mb-4'></div>
                <div className=' bg-gray-300 w-full h-32 '></div>
              </div>
            </div>

            <div className='flex gap-4 '>
              <div className='rounded-full relative w-16 h-16 bg-gray-300 mt-5'></div>
              <div className='w-full mb-8'>
                <div className=' bg-gray-300 w-48 h-6 mb-4'></div>
                <div className=' bg-gray-300 w-full h-32 '></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default loading;
