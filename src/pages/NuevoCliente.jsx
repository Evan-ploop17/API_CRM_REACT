import React from 'react'
import { Formulario } from '../Components/Formulario'

export const NuevoCliente = () => {
  return (
    <>
      <h1 className='font-black text-4xl text-blue-900' >Nuevo cliente</h1>
      <p className='text-2xl' >Llena los siguientes campos para registrar un cliente</p>

      <Formulario/>
    </>
    )
}