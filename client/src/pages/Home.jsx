import React from 'react'
import { useGlobalContext } from '../contexts/GlobalContext'

const Home = () => {
  const { user} = useGlobalContext();
  return (
    <div>
      <h1 className='text-8xl'>{user}</h1>
    </div>
  )
}

export default Home