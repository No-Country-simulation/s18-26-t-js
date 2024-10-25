'use client';
import { useRouter } from 'next/navigation';
import React, { FormEvent } from 'react';
import { BiSearch } from 'react-icons/bi';

export default function SearchInputHeader() {
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputSearch = e.currentTarget.elements.namedItem(
      'search',
    ) as HTMLInputElement;

    router.push(`/search?q=${inputSearch.value}`);
  };
  return (
    <form
      className='border rounded-lg px-3 py-1 flex w-full max-w-sm items-center'
      onSubmit={handleSubmit}
    >
      <input
        required
        name='search'
        type='text'
        placeholder='Buscar'
        className='w-full focus-within:outline-none text-black text-lg h-full'
      />
      <button type='submit' className='ml-auto'>
        <BiSearch color='#FB6800' size={19} />
      </button>
    </form>
  );
}
