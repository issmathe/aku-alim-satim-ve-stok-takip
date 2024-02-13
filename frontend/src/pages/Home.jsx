import React from "react";
import Header from "../components/header/Header.jsx";
import MutluAku from "../components/homeGosterilecekler/MutluAku.jsx";
import KlasAku from "../components/homeGosterilecekler/KlasAku.jsx";
import KlasHaftalik from "../components/homeGosterilecekler/haftalikVeri/KlasHaftalik.jsx";

const Home = () => {
  return (
    <div style={{height: "100%", background: "#364d79" }}>
      <Header />
      <div
        className="text-center text-warning pt-2"
        style={{
          padding: "10px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", gap: "20px" }}>
          <KlasAku />
          <MutluAku />
        </div>
      </div>
      <KlasHaftalik/>
    </div>
  );
};

export default Home;
