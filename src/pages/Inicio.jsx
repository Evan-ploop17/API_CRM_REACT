import {useEffect, useState} from 'react'
import { Cliente } from '../Components/Cliente'

export const Inicio = () => {
  
  const [clientes, setClientes] = useState([])

  useEffect(() => {
    const obtenerCLientesAPI = async () => {
      try {
        const url = import.meta.env.VITE_API_URL
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        setClientes(resultado)
      } catch (error) {
        console.log('error', error)
      }
    }
    obtenerCLientesAPI()
  }, [])

  const handleDelete = async id => {
    const confirmar = confirm('¿Desea eliminar el registro?')
    if(confirmar){
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`
        const respuesta = await fetch(url, {
          method: 'DELETE'
        })
        await respuesta.json()
        // location.reload() -> refresca la pag NOOOO se recomienda
        const arrayClientes = clientes.filter( cliente => cliente.id !== id )
        setClientes(arrayClientes)
      } catch (error) {
        console.log('error', error)
      }
    }
  }
  
  return (
    <>
      <h1 className='font-black text-4xl text-blue-900' >Nuevo cliente</h1>
      <p className="text-2xl" >Administra tus cientes</p>

      <table className='w-full mt-5 table-auto shadow bg-white'>

        <thead className='bg-blue-800 text-white'>
          <tr>
            <th className='p-2'>Nombre</th>
            <th className='p-2'>Contacto</th>
            <th className='p-2'>Empresa</th>
            <th className='p-2'>Acciones</th>
          </tr>
        </thead>
        
        <tbody>
          {clientes.map( cliente => (
            <Cliente
              key={cliente.id}
              cliente={cliente}
              handleDelete={handleDelete}
            />
          ) )}
        </tbody>
        
      </table>


    </>
  )
}