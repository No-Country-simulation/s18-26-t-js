'use client';
import { Category } from '@/types/category';
import { City } from '@/types/city';
import { RegisterRestaurant } from '@/types/restaurant';
import { fetchCategories } from '@/utils/fetchCategories';
import { fetchCities } from '@/utils/fetchCities';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiXCircle } from 'react-icons/bi';
import { LuImagePlus } from 'react-icons/lu';

const days = ['lun', 'mar', 'mie', 'jue', 'vie', 'sab', 'dom'];
export default function NewRestaurantForm({ userId }: { userId: number }) {
  const [cities, setCities] = useState<City[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [logoSelected, setLogoSelected] = useState<string | ArrayBuffer>();
  const [timeSelected, setTimeSelected] = useState<{
    open: string;
    close: string;
  }>();
  const [daysSelected, setDaysSelected] = useState<string[]>([]);
  const [bannerSelected, setBannerSelected] = useState<string | ArrayBuffer>();
  const [categoriesSelected, setCategoriesSelected] = useState<number[]>([]);
  const refInputSearchCategories = useRef<HTMLInputElement | null>(null);
  const { register, handleSubmit, setValue } = useForm<RegisterRestaurant>();

  const router = useRouter();

  useEffect(() => {
    fetchCategories().then((res) => {
      setCategories(res);
      setFilteredCategories(res);
    });
    fetchCities().then((res) => setCities(res));
  }, []);
  useEffect(() => {
    setFilteredCategories(categories);
    if (refInputSearchCategories.current) {
      refInputSearchCategories.current.value = '';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesSelected]);
  const loadNewImage = (
    newImage: File,
  ): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(newImage);

      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const onSubmit: SubmitHandler<RegisterRestaurant> = async (data) => {
    data.openingHours = `${timeSelected?.open} - ${timeSelected?.close} - ${daysSelected.join(' - ')}`;
    data.cityId = Number(data.cityId);
    data.userId = userId;
    const formData = new FormData();
    for (const key in data) {
      if (Array.isArray(data[key])) {
        data[key].map((item) => formData.append(key, item as string));
      } else {
        formData.append(key, data[key] as string | File);
      }
    }

    try {
      const { data } = await axios.post('/api/restaurant', formData);
      if (data.id) {
        toast.success('¡Tu restaurante se creó con éxito!');
        router.push('/profileUser');
        router.refresh();
      }
    } catch (error) {
      toast.error('¡oh no! Algo ah salido mal.');
      console.log(error);
    }
  };

  return (
    <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex gap-3 lg:w-4/5'>
        <section className='w-1/2 flex flex-col gap-2 border rounded-xl bg-white p-3'>
          <p>Agrega el logo de tu restaurante</p>
          <div className='border rounded-xl relative aspect-video flex '>
            {logoSelected ? (
              <>
                <Image
                  src={logoSelected as string}
                  alt='logo image selected'
                  fill
                  className='rounded-xl'
                />
                <BiXCircle
                  className='z-50 text-black bg-gray-200 bg-opacity-50 rounded-full p-3 m-auto cursor-pointer size-1/2 opacity-30 hover:opacity-100'
                  onClick={() => {
                    setLogoSelected(undefined);
                    setValue('logoUrl', null);
                  }}
                />
              </>
            ) : (
              <>
                <div className='m-auto flex flex-col justify-center items-center'>
                  <LuImagePlus size={30} />
                  <p>Haz click para agregar una foto.</p>
                </div>
                <input
                  type='file'
                  className='absolute z-10 inset-0 opacity-0 cursor-pointer'
                  onChange={async (e) => {
                    if (e.target.files?.item(0)) {
                      const file = e.target.files[0];
                      const imageData = await loadNewImage(file);
                      setLogoSelected(imageData as string);
                      setValue('logoUrl', file);
                    }
                  }}
                />
              </>
            )}
          </div>
        </section>
        <section className='w-1/2 flex flex-col gap-2 border rounded-xl bg-white p-3'>
          <p>Agrega la portada de tu restaurante</p>
          <div className='border rounded-xl relative aspect-video flex '>
            {bannerSelected ? (
              <>
                <Image
                  src={bannerSelected as string}
                  alt='logo image selected'
                  fill
                  className='rounded-xl'
                />
                <BiXCircle
                  className='z-50 text-black bg-gray-200 bg-opacity-50 rounded-full p-3 m-auto cursor-pointer size-1/2 opacity-30 hover:opacity-100'
                  onClick={() => {
                    setBannerSelected(undefined);
                    setValue('imageUrl', null);
                  }}
                />
              </>
            ) : (
              <>
                <div className='m-auto flex flex-col justify-center items-center'>
                  <LuImagePlus size={30} />
                  <p>Haz click para agregar una foto.</p>
                </div>
                <input
                  type='file'
                  className='absolute z-10 inset-0 opacity-0 cursor-pointer'
                  onChange={async (e) => {
                    if (e.target.files?.item(0)) {
                      const file = e.target.files[0];
                      const imageData = await loadNewImage(file);
                      setBannerSelected(imageData as string);
                      setValue('imageUrl', file);
                    }
                  }}
                />
              </>
            )}
          </div>
        </section>
      </div>
      <input
        type='text'
        className='border rounded-lg p-3'
        placeholder='Nombre'
        {...register('name', {
          required: true,
        })}
      />
      <select
        className='border rounded-lg p-3 w-fit'
        defaultValue={''}
        {...register('cityId', {
          required: true,
        })}
      >
        <option value='' disabled>
          Ciudad
        </option>
        {cities.map(({ id, name }) => (
          <option key={`city-${id}`} value={id}>
            {name}
          </option>
        ))}
      </select>
      <input
        type='text'
        className='border rounded-lg p-3'
        placeholder='Dirección'
        {...register('address', {
          required: true,
        })}
      />
      <input
        type='text'
        className='border rounded-lg p-3'
        placeholder='Teléfono'
        {...register('phone')}
      />
      <textarea
        className='border rounded-lg p-3'
        placeholder='Descripción'
        {...register('description')}
      />
      <section className='bg-white p-3 rounded-lg border gap-2 flex flex-col'>
        <p>Selecciona las categorías de tu restaurante</p>
        <input
          ref={refInputSearchCategories}
          className='text-sm border-b w-fit outline-none'
          type='text'
          placeholder='Buscar'
          onChange={(e) => {
            if (e.target.value) {
              setFilteredCategories((prev) => {
                const filtered = prev.filter((category) =>
                  category.name
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .includes(
                      e.target.value
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, ''),
                    ),
                );
                return filtered;
              });
            } else {
              setFilteredCategories(categories);
            }
          }}
        />
        <datalist id='categoriesList'>
          {categories.map((category) => (
            <option value={category.id} key={category.id} />
          ))}
        </datalist>
        <ul className='flex flex-wrap gap-1'>
          {filteredCategories.map((category, index) => (
            <li
              key={index}
              className={`text-sm flex hover:cursor-pointer border-2 py-1 px-2 rounded-lg ${categoriesSelected.includes(category.id) && 'bg-white border-[#F5D03A] border-2'}`}
              onClick={() => {
                if (categoriesSelected.includes(category.id)) {
                  setCategoriesSelected((prev) => {
                    const newList = prev.filter((i) => i !== category.id);
                    setValue('category', newList);
                    return newList;
                  });
                } else {
                  setCategoriesSelected([...categoriesSelected, category.id]);
                  setValue('category', [...categoriesSelected, category.id]);
                }
              }}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </section>
      <section className='bg-white w-fit p-3 gap-2 border rounded-lg'>
        <p>Horario de atención</p>
        <div className='flex gap-2 justify-center'>
          <div className='flex flex-col'>
            <p className='text-sm'>Inicio</p>
            <input
              type='time'
              defaultValue={'00:00'}
              className='border rounded-lg p-3'
              placeholder='Horario de atención'
              onChange={(e) =>
                setTimeSelected({
                  open: e.target.value,
                  close: timeSelected?.close ?? '',
                })
              }
            />
          </div>
          <div className='flex flex-col'>
            <p className='text-sm'>Cierre</p>
            <input
              type='time'
              defaultValue={'23:59'}
              className='border rounded-lg p-3'
              placeholder='Horario de atención'
              onChange={(e) =>
                setTimeSelected({
                  open: timeSelected?.open ?? '',
                  close: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className='flex gap-1 my-2'>
          {days.map((day) => (
            <span
              key={day}
              className={`border-2 rounded-full py-1 px-2 cursor-pointer ${daysSelected.includes(day) && 'border-[#F5D03A]'}`}
              onClick={() => {
                if (daysSelected.includes(day)) {
                  setDaysSelected((prev) => {
                    const newList = prev.filter((i) => i !== day);
                    return newList;
                  });
                } else {
                  setDaysSelected([...daysSelected, day]);
                }
              }}
            >
              {day[0].toLocaleUpperCase()}
            </span>
          ))}
        </div>
      </section>

      <button
        type='submit'
        className='text-center bg-[#FB6800] basis-[35%] font-medium  text-white-color px-5 py-1 rounded-md w-2/3 m-auto'
      >
        Agregar restaurante
      </button>
    </form>
  );
}
