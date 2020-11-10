import { Route, Routes } from 'react-router'
import { Menu } from './components/screens/Menu'
import { NewDish } from './components/screens/NewDish'
import { Orders } from './components/screens/Orders'
import { Sidebar } from './components/ui/Sidebar'
import firebase, { FirebaseContext } from './firebase'
function App() {
  return (
    <FirebaseContext.Provider value={{ firebase }}>
      <div className='md:flex min-h-screen'>
        <Sidebar />
        <div className='p-6 w-full'>
          <Routes className='md:w-3/5 xl:w-4/5'>
            <Route path='/' element={<Orders />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/nuevo-platillo' element={<NewDish />} />
          </Routes>
        </div>
      </div>
    </FirebaseContext.Provider>
  )
}

export default App
