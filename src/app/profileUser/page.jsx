import './profile.css';
import Estrella from '@/components/iconos/Estrella';
import { getSession } from '@/libs/actions';
import axios from 'axios';
import { redirect } from 'next/navigation';
import ActualizarPerfil from '@/components/ActualizarPerfil';
import NewRestaurantCard from '@/components/NewRestaurantCard';

const getUserRestaurants = async (userId, owner) => {
  if (owner) {
    // traer los restaurantes registrados por este usuario
    const res = await axios(`${process.env.NEXTAUTH_URL}/api/restaurant`);
    return res.data;
  } else {
    // traer los restaurantes reseñados y calificados por este usuario
    const res = await axios(
      `${process.env.NEXTAUTH_URL}/api/reviews/usuario/${userId}`,
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

  const { id, owner, username } = session.user;
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
              src={'/img/user-2.png'}
              alt='imagen de usuario'
              className='w-full h-full rounded-full object-cover object-center '
            />
          </div>
          <div className='mt-24 p-3 border-[#45424C7A] border-[1px] rounded-md'>
            <h6 className=' text-xl'>Mi información</h6>
            <section className='text-[18px] flex gap-2'>
              <h6 className='font-medium'>Edad:</h6>
              <p>23</p>
            </section>
            <section className='text-[18px] flex gap-2'>
              <h6 className='font-medium'>País:</h6>
              <p>Argentina</p>
            </section>
            <section className='text-[18px] flex gap-2 flex-wrap'>
              <h6 className='font-medium'>Email:</h6>
              <p>{Profiledate.email}</p>
            </section>
            <section className='text-[18px] flex gap-2'>
              <h6 className='font-medium'>Lugares visitados:</h6>
              <p>35</p>
            </section>
            <section className='text-[18px] flex gap-2'>
              <h6 className='font-medium'>Nivel:</h6>
              <p>Experto</p>
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
            |<h3>Comensal frecuente</h3>
            <ActualizarPerfil PerfilDatos={Profiledate} />
          </div>

          <h6 className='ml-2 text-xl my-1'>Biografía</h6>
          <section className='p-2 border-[#45424C7A] border-[1px] rounded-md  mx-2 mt-3 mb-10'>
            <p>
              Mi nombre es Gabriela pero me dicen Gabi, tengo 23 años y me
              considero una persona amante de la gastronomía. En mis tiempos
              libres me dedico a buscar y reseñar restaurantes/cafeterías.
            </p>
            <ActualizarPerfil PerfilDatos={Profiledate} />
          </section>
          <div></div>
          {owner ? (
            <h6 className='text-xl mb-3'>Gestión de restaurantes</h6>
          ) : (
            <h6 className='text-xl mb-3'>Mis reseñas actuales</h6>
          )}
          <div className=' ctn-reseñas overflow-x-auto h-[211px]  m-auto relative'>
            {restaurantsList.length > 0 ? (
              <ul className=' flex gap-3  absolute top-0  '>
                {owner && <NewRestaurantCard />}
                {restaurantsList.map((receñas) => (
                  <li
                    key={receñas.id}
                    className='w-[365px] border-[#45424C7A] border-[1px] rounded-md '
                  >
                    <img
                      src={receñas.image}
                      alt={receñas.name}
                      width={'100%'}
                      className='block object-center object-cover h-[111px] rounded-t-md'
                    />
                    <div className='relative  rounded-b-md'>
                      <section className='flex gap-1 absolute right-2 top-1'>
                        <Estrella color='yellow' />
                        <p className='text-[#45424C7A] text-[18px]'>
                          {receñas.averageRating}
                        </p>
                      </section>
                      <section className='flex gap-4 font-medium px-5 py-4'>
                        <p>{receñas.name}</p> | <p>{receñas.location}</p>
                      </section>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No tienes reseñas</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
