import React, { useContext, useRef } from 'react'
import { FirebaseContext } from '../../firebase'
import Swal from 'sweetalert2'
export const Dish = ({ dish }) => {
  const stockRef = useRef(dish.stock)
  const { id, name, image, description, price, category, stock } = dish
  const { firebase } = useContext(FirebaseContext)

  const updateStock = () => {
    const stock = stockRef.current.value === 'true'

    try {
      firebase.db.collection('productos').doc(id).update({ stock })
    } catch (error) {
      console.log(error)
    }
  }
  const handleDelete = () => {
    Swal.fire({
      icon: 'error',
      title: 'Eliminar',
      text: 'Seguro desea eliminar el platillo?',
      showCancelButton: true,
      confirmButtonText: 'SI',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          firebase.db.collection('productos').doc(id).delete()
        } catch (error) {
          console.log(error)
        }
      }
    })
  }
  return (
    <div className='w-full px-3 mb-4'>
      <div className='p-5 shadow-md bg-white'>
        <div className='lg:flex'>
          <div className='lg:w-5/12 xl:3/12'>
            <img src={image} alt={name} />
            <div className='sm:flex sm:-mx-2 pl-2'>
              <label className='block mt-5 sm:w-2/4'>
                <span className='block text-gray-800 mb-2'>Stock:</span>
                <select
                  className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                  value={stock}
                  ref={stockRef}
                  onChange={updateStock}
                >
                  <option value='true'>Disponible</option>
                  <option value='false'>No Disponible</option>
                </select>
              </label>
            </div>
          </div>
          <div className='lg:w-7/12 xl:w-9/12 ml-5'>
            <p className='font-bold text-2xl text-yellow-600 mb-4'>{name}</p>
            <p className='text-gray-600 mb-4'>
              Categoria:{' '}
              <span className='text-gray-700 font-bold'>
                {category.toUpperCase()}
              </span>
            </p>
            <p className='text-gray-600 mb-4'>{description}</p>
            <p className='text-gray-600 mb-4'>
              Precio: <span className='text-gray-700 font-bold'>$ {price}</span>
            </p>
          </div>
          <button
            className='bg-red-600 text-white font-bold py-2 px-4 mt-3 float-right uppercase'
            onClick={handleDelete}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
