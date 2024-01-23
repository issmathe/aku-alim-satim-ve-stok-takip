import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx"

import KlasAkuIslemleri from "./pages/klasAkuPage/KlasAkuIslemleri.jsx";
import KlasAkuSatim from "./pages/klasAkuPage/KlasAkuSatim.jsx";


function App() {
  return (
      <Routes>
      <Route path="/" element={<Home/>} />  
      <Route path="/klasAkuIslemleri" element={<KlasAkuIslemleri/>} /> 
      <Route path="/klasAkuSatim" element={<KlasAkuSatim/>} /> 
 
      </Routes>
  );
}
export default App;