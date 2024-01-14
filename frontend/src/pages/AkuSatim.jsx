import React from 'react'
import Header from '../components/header/Header'
import KlasSatimGoster from '../components/klasAku/klasSatim/KlasSatimGoster'
import KlasSatimForm from '../components/klasAku/klasSatim/KlasSatimForm'


const AkuSatim = () => {
  return (
    <div>
        <Header/>
        <KlasSatimForm/>
        <KlasSatimGoster/>
    </div>
  )
}

export default AkuSatim