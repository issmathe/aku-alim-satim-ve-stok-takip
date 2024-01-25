import React from 'react'
import Header from '../../components/header/Header'
import VartaSatimGoster from '../../components/vartaAku/vartaSatim/VartaSatimGoster'
import VartaSatimForm from '../../components/vartaAku/vartaSatim/VartaSatimForm'


const VartaAkuSatim = () => {
  return (
    <div>
        <Header/>
        <VartaSatimForm/>
        <VartaSatimGoster/>
    </div>
  )
}

export default VartaAkuSatim