import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx"
import AkuIslemleri from "./pages/AkuIslemleri.jsx";
import AkuSatim from "./pages/AkuSatim.jsx";


function App() {
  return (
      <Routes>
      <Route path="/" element={<Home/>} />  
      <Route path="/akuislemleri" element={<AkuIslemleri/>} />  
      <Route path="/klassatim" element={<AkuSatim/>} /> 
      </Routes>
  );
}
export default App;