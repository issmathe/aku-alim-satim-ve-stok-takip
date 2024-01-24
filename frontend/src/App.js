import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx"

import KlasAkuIslemleri from "./pages/klasAkuPage/KlasAkuIslemleri.jsx";
import KlasAkuSatim from "./pages/klasAkuPage/KlasAkuSatim.jsx";
import MutluAkuIslemleri from "./pages/mutluAkuPage/MutluAkuIslemleri.jsx"
import MutluAkuSatim from "./pages/mutluAkuPage/MutluAkuSatim.jsx"
import InciAkuIslemleri from "./pages/inciAkuPage/InciAkuIslemleri.jsx"
import InciAkuSatim from "./pages/inciAkuPage/InciAkuSatim.jsx"
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
      
      </Routes>
  );
}
export default App;