'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BiLoader } from 'react-icons/bi';
import { useState } from 'react';
import axios from 'axios';

function RegisterPage() {
  const [Loading, setLoading] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);

    const res = await axios.post('/api/auth/register', {
      name: data.name,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      password: data.password,
      owner: data.owner,
    });

    if (res.status === 200) {
      setLoading(false);
      router.push('/auth/login');
    } else {
      alert('Error al  registrarse');
      setLoading(false);
    }
  });

  return (
    <div className='py-12 flex justify-center items-center'>
      <form
        onSubmit={onSubmit}
        className='rounded-xl shadow-xl w-full max-w-[400px] py-5 px-4 border-[#F5D03A59] border-solid border-[1px]
       flex flex-col gap-5 items-center'
      >
        <h1 className='text-[#F5D03A] font-bold text-2xl  '>¡Bienvenido!</h1>
        <p className='text-[14px] font-normal'>Ingresa con tu cuenta</p>
        <input
          autoFocus
          type='text'
          {...register('name', {
            required: {
              value: true,
              message: 'Nombre es requerido',
            },
          })}
          className='p-2 text-[14px] rounded-xl block mb-2 
          bg-transparent text-black border-[#F5D03A59] border-solid border-[1px] w-full'
          placeholder='Nombre'
        />

        {errors.name && (
          <span className='text-red-500 text-xs'>{errors.name.message}</span>
        )}

        <input
          type='text'
          {...register('lastName', {
            required: {
              value: true,
              message: 'Apellido es requerido',
            },
          })}
          className='p-2 text-[14px] rounded-xl block mb-2 
          bg-transparent text-black border-[#F5D03A59] border-solid border-[1px] w-full'
          placeholder='Apellido'
        />

        {errors.lastName && (
          <span className='text-red-500 text-xs'>
            {errors.lastName.message}
          </span>
        )}

        <input
          type='text'
          {...register('username', {
            required: {
              value: true,
              message: 'Username es requerido',
            },
          })}
          className='p-2 text-[14px] rounded-xl block mb-2 
          bg-transparent text-black border-[#F5D03A59] border-solid border-[1px] w-full'
          placeholder='Username'
        />

        {errors.username && (
          <span className='text-red-500 text-xs'>
            {errors.username.message}
          </span>
        )}

        <input
          type='email'
          {...register('email', {
            required: {
              value: true,
              message: 'Email es requerido',
            },
          })}
          className='p-2 text-[14px] rounded-xl block mb-2 bg-transparent text-black border-[#F5D03A59] border-solid border-[1px] w-full'
          placeholder='user@email.com'
        />
        {errors.email && (
          <span className='text-red-500 text-xs'>{errors.email.message}</span>
        )}

        <input
          type='password'
          {...register('password', {
            required: {
              value: true,
              message: 'Contraseña es requerida',
            },
          })}
          className='p-2 text-[14px] rounded-xl block mb-2 bg-transparent text-black border-[#F5D03A59] border-solid border-[1px] w-full'
          placeholder='********'
        />
        {errors.password && (
          <span className='text-red-500 text-sm'>
            {errors.password.message}
          </span>
        )}

        <input
          type='password'
          {...register('confirmPassword', {
            required: {
              value: true,
              message: 'Confirmar Contraseña es requerida',
            },
            validate: (value) =>
              value === password || 'Las contraseñas deben coincidir',
          })}
          className='p-2 text-[14px] rounded-xl block mb-2 bg-transparent text-black border-[#F5D03A59] border-solid border-[1px] w-full'
          placeholder='********'
        />
        {errors.confirmPassword && (
          <span className='text-red-500 text-sm'>
            {errors.confirmPassword.message}
          </span>
        )}

        <label className='w-full text-center'>
          <input className='mr-4' type='checkbox' {...register('owner')} />
          <span>Soy dueño de un restaurante</span>
        </label>

        <button
          className={`transition-colors w-full max-w-[300px] 
         text-white py-[5px] font-bold rounded-lg mt-2 hover:bg-yellow-900 
         ${Loading ? 'bg-slate-500' : 'bg-[#F5D03A]'}`}
          disabled={Loading}
        >
          Register
        </button>
        {
          <div
            className={`transition-all flex items-center ${Loading ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
          >
            Por favor <BiLoader className='animate-spin' />
            espere
          </div>
        }
        <Link
          className='text-[#D2AB0B] font-medium underline transition-colors hover:text-yellow-700'
          href={'login'}
        >
          Tienes una cuenta? inicia sesión
        </Link>
      </form>
    </div>
  );
}
export default RegisterPage;
