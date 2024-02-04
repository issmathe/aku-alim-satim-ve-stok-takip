import React from 'react'
import Sonuc from '../../components/islemler/Sonuc'
import Header from '../../components/header/Header'
import MutluSonuc from '../../components/islemler/mutlu/MutluSonuc'
const VeresiyePage = () => {
  return (
    <div>
        <Header/>
        <Sonuc/>
        <MutluSonuc/>
    </div>
  )
}

export default VeresiyePage