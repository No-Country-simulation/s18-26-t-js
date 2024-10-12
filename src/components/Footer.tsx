import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SlSocialInstagram } from 'react-icons/sl';

export default function Footer() {
  return (
    <footer className='bg-[--yellow-color] text-white-color grid sm:grid-cols-[1fr_3.5fr] relative  overflow-hidden min-h-[274px]'>
      <div className='h-full sm:block hidden'>
        <Image
          src='/img/women.png'
          alt=''
          width={450}
          height={450}
          className='object-cover left-[-20px] bottom-[0px] block md:left-[-50px] absolute md:bottom-[-20px]'
        />
      </div>

      <div className=' flex-grow gap-7 md:gap-5  sm:content-center  flex flex-col  md:flex-row md:justify-evenly  px-4 py-4 max-w-5xl flex-wrap'>
        <nav aria-label='Enlaces del sitio'>
          <ul className='font-semibold text-base flex flex-col gap-3'>
            <li>
              <Link href='#' aria-label='Sobre nosotros'>
                Sobre nosotros
              </Link>
            </li>

            <li>
              <Link href='#' aria-label='Preguntas frecuentes'>
                Preguntas frecuentes
              </Link>
            </li>

            <li>
              <Link href='#' aria-label='Términos y condiciones'>
                Términos y condiciones
              </Link>
            </li>

            <li>
              <Link href='#' aria-label='Añadir mi negocio'>
                Quiero añadir mi negocio
              </Link>
            </li>
          </ul>
        </nav>

        <address>
          <ul className='font-semibold text-base flex flex-col gap-3 not-italic '>
            <li>
              <a href='mailto:tastynow@mail.com.ar'>
                Mail: tastynow@mail.com.ar
              </a>
            </li>

            <li>
              <a href='tel:+5491112345678'>Tel: +54 9 11 1234-5678</a>
            </li>

            <li>Av calle falsa 1234</li>
          </ul>
        </address>

        <div>
          <p className='font-semibold text-base mb-3'>
            Seguinos en nuestras redes
          </p>

          <div className='flex gap-4  items-center md:justify-center'>
            <a
              href='https://instagram.com'
              aria-label='Instagram'
              target='_blank'
            >
              <SlSocialInstagram className=' text-3xl' />
            </a>

            <a
              href='https://facebook.com'
              aria-label='Facebook'
              target='_blank'
            >
              <FaFacebook className=' text-3xl' />
            </a>

            <a href='https://twitter.com' aria-label='Twitter' target='_blank'>
              <FaXTwitter className=' text-3xl' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/*

  He trabajado en la versión responsive. Cuando estén listos los diseños, 
  puedo hacer los cambios yo, o alguien más puede hacerlo.

*/
