import React from 'react'
import Header from '../../components/header/Header'
import KlasSonuc from '../../components/islemler/klasIstatistik/KlasSonuc'
const KlasSonucPage = () => {
  return (
    <div>
        <Header/>
        <KlasSonuc/>
    </div>
  )
}

export default KlasSonucPage

// import React, { useState } from 'react';
// import Header from '../../components/header/Header';
// import KlasSonuc from '../../components/islemler/klasIstatistik/KlasSonuc';

// const KlasSonucPage = () => {
//   const [gosterKlasSonuc, setGosterKlasSonuc] = useState(false);

//   const toggleKlasSonuc = () => {
//     setGosterKlasSonuc(!gosterKlasSonuc);
//   };

//   return (
//     <div>
//       <Header />
//       <button onClick={toggleKlasSonuc}>Göster</button>

//       {gosterKlasSonuc && (
//         <div className="container">
//           <KlasSonuc />
//         </div>
//       )}
//     </div>
//   );
// }

// export default KlasSonucPage;
