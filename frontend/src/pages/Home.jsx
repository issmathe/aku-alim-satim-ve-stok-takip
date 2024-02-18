import React from "react";
import Header from "../components/header/Header.jsx";
import MutluAku from "../components/homeGosterilecekler/MutluAku.jsx";
import KlasAku from "../components/homeGosterilecekler/KlasAku.jsx";
import InciAku from "../components/homeGosterilecekler/InciAku.jsx";
import VartaAku from "../components/homeGosterilecekler/VartaAku.jsx";
import KraftAku from "../components/homeGosterilecekler/KraftAku.jsx";
import DuracelAku from "../components/homeGosterilecekler/DuracelAku.jsx";
import EuroreparAkuAku from "../components/homeGosterilecekler/EuroreparAku.jsx";
import GenelToplam from "../components/homeGosterilecekler/genelToplam/GenelToplam.jsx";
import GenelToplamAylik from "../components/homeGosterilecekler/genelToplam/GenelToplamAdet.jsx";
import GenelToplamAylikSatis from "../components/homeGosterilecekler/genelToplam/GenelToplamSatis.jsx";

const Home = () => {
  return (
    <div style={{ height: "100vh", background: "#364d79" }}>
      <Header />
      <h4
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#ffffff",
          backgroundColor: "#677c8c",
          width: "300px",
          margin: "auto",
          marginTop:"5px",
          marginBottom:"5px",
          borderRadius: "12px",
        }}
      >
        Akü Stok Takip Programı
      </h4>
      <div style={{ display: "flex", justifyContent: "center", gap: "43px" }}>
        <span style={{marginTop:"14px"}}><GenelToplam/></span>
        <GenelToplamAylikSatis />
        <GenelToplamAylik />
      </div>
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
          <InciAku />
          <VartaAku />
          <KraftAku />
          <DuracelAku />
          <EuroreparAkuAku />
        </div>
      </div>
    </div>
  );
};

export default Home;
