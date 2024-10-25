'use client';
import UserMenuHeader from '@/components/UserMenuHeader';
import { SessionProvider } from 'next-auth/react';
import Link from 'next/link';
import SearchInputHeader from './SearchInputHeader';
export default function Header() {
  return (
    <header className='grid grid-flow-col py-5 md:px-20 sm:px-10 px-2 bg-[#FFFFFA] shadow-lg gap-2'>
      <div>
        <Link className='sm:text-5xl text-2xl' href={'/'}>
          <picture>Logo</picture>
        </Link>
      </div>
      <div className='flex justify-center'>
        <SearchInputHeader />
      </div>
      <SessionProvider>
        <UserMenuHeader />
      </SessionProvider>
    </header>
  );
}
