'use client';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const RestaurantFormTest = ({ userId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'imageUrl' || key === 'logoUrl') {
        const fileList = value;
        if (fileList.length > 0) {
          formData.append(key, fileList[0]);
        }
      } else if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, value);
      }
    });

    formData.append('userId', userId);

    try {
      const res = await axios.post('/api/restaurant', formData);
      const data = await res.data;
      console.log('resp.', data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className='bg-gray-300 p-2 flex flex-col gap-3'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label>Nombre:</label>
        <input type='text' {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label>City ID:</label>
        <select {...register('cityId')}>
          <option value=''>Seleccionar...</option>
          {[1, 2, 3, 4, 5].map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
        {errors.cityId && <p>{errors.cityId.message}</p>}
      </div>
      <div>
        <label>Dirección:</label>
        <input type='text' {...register('address')} />
      </div>
      <div>
        <label>Teléfono:</label>
        <input type='text' {...register('phone')} />
      </div>
      <div>
        <label>Imagen portada:</label>
        <input type='file' {...register('imageUrl')} />
      </div>
      <div>
        <label>Imagen logo:</label>
        <input type='file' {...register('logoUrl')} />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea {...register('description')} />
      </div>
      <div>
        <label>Horario de Apertura:</label>
        <input type='text' {...register('openingHours')} />
      </div>
      <div>
        <label>Categorías:</label>
        <select {...register('category')} multiple>
          <option value={1}>Categoría 1</option>
          <option value={2}>Categoría 2</option>
          <option value={3}>Categoría 3</option>
          <option value={4}>Categoría 4</option>
          <option value={5}>Categoría 5</option>
        </select>
        {errors.category && <p>{errors.category.message}</p>}
      </div>
      <button type='submit'>Añadir Restaurante</button>
    </form>
  );
};

export default RestaurantFormTest;
