'use client';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { BiLoader } from 'react-icons/bi';

function LoginPage() {
  const [Loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const [error, setError] = useState(null);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res.error) {
      setLoading(false);
      setError(res.error);
    } else {
      setLoading(false);
      router.push('/');
      router.refresh();
    }
  });

  return (
    <div className='py-12 flex justify-center items-center'>
      <form
        onSubmit={onSubmit}
        className='rounded-xl shadow-xl w-full max-w-[400px] py-5 px-4 border-[#F5D03A59] border-solid border-[1px]
       flex flex-col gap-6 items-center'
      >
        {error && (
          <p className='bg-red-500 text-lg text-white p-3 rounded mb-2'>
            {error}
          </p>
        )}

        <h1 className='text-[#F5D03A] font-bold text-2xl  '>¡Bienvenido!</h1>
        <p className='text-[14px] font-normal'>Ingresa con tu cuenta</p>
        {/*<label htmlFor="email" className="text-slate-500 mb-2 block text-sm">
          Email:
        </label>//*/}
        <input
          autoFocus
          type='email'
          {...register('email', {
            required: {
              value: true,
              message: 'Email is required',
            },
          })}
          className='p-2 text-[14px] rounded-xl block mb-2 bg-transparent text-black border-[#F5D03A59] border-solid border-[1px] w-full'
          placeholder='user@email.com'
        />

        {errors.email && (
          <span className='text-red-500 text-xs'>{errors.email.message}</span>
        )}

        {/*<label htmlFor="password" className="text-slate-500 mb-2 block text-sm">
          Password:
        </label>*/}
        <input
          type='password'
          {...register('password', {
            required: {
              value: true,
              message: 'Password is required',
            },
          })}
          className='p-2 text-[14px] rounded-xl block mb-2 bg-transparent text-black border-[#F5D03A59] border-solid border-[1px] w-full'
          placeholder='******'
        />

        {errors.password && (
          <span className='text-red-500 text-xs'>
            {errors.password.message}
          </span>
        )}

        <button
          className={` transition-colors w-full max-w-[300px] bg-[#F5D03A] text-white py-[5px] font-bold rounded-lg mt-2
         hover:bg-yellow-900   ${Loading ? 'bg-slate-500' : 'bg-[#F5D03A]'}`}
          disabled={Loading}
        >
          Iniciar sesión
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
          href={'register'}
        >
          No tienes una cuenta? regístrate
        </Link>
      </form>
    </div>
  );
}
export default LoginPage;
