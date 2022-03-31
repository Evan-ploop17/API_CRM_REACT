import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { Spinner } from './Spinner';

export const Formulario = ({cliente, cargando}) => {

    const navigate = useNavigate()

    const nuevoCLienteSchema = Yup.object({
        nombre: Yup.string().min(4, 'El nombre es muy corto').max(30, 'Nombre muy largo').required('El nombre del cliente es obligatorio'),
        empresa: Yup.string().required('El nombre de la empresa es obligatorio'),
        email: Yup.string().email('Email no valido').required('El email es obligatorio'),
        telefono: Yup.number().integer('Número no valido').positive('Número no valido').typeError('Numero no valido'),
    })

    const handleSubmit = async (values) => {
        try{
            let respuesta
            // editando
            if(cliente.id){
                const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`
                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-type': 'application/json'
                    }
            })
            }else{
                // Creando
                const url = import.meta.env.VITE_API_URL
                respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
            }
            await respuesta.json()
            navigate('/clientes')

        } catch(error){
            console.log('error:', error)
        }
    }


  return (
      cargando ? <Spinner/> : (

        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w3/4 mx-auto ' >
            <h1 className='text-gray-600 font-bold text-xl uppercase text-center' >
                {cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
            </h1>

            <Formik
                // Usamos esto en vez de un useState, hace el mismo efecto
                initialValues={{
                    // si izquierda es undefined entonces derecha
                    nombre: cliente?.nombre ?? '',
                    empresa: cliente?.empresa ?? '',
                    email: cliente?.email ?? '',
                    telefono: cliente?.telefono ?? '',
                    notas: cliente?.notas ?? ''
                }}

                // Vuelve a leer el formulario cuanndo todo ha cargado
                // para que tome valores iniciales que vienen de alguna fuente dde datos
                enableReinitialize={true}

                // Asi se puede resetear el formulario
                // es un metodo asincrono y el await hace que espere hasta que se ejecute completamente la funcion
                // para poder pasar a la siguiente linea de codigo
                onSubmit={
                    async (values, {resetForm}) => {
                        await handleSubmit(values)
                        resetForm()
                    }
                }
                // con esto le decimos al formulario donde están las reglas de validación del formulario
                validationSchema={nuevoCLienteSchema}
            >
                { ({errors, touched}) => {
                return (
                    <Form
                        className='mt-10'
                    >
                        <section className='mb-4'>
                            <label
                                className='text-gray-800'
                                htmlFor="nombre"
                            >Nombre:</label>
                            <Field
                                id='nombre'
                                className='mt-2 block w-full p-3 bg-gray-50'
                                type='text'
                                placeholder='Nombre del cliete'
                                name='nombre'
                            />
                            {errors.nombre && touched.nombre ? (
                                <section className='text-center my-4 bg-red-600 text-white font-bold p-3 uppercase' >
                                    {errors.nombre}
                                </section>
                            ) : null}
                        </section>

                        <section className='mb-4'>
                            <label
                                className='text-gray-800'
                                htmlFor="empresa"
                            >Empresa:</label>
                            <Field
                                id='empresa'
                                className='mt-2 block w-full p-3 bg-gray-50'
                                type='text'
                                placeholder='Empresa del cliete'
                                name='empresa'
                            />
                            <ErrorMessage name='empresa' component="section" className='text-center my-4 bg-red-600 text-white font-bold p-3 uppercase'/>
                        </section>

                        <section className='mb-4'>
                            <label
                                className='text-gray-800'
                                htmlFor="email"
                            >Email:</label>
                            <Field
                                id='email '
                                className='mt-2 block w-full p-3 bg-gray-50'
                                type='email'
                                placeholder='Email del cliete'
                                name='email'
                            />
                            <ErrorMessage name='email' component="section" className='text-center my-4 bg-red-600 text-white font-bold p-3 uppercase'/>
                        </section>

                        <section className='mb-4'>
                            <label
                                className='text-gray-800'
                                htmlFor="telefono"
                            >Telefono:</label>
                            <Field
                                id='telefono'
                                className='mt-2 block w-full p-3 bg-gray-50'
                                type='number'
                                placeholder='Telefono del cliete'
                                name='telefono'
                            />
                            <ErrorMessage name='telefono' component="section" className='text-center my-4 bg-red-600 text-white font-bold p-3 uppercase'/>
                        </section>

                        <section className='mb-4'>
                            <label
                                className='text-gray-800'
                                htmlFor="notas"
                            >Notas:</label>
                            <Field
                                as="textarea"
                                id='notas'
                                className='mt-2 block w-full p-3 bg-gray-50 h-40'
                                type='text'
                                placeholder='Notas del cliete'
                                name='notas'
                            />
                        </section>

                        <input 
                            type="submit"
                            value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                            className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg'
                        />

                    </Form>
                )}}
            </Formik>
        </div>
      )
  )
}

// esto se hace cuando al componente algunas veces se le pasa parametro y otras no
// lo escribimos para las veces que no se le paasa parametros no de error
// cliente es el nombre del prop
// desde nuevo cliente no se esta pasando
Formulario.defaultProps = {
    cliente:{},
    cargando: false
}