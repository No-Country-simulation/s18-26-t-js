import './profile.css';
import { getSession } from '@/libs/actions';
import axios from 'axios';
import { redirect } from 'next/navigation';
import ActualizarPerfil from '@/components/ActualizarPerfil';
import NewRestaurantCard from '@/components/NewRestaurantCard';
import RestaurantCard from '@/components/RestaurantCard';

const getUserRestaurants = async (userId, owner) => {
  if (owner) {
    // traer los restaurantes creados por este usuario
    const res = await axios(
      `${process.env.NEXTAUTH_URL}/api/restaurant/owner/${userId}`,
    );
    return res.data;
  } else {
    // traer los restaurantes reseñados y calificados por este usuario
    const res = await axios(
      `${process.env.NEXTAUTH_URL}/api/restaurant/user-reviews/${userId}`,
    );
    return res.data;
  }
};

export default async function ProfileUser() {
  console.log(process.env.NEXTAUTH_URL);
  let Profiledate; // datos de usuario
  const session = await getSession();

  if (!session) {
    redirect('/auth/login');
  }

  const { id, owner } = session.user;
  await axios.get(`${process.env.NEXTAUTH_URL}/api/users/${id}`).then((res) => {
    Profiledate = res.data;
  });
  const restaurantsList = await getUserRestaurants(id, owner);

  return (
    <div className=' w-full  '>
      <div className='w-full h-[20vh] bg-[#F5D03A]'></div>
      <div className='w-full max-w-[1400px] flex max-md:items-center max-md:flex-col m-auto gap-16 min-h-screen relative p-3'>
        <div className='w-[300px] '>
          <div className='absolute -top-20 left-5 overflow-hidden w-[150px] h-[150px]'>
            <img
              src={Profiledate.avatarUrl || '/img/default-user.jpg' }
              alt='imagen de usuario'
              className='w-full h-full rounded-full object-cover object-center '
            />
          </div>
          <div className='mt-24 p-3 border-[#45424C7A] border-[1px] rounded-md'>
            <h6 className=' text-xl font-semibold'>Mi información</h6>
            <section className='text-[18px] flex items-end gap-2'>
              <h6 className='font-medium'>Nombre de usuario:</h6>
              <p>{Profiledate.username}</p>
            </section>
            <section className='text-[18px] flex gap-2'>
              <h6 className='font-medium'>País:</h6>
              <p>{Profiledate.country}</p>
            </section>
            <section className='text-[18px] flex gap-2 flex-wrap'>
              <h6 className='font-medium'>Email:</h6>
              <p>{Profiledate.email}</p>
            </section>
            <section className='text-[18px] flex gap-2'>
              <h6 className='font-medium'>{Profiledate.owner ? 'Cantidad de restaurantes' : 'Lugares visitados'}:</h6>
              <p>{ restaurantsList.length}</p>
            </section>
            <section className='text-[18px] flex items-end gap-2'>
              <h6 className='font-medium'>Fecha de nacimiento:</h6>
              <p>{Profiledate.birthDate || '20/02/2000'}</p>
            </section>
            <ActualizarPerfil PerfilDatos={Profiledate} id={id} />
          </div>
        </div>

        <div className='w-[80%] mt-8'>
          <div
            className='flex flex-wrap gap-2 text-2xl font-semibold p-2 max-w-max
                 border-[#45424C7A] border-[1px] rounded-md mb-5'
          >
            <h3>
              {Profiledate.name} {Profiledate.lastName}
            </h3>
            <ActualizarPerfil PerfilDatos={Profiledate} id={id}/>
          </div>

          {owner ? (
            <div>
              <h6 className='text-xl mb-3'>Gestión de restaurantes</h6>
              <NewRestaurantCard />
            </div>
          ) : (
            <div>
              <h6 className='ml-2 text-xl my-1'>Biografía</h6>
              <section className='p-2 border-[#45424C7A] border-[1px] rounded-md  mx-2 mt-3 mb-10'>
                <p>{Profiledate.bio || 'No tienes biografía'}</p>
                <ActualizarPerfil PerfilDatos={Profiledate} id = {id}/>
              </section>
              <h6 className='text-xl mb-3'>Mis reseñas actuales</h6>
            </div>
          )}

          <section className='p-4 shadow-lg rounded-md min-h-80 max-h-[500px] overflow-auto mt-4'>
            {owner ? (
              restaurantsList.length > 0 ? (
                <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                  {restaurantsList.map((r) => (
                    <div className='shadow-md rounded-md' key={r.id}>
                      <RestaurantCard
                        item={r}
                        pathEdit={`/edit-restaurant/${r.id}`}
                      />
                    </div>
                  ))}
                </section>
              ) : (
                <p className='text-center mt-8 italic text-gray-color'>
                  No has añadido ningun restaurante aún.
                </p>
              )
            ) : restaurantsList.length > 0 ? (
              <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                {restaurantsList.map((r) => (
                  <div className='shadow-md rounded-md' key={r.id}>
                    <RestaurantCard item={r} />
                  </div>
                ))}
              </section>
            ) : (
              <p className='text-center mt-8 italic text-gray-color'>
                No has añadido ninguna reseña aún.
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
