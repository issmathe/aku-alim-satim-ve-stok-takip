import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx"

import KlasAkuIslemleri from "./pages/klasAkuPage/KlasAkuIslemleri.jsx";
import KlasAkuSatim from "./pages/klasAkuPage/KlasAkuSatim.jsx";
import MutluAkuIslemleri from "./pages/mutluAkuPage/MutluAkuIslemleri.jsx"
import MutluAkuSatim from "./pages/mutluAkuPage/MutluAkuSatim.jsx"
import InciAkuIslemleri from "./pages/inciAkuPage/InciAkuIslemleri.jsx"
import InciAkuSatim from "./pages/inciAkuPage/InciAkuSatim.jsx"
import VartaAkuSatim from "./pages/vartaAkuPage/VartaAkuSatim.jsx";
import VartaAkuIslemleri from "./pages/vartaAkuPage/VartaAkuIslemleri.jsx";
import KraftAkuIslemleri from "./pages/kraftAkuPage/KraftAkuIslemleri.jsx"
import KraftAkuSatim from "./pages/kraftAkuPage/KraftAkuSatim.jsx"
import DuracelAkuIslemleri from "./pages/duracelAkuPage/duracelAkuIslemleri.jsx";
import DuracelAkuSatim from "./pages/duracelAkuPage/duracelAkuSatim.jsx";
import VeresiyePage from "./pages/islemlerPage/VeresiyePage.jsx";
import SonucPage from "./pages/islemlerPage/SonucPage.jsx";


function App() {
  return (
      <Routes>
      <Route path="/" element={<Home/>} />  
      <Route path="/klasAkuIslemleri" element={<KlasAkuIslemleri/>} /> 
      <Route path="/klasAkuSatim" element={<KlasAkuSatim/>} /> 
 
      <Route path="/mutluAkuIslemleri" element={<MutluAkuIslemleri/>} /> 
      <Route path="/mutluAkuSatim" element={<MutluAkuSatim/>} /> 

      <Route path="/inciAkuIslemleri" element={<InciAkuIslemleri/>} /> 
      <Route path="/inciAkuSatim" element={<InciAkuSatim/>} />

      <Route path="/vartaAkuIslemleri" element={<VartaAkuIslemleri/>} /> 
      <Route path="/vartaAkuSatim" element={<VartaAkuSatim/>} />

      
      <Route path="/kraftAkuIslemleri" element={<KraftAkuIslemleri/>} /> 
      <Route path="/kraftAkuSatim" element={<KraftAkuSatim/>} />

      <Route path="/duracelAkuIslemleri" element={<DuracelAkuIslemleri/>} /> 
      <Route path="/duracelAkuSatim" element={<DuracelAkuSatim/>} />

      <Route path="/veresiye" element={<VeresiyePage/>} />
      <Route path="/sonuc" element={<SonucPage/>} />

      
      </Routes>
  );
}
export default App;