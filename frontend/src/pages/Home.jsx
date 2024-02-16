import React from "react";
import Header from "../components/header/Header.jsx";
import MutluAku from "../components/homeGosterilecekler/MutluAku.jsx";
import KlasAku from "../components/homeGosterilecekler/KlasAku.jsx";
import InciAku from "../components/homeGosterilecekler/InciAku.jsx";
import VartaAku from "../components/homeGosterilecekler/VartaAku.jsx";
import KraftAku from "../components/homeGosterilecekler/KraftAku.jsx";
import DuracelAku from "../components/homeGosterilecekler/DuracelAku.jsx";
import EuroreparAkuAku from "../components/homeGosterilecekler/EuroreparAku.jsx";

const Home = () => {
  return (
    <div style={{height: "708px", background: "#364d79" }}>
      <Header />
      <div
        className="text-center text-warning pt-2"
        style={{
          padding: "10px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <KlasAku />
          <MutluAku />
          <InciAku/>
          <VartaAku/>
          <KraftAku/>
          <DuracelAku/>
          <EuroreparAkuAku/>
        </div>
      </div>
    </div>
  );
};

export default Home;
