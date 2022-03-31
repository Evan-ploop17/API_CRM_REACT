import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { Formulario } from '../Components/Formulario'

export const EditarCliente = () => {

  const [cliente, setCliente] = useState({})
  const [cargando, setCargando] = useState(false)

  const {id} = useParams()

  useEffect( () => {
    setCargando(!cargando)
    const obtenerClienteAPI = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        setCliente(resultado)
      } catch (error) {
        console.log('Error:', error)
      }
      setCargando(false)
    }
    obtenerClienteAPI()
  }, [] )

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Editar cliente</h1>

      {
        cliente?.nombre ?
        <>
          <p className='text-2xl' >Usa este Formulario para editar datos de  un cliente</p>
          <Formulario
            cliente={cliente}
            cargando={cargando}
          /> 
        </> : 
        <p>No existe el registro</p>
      }
    </>
  )
}
