"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      return alert("Passwords do not match");
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/auth/login");
    }
  });

  console.log(errors);

  return (
    <div className="h-[calc(100vh-7rem)] w-screen  flex justify-center items-center">
      <form onSubmit={onSubmit} className="rounded-xl shadow-xl w-full max-w-[400px] py-5 px-4 border-[#F5D03A59] border-solid border-[1px]
       flex flex-col gap-5 items-center">
         <h1 className="text-[#F5D03A] font-bold text-2xl  ">¡Bienvenido!</h1>
         <p className="text-[14px] font-normal">Ingresa con tu cuenta</p>
        <input
          type="text"
          autoFocus
          {...register("username", {
            required: {
              value: true,
              message: "Username is required",
            },
          })}
          className="p-2 text-[14px] rounded-xl block mb-2 
          bg-transparent text-black border-[#F5D03A59] border-solid border-[1px] w-full"
          placeholder="yourUser123"
        />

        {errors.username && (
          <span className="text-red-500 text-xs">
            {errors.username.message}
          </span>
        )}

        <input
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
          })}
          className="p-2 text-[14px] rounded-xl block mb-2 bg-transparent text-black border-[#F5D03A59] border-solid border-[1px] w-full"
          placeholder="user@email.com"
        />
        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}

        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
          className="p-2 text-[14px] rounded-xl block mb-2 bg-transparent text-black border-[#F5D03A59] border-solid border-[1px] w-full"
          placeholder="********"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}

        <input
          type="password"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Confirm Password is required",
            },
          })}
          className="p-2 text-[14px] rounded-xl block mb-2 bg-transparent text-black border-[#F5D03A59] border-solid border-[1px] w-full"
          placeholder="********"
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </span>
        )}

        <button className="transition-colors w-full max-w-[300px] bg-[#F5D03A]
         text-white py-[5px] font-bold rounded-lg mt-2 hover:bg-yellow-900 ">
          Register
        </button>
        <Link
        className="text-[#D2AB0B] font-medium underline transition-colors hover:text-yellow-700" 
        href={'login'}>Tienes una cuenta? inicia sesión</Link>
      </form>
    </div>
  );
}
export default RegisterPage;