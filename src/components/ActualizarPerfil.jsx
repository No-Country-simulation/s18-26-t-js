'use client'
import axios from 'axios';
import React, { useState } from 'react';
import { BiEdit, BiLoader } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';

export default function ActualizarPerfil({PerfilDatos,id}) {

  const [Loading, setLoading] = useState(false);

    const [openForm,setOpen] = useState(false)
      const [formData, setFormData] = useState({
        country: PerfilDatos.country,
        name: PerfilDatos.name,
        lastName: PerfilDatos.lastName,
        username: PerfilDatos.username,
        avatarUrl: PerfilDatos.file,
        birthDate: PerfilDatos.birthDate,
        bio: PerfilDatos.bio,
      });
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
          ...formData,
          [name]: type === 'checkbox' ? checked : value
        });
      };
    
      const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        let formData2 = new FormData()
        formData2.append(
          "country", formData.country
        )
        formData2.append(
          "name", formData.name
        )
        formData2.append(
          "lastName", formData.lastName
        ) 
        formData2.append(
          "username", formData.username
        )
        formData2.append(
          "bio", formData.bio
        )
        formData2.append(
          "birthDate", formData.birthDate
        )
       
        console.log('Form data submitted:', formData);
        // Aquí puedes enviar los datos a tu API utilizando Axios u otra librería.
       await axios.put(`/api/users/${id}/update`,
          formData2
        ).then( res => {
          setLoading(false)
          setOpen(false)
          console.log(res)
        })
      };
    
      return (
      <>
       <form onSubmit={handleSubmit} 
         className={` max-w-[800px] grid  grid-cols-2  p-4 gap-2 border-yellow-500 border-[1px] shadow-lg rounded-md
          bg-white absolute z-10 transition-all ${openForm ? 'opacity-100 scale-100' : ' opacity-0 scale-0'}`}>
         <button onClick={() => {
             setOpen(!openForm)
         }}
         className='absolute top-1 right-1 bg-yellow-400 rounded-[4px]'>
         <CgClose/>
         </button>
         
          <div className=''>
            <label>Country:</label>
            <input
             className='p-1 w-full bg-transparent border-yellow-400 border-[1px] rounded-md'
              type="text"
              name="country"
              value={typeof(formData.country) === 'string' ? formData.country : ''}
              onChange={handleChange}
              placeholder='Bolivia'
              required
            />
          </div>
    
          <div className=''>
            <label>Name:</label>
            <input
            className='p-1 w-full bg-transparent border-yellow-400 border-[1px] rounded-md'
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required              
            />
          </div>
    
          <div className=''>
            <label>Last Name:</label>
            <input
            className='p-1 w-full bg-transparent border-yellow-400 border-[1px] rounded-md'
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className=''>
            <label>Sube tu foto de perfil:</label>
            <input
            className='p-1 w-full bg-transparent border-yellow-400 border-[1px] rounded-md'
              type="file"
              name="avatarUrl"
              //value={formData.birthDate }
              onChange={handleChange}
              
            />
          </div>
          <div className=''>
            <label>Username:</label>
            <input
            className='p-1 w-full bg-transparent border-yellow-400 border-[1px] rounded-md'
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
  
    
          <div className=''>
            <label>Birth Date:</label>
            <input
            className='p-1 w-full bg-transparent border-yellow-400 border-[1px] rounded-md'
              type="date"
              name="birthDate"
              value={typeof(formData.birthDate) === 'string' ? formData.birthDate : "" }
              onChange={handleChange}
              required
            />
          </div>
    
          <div className='flex flex-col gap-3 col-span-2'>
            <label>Bio:</label>
            <textarea
            className='p-1 w-full bg-transparent border-yellow-400 border-[1px] rounded-md '
              name="bio"
              value={typeof(formData.bio) === "string" ? formData.bio :'' }
              onChange={handleChange}
              placeholder='Mi biografía'
            />
          </div>
          <div
            className={`col-span-2  transition-all flex justify-center items-center ${Loading ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
          >
            Por favor <BiLoader className='animate-spin' />
            espere
          </div>
          <button type="submit"
          className='bg-yellow-600 text-white font-semibold col-span-2 mt-5 py-1 rounded-md '
          >Submit</button>
        </form>
        <button onClick={() => {
            setOpen(!openForm);
        }}><BiEdit/></button>
      </>
       
      );
    }
