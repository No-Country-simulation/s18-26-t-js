'use client';
import UserMenuHeader from '@/components/UserMenuHeader';
import { SessionProvider } from 'next-auth/react';
import Link from 'next/link';
import SearchInputHeader from './SearchInputHeader';
import Image from 'next/image';
export default function Header() {
  return (
    <header className='grid grid-flow-col py-5 md:px-20 sm:px-10 px-2 bg-[#FFFFFA] shadow-lg gap-2'>
      <div className='flex'>
        <Link className='h-full w-1/2 relative' href={'/'}>
          <Image src={'/img/Logo.svg'} alt='' fill />
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
