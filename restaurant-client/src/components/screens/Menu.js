import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../../firebase'
import { Dish } from '../ui/Dish'
export const Menu = () => {
  const [dishes, setDishes] = useState([])
  const { firebase } = useContext(FirebaseContext)
  useEffect(() => {
    getDishes()
  }, [])

  const getDishes = () => {
    firebase.db.collection('productos').onSnapshot(handleSnapshot)
  }

  const handleSnapshot = (snapshot) => {
    const dishesDb = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    setDishes(dishesDb)
  }

  return (
    <>
      <div className='text-center mb-5'>
        <h1 className='text-3xl font-light mb-4'>Menu</h1>
        <Link
          className='bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-2 text-white uppercase font-bold'
          to='/nuevo-platillo'
        >
          Agregar platillo
        </Link>
      </div>

      {dishes.map((dish) => (
        <Dish key={dish.id} dish={dish} />
      ))}
    </>
  )
}
