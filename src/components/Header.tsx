import { BiSearch, BiUserCircle } from 'react-icons/bi';

export default function Header() {
  return (
    <header className='grid grid-flow-col py-5 md:px-20 sm:px-10 px-2 bg-[#FFFFFA] shadow-lg gap-2'>
      <div>
        <picture className='sm:text-5xl text-2xl'>Logo</picture>
      </div>
      <div className='flex justify-center'>
        <div className='border rounded-lg px-3 py-1 flex w-full max-w-sm items-center'>
          <input
            type='text'
            placeholder='Buscar'
            className='w-full focus-within:outline-none text-black text-lg h-full'
          />
          <BiSearch className='ml-auto' color='#FB6800' size={19} />
        </div>
      </div>
      <div className='flex justify-end items-center'>
        <BiUserCircle
          color='#FB6800'
          size={32}
          className='hover:cursor-pointer'
        />
      </div>
    </header>
  );
}
