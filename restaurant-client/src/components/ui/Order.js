import React, { useContext, useState } from 'react'
import { FirebaseContext } from '../../firebase'
export const Order = ({ order }) => {
  const [deliveryTime, setDeliveryTime] = useState(0)
  const { firebase } = useContext(FirebaseContext)

  const handleClick = (id) => {
    firebase.db.collection('ordenes').doc(id).update({ deliveryTime })
  }
  const completeOrder = (id) => {
    firebase.db.collection('ordenes').doc(id).update({ complete: true })
  }
  return (
    <div className='sm:w-1/2 lg:w-1/3 px-2 mb-4'>
      <div className='p-3 shadow-md bg-white'>
        <h1 className='text-yellow-600 text-lg font-bold'>{order.id}</h1>
        {order.order.map((dish) => (
          <p key={dish.id + dish.create} className='text-gray-600'>
            {dish.count} {dish.name}
          </p>
        ))}
        <p className='text-gray-600 font-bold'>
          Total a pagar: ${order.resume}
        </p>

        {order.deliveryTime === 0 && (
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Tiempo de entrega:
            </label>
            <input
              type='number'
              className='shadow appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              min='1'
              max='30'
              placeholder='20 minutos'
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(parseInt(e.target.value))}
            />
            <button
              onClick={() => handleClick(order.id)}
              type='submit'
              className='bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white font-bold'
            >
              Definir tiempo
            </button>
          </div>
        )}
        {order.deliveryTime > 0 && (
          <p className='text-gray-700'>
            Tiempo de entrega:{' '}
            <span className='font-bold'>{order.deliveryTime} Minutos</span>
          </p>
        )}
        {!order.complete && order.deliveryTime > 0 && (
          <button
            className='bg-blue-800 hover:bg-blue-700 w-full mt-5 p-2 text-white uppercase font-bold'
            onClick={() => completeOrder(order.id)}
          >
            Marcar como lista
          </button>
        )}
      </div>
    </div>
  )
}
