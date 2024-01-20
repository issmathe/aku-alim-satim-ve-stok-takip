import React from 'react'
import Header from '../components/header/Header.jsx'
import KlasAku from '../components/homeGosterilecekler/KlasAku.jsx'
import Deneme from './Deneme.jsx'




const Home = () => {
  return (
    <div >
        <Header/>
        <div>
        <KlasAku/>
        <Deneme/>
        </div>
    </div>
  )
}

export default Home