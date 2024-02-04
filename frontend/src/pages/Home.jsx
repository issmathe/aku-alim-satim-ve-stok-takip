import React from "react";
import Header from "../components/header/Header.jsx";
import MutluAku from "../components/homeGosterilecekler/MutluAku.jsx";
import InciAku from "../components/homeGosterilecekler/InciAku.jsx";
import KlasAku from "../components/homeGosterilecekler/KlasAku.jsx";
import VartaAku from "../components/homeGosterilecekler/VartaAku.jsx";
import DuracelAku from "../components/homeGosterilecekler/DuracelAku.jsx";

import KraftAku from "../components/homeGosterilecekler/KraftAku.jsx";

const Home = () => {
  return (
    <div>
      <Header />
      <div
        className="text-center text-warning pt-2"
        style={{
          height: "100%",
          background: "#364d79",
          padding: "10px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", gap: "20px" }}>
          <KlasAku />
          <MutluAku />
          <InciAku />
          <VartaAku/>
          <KraftAku />
          <DuracelAku />
        </div>
      </div>
    </div>
  );
};

export default Home;
