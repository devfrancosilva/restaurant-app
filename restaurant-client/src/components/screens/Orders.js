import React, { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../../firebase'
import { Order } from '../ui/Order'
export const Orders = () => {
  const [orders, setOrders] = useState([])
  const { firebase } = useContext(FirebaseContext)
  useEffect(() => {
    getOrders()
  }, [])

  const getOrders = () => {
    firebase.db
      .collection('ordenes')
      .where('complete', '==', false)
      .onSnapshot(handleSnapShot)
  }
  const handleSnapShot = (snapshot) => {
    let ordersDb = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    console.log(ordersDb)
    setOrders(ordersDb)
  }
  return (
    <>
      <h1 className='text-3xl font-light text-center mb-5'>Ordenes</h1>
      <div className='sm:flex sm:flex-wrap -mx-3'>
        {orders.map((order) => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    </>
  )
}
