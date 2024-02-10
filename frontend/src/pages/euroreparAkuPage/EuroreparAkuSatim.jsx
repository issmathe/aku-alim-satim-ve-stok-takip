import React from 'react'
import Header from '../../components/header/Header'
import EuroreparSatimForm from '../../components/eurorepar/euroreparSatim/EuroreparSatimForm'
import EuroreparSatimGoster from '../../components/eurorepar/euroreparEkle/EuroreparGoster'


const EuroreparAkuSatim = () => {
  return (
    <div>
        <Header/>
        <EuroreparSatimForm/>
        <EuroreparSatimGoster/>
    </div>
  )
}

export default EuroreparAkuSatim