import React from 'react'
import Header from '../../components/header/Header'
import KraftSatimForm from '../../components/kraftAku/kraftSatim/KraftSatimForm'
import KraftSatimGoster from '../../components/kraftAku/kraftSatim/KraftSatimGoster'


const KraftAkuSatim = () => {
  return (
    <div>
        <Header/>
        <KraftSatimForm/>
        <KraftSatimGoster/>
    </div>
  )
}

export default KraftAkuSatim