'use client';
import React, { useState } from 'react';
import { LuImagePlus } from 'react-icons/lu';

export default function Page() {
  const [logoSelected, setLogoSelected] = useState<string | ArrayBuffer>();
  const [bannerSelected, setBannerSelected] = useState<string | ArrayBuffer>();
  const [categoriesSelected, setCategoriesSelected] = useState<string[]>([]);
  const restaurantCategories: string[] = [
    'Italiana',
    'Japonesa',
    'Mexicana',
    'China',
    'India',
    'Francesa',
    'Española',
    'Tailandesa',
    'Griega',
    'Americana',
    'Cafetería',
    'Panadería',
    'Heladería',
    'Food Truck',
    'Bar de Tapas',
    'Pizzería',
    'Parrilla',
    'Buffet',
    'Comida Rápida',
    'Vegetariano',
  ];
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
  return (
    <main className='px-20 py-10 flex flex-col gap-6 bg-[#FBFBF4]'>
      <h1 className='text-3xl text-[#FB6800]'>Agregar restaurante</h1>
      <section className='grid grid-cols-2'>
        <form className='flex flex-col gap-3'>
          <input
            type='text'
            className='border rounded-lg py-1 px-3'
            placeholder='Nombre'
          />
          <select
            className='border rounded-lg py-1 px-3 w-fit'
            name=''
            id=''
            defaultValue={''}
          >
            <option value='' disabled>
              Ciudad
            </option>
            <option value='Buenos Aires'>Buenos Aires</option>
            <option value='Córdoba'>Córdoba</option>
            <option value='Rosario'>Rosario</option>
            <option value='San Miguel de Tucumán'>San Miguel de Tucumán</option>
          </select>
          <input
            type='text'
            className='border rounded-lg py-1 px-3'
            placeholder='Dirección'
          />
          <input
            type='text'
            className='border rounded-lg py-1 px-3'
            placeholder='Teléfono'
          />
          <input
            type='text'
            className='border rounded-lg py-1 px-3'
            placeholder='Descripción'
          />
          <label>
            <p>Selecciona las categorías </p>
            <ul className='flex flex-wrap gap-2'>
              {restaurantCategories.map((category, index) => (
                <li
                  key={index}
                  className={`flex hover:cursor-pointer border p-1 rounded-lg ${categoriesSelected.includes(category) && 'bg-white border-[#F5D03A]'}`}
                  onClick={() => {
                    if (categoriesSelected.includes(category)) {
                      setCategoriesSelected((prev) => {
                        const newList = prev.filter((i) => i !== category);
                        return newList;
                      });
                    } else {
                      setCategoriesSelected([...categoriesSelected, category]);
                    }
                  }}
                >
                  {category}
                </li>
              ))}
            </ul>
          </label>

          <label className='w-1/4'>
            <p>Agrega el logo de tu restaurante</p>
            <div className='border rounded-xl relative aspect-video flex '>
              {logoSelected ? (
                <img
                  src={logoSelected as string}
                  alt=''
                  className='object-fill'
                />
              ) : (
                <>
                  <div className='m-auto flex flex-col justify-center items-center'>
                    <LuImagePlus size={30} />
                    <p>Haz click para agregar fotos.</p>
                  </div>
                  <input
                    type='file'
                    className='absolute z-10 inset-0 opacity-0 cursor-pointer'
                    onChange={async (e) => {
                      if (e.target.files?.item(0)) {
                        const file = e.target.files[0];
                        const imageData = await loadNewImage(file);
                        setLogoSelected(imageData as string);
                      }
                    }}
                    placeholder=''
                  />
                </>
              )}
            </div>
          </label>
          <label className='w-1/3'>
            <p>Agrega la portada de tu restaurante</p>
            <div className='border rounded-xl relative aspect-video flex '>
              {bannerSelected ? (
                <img src={bannerSelected as string} alt='' />
              ) : (
                <>
                  <div className='m-auto flex flex-col justify-center items-center'>
                    <LuImagePlus size={30} />
                    <p>Haz click para agregar fotos.</p>
                  </div>
                  <input
                    type='file'
                    className='absolute z-10 inset-0 opacity-0 cursor-pointer'
                    onChange={async (e) => {
                      if (e.target.files?.item(0)) {
                        const file = e.target.files[0];
                        const imageData = await loadNewImage(file);
                        setBannerSelected(imageData as string);
                      }
                    }}
                    placeholder=''
                  />
                </>
              )}
            </div>
          </label>
        </form>
        <aside></aside>
      </section>
    </main>
  );
}
