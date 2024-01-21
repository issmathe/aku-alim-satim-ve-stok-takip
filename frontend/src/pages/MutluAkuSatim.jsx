import React from 'react'
import Header from '../components/header/Header'
import MutluAkuSatim from '../../../backend/models/MutluAkuSatim'
import MutluAku from '../../../backend/models/MutluAku'


const AkuSatim = () => {
  return (
    <div>
        <Header/>
        <MutluAkuSatim/>
        <MutluAku/>

    </div>
  )
}

export default AkuSatim