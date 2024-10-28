'use client';
import RestaurantCard from '@/components/RestaurantCard';
import { Category } from '@/types/category';
import { City } from '@/types/city';
import { Restaurant } from '@/types/restaurant';
import { fetchCategories } from '@/utils/fetchCategories';
import { fetchCities } from '@/utils/fetchCities';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
const fetchRestaurantsByName = async (param: string) => {
  try {
    const response = await fetch(`/api/restaurant/search?name=${param}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw error;
  }
};
export default function Page() {
  const params = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredResult, setFilteredResult] = useState<Restaurant[]>([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [filterByCity, setFilterByCity] = useState<number>();
  const [filterByCategory, setFilterByCategory] = useState<string>();

  useEffect(() => {
    fetchCategories().then((res) => setCategories(res));
    fetchCities().then((res) => setCities(res));
  }, []);

  useEffect(() => {
    fetchRestaurantsByName(params.get('q') as string)
      .then((res) => setRestaurants(res))
      .catch((error) => setErrorMessage(error.message))
      .finally(() => setLoadingStatus(false));
  }, [params]);

  useEffect(() => {
    filterResultFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurants, params, filterByCity, filterByCategory]);

  const filterResultFunction = () => {
    const filtered = restaurants.filter((restaurant) => {
      if (filterByCity && !filterByCategory) {
        return restaurant.cityId === filterByCity;
      }
      if (!filterByCity && !filterByCategory) {
        return restaurant;
      }
      if (!filterByCity && filterByCategory) {
        return restaurant.category.some((name) => name === filterByCategory);
      }
      if (filterByCity && filterByCategory) {
        return (
          restaurant.category.some((name) => name === filterByCategory) &&
          restaurant.cityId === filterByCity
        );
      }
    });

    setFilteredResult(filtered);
  };

  return (
    <div className='w-[90%] mx-auto flex flex-col gap-5 my-4'>
      {params.get('q') && (
        <h1 className='text-xl'>
          Resultados para: <b>{params.get('q')}</b>
        </h1>
      )}
      <section className='grid grid-cols-2 gap-5 max-w-96'>
        <label className='border p-1 rounded-lg '>
          <p className='text-gray-600'>Ciudades</p>
          <select
            onChange={({ target }) => setFilterByCity(Number(target.value))}
            value={filterByCity}
          >
            <option value=''>Todos</option>
            {cities.map(({ id, name }) => (
              <option key={`city-${id}`} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label className='border p-1 rounded-lg '>
          <p className='text-gray-600'>Categorías</p>
          <select
            onChange={({ target }) => setFilterByCategory(target.value)}
            value={filterByCategory}
            className='max-w-full'
          >
            <option value=''>Todos</option>
            {categories.map(({ id, name }) => (
              <option key={`category-${id}`} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </section>
      <section className=''>
        {!loadingStatus ? (
          !errorMessage ? (
            <ul className='flex flex-wrap gap-1'>
              {filteredResult.map((restaurant, index) => (
                <li
                  key={index}
                  className='rounded-lg overflow-hidden border max-w-44 md:max-w-60 w-full'
                >
                  <RestaurantCard item={restaurant} />
                </li>
              ))}
            </ul>
          ) : (
            <p>{errorMessage}</p>
          )
        ) : (
          <p>Cargando restaurantes...</p>
        )}
        {!loadingStatus && filteredResult.length < 1 && !errorMessage && (
          <p>No se han encontrado resultados</p>
        )}
      </section>
    </div>
  );
}
