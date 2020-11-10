import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FirebaseContext } from '../../firebase'
import { useNavigate } from 'react-router'
import FileUploader from 'react-firebase-file-uploader'
export const NewDish = () => {
  const { firebase } = useContext(FirebaseContext)
  const navigate = useNavigate()
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [urlImage, setUrlImage] = useState('')
  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      category: '',
      image: '',
      description: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, 'Debe contener al menos 5 caracteres')
        .required('El nombre del platillo es obligatorio'),
      price: Yup.number()
        .min(1, 'Debes agregar un numero')
        .required('El precio es obligatorio'),
      category: Yup.string().required('La categoria es obligatoria'),
      description: Yup.string()
        .min(10, 'Debe contener al menos 10 caracteres')
        .required('La descripcion del platillo es obligatoria'),
    }),
    onSubmit: async (platillo) => {
      try {
        platillo.image = urlImage
        platillo.stock = true
        await firebase.db.collection('productos').add(platillo)
        navigate('/menu')
      } catch (error) {
        console.log(error)
      }
    },
  })

  const handleUploadStart = () => {
    setUploading(true)
  }
  const handleUploadError = (error) => {
    console.log(error)
  }
  const handleUploadSuccess = async (name) => {
    setUploading(false)
    const url = await firebase.storage
      .ref('productos')
      .child(name)
      .getDownloadURL()
    setUrlImage(url)
  }
  const handleProgress = (progress) => {
    setProgress(progress)
  }

  return (
    <>
      <h1 className='text-3xl font-light text-center uppercase'>
        Nuevo platillo
      </h1>

      <div className='flex justify-center mt-10'>
        <div className='w-full max-w-3xl'>
          <form onSubmit={formik.handleSubmit}>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='name'
              >
                Nombre
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                placeholder='Nombre del platillo'
                id='name'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.name && formik.errors.name ? (
              <div
                className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5'
                role='alert'
              >
                <p>{formik.errors.name}</p>
              </div>
            ) : null}
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='price'
              >
                Precio
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='number'
                placeholder='$230'
                id='price'
                min='0'
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.price && formik.errors.price ? (
              <div
                className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5'
                role='alert'
              >
                <p>{formik.errors.price}</p>
              </div>
            ) : null}
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='category'
              >
                Categoria
              </label>
              <select
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='number'
                id='category'
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value=''>-- Selecciona --</option>
                <option value='desayuno'>Desayuno</option>
                <option value='almuerzo'>Almuerzo</option>
                <option value='cena'>Cena</option>
                <option value='bebida'>Bebidas</option>
                <option value='postre'>Postres</option>
                <option value='ensalada'>Ensaladas</option>
              </select>
            </div>
            {formik.touched.category && formik.errors.category ? (
              <div
                className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5'
                role='alert'
              >
                <p>{formik.errors.category}</p>
              </div>
            ) : null}
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='image'
              >
                Imagen
              </label>
              <label className='bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold cursor-pointer'>
                Subir imagen
                <FileUploader
                  hidden
                  accept='image/*'
                  id='image'
                  randomizeFilename
                  storageRef={firebase.storage.ref('productos')}
                  onUploadStart={handleUploadStart}
                  onUploadError={handleUploadError}
                  onUploadSuccess={handleUploadSuccess}
                  onProgress={handleProgress}
                />
              </label>
            </div>
            {uploading && (
              <div className='h-12 relative w-full border'>
                <div
                  className='bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center'
                  style={{ width: `${progress}%` }}
                >
                  {progress} %
                </div>
              </div>
            )}
            {urlImage && (
              <p className='bg-green-500 text-white p-3 text-center my-5'>
                La imagen se subio correctamente
              </p>
            )}
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='description'
              >
                Descripcion
              </label>
              <textarea
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40'
                type='text'
                id='description'
                placeholder='Descripcion del platillo'
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.description && formik.errors.description ? (
              <div
                className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5'
                role='alert'
              >
                <p>{formik.errors.description}</p>
              </div>
            ) : null}
            <input
              type='submit'
              value='Agregar platillo'
              className='bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold'
            />
          </form>
        </div>
      </div>
    </>
  )
}
