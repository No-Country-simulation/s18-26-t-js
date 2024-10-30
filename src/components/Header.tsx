'use client';
import UserMenuHeader from '@/components/UserMenuHeader';
import { SessionProvider } from 'next-auth/react';
import Link from 'next/link';
import SearchInputHeader from './SearchInputHeader';
import Image from 'next/image';
export default function Header() {
  return (
    <header className='flex justify-between py-5  sm:px-10 px-2 bg-[#FFFFFA] shadow-lg gap-2'>
      <div className='flex w-2/5 sm:w-fit'>
        <Link className='flex' href={'/'}>
          <Image src={'/img/Logo.svg'} alt='' width={230} height={50} />
        </Link>
      </div>
      <div className='flex justify-center w-2/5'>
        <SearchInputHeader />
      </div>
      <SessionProvider>
        <UserMenuHeader />
      </SessionProvider>
    </header>
  );
}
