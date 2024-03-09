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
import GenelToplamMiktar from "../components/homeGosterilecekler/genelToplam/GenelToplamMiktar .jsx";
import GenelToplamHaftalik from "../components/homeGosterilecekler/genelToplam/GenelToplamHaftalik.jsx";
import GunlukToplam from "../components/homeGosterilecekler/genelToplam/GunlukToplam.jsx";
import "./home.css";

const Home = () => {
  return (
    <div style={{ height: "100vh", background: "#364d79" }}>
      <Header />
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5px",
          }}
        >
          <GunlukToplam />
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "43px" }}>
          <div
            style={{
              backgroundColor: "#86b4dd",
              border: "1px solid white",
              paddingTop: "5px",
              borderRadius: "5px",
            }}
          >
            <GenelToplam />
            <GenelToplamMiktar />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "9px",
              backgroundColor: "#86b4dd",
              border: "1px solid white",
              borderRadius: "5px",
              paddingTop: "4px",
            }}
          >
            <GenelToplamHaftalik />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "9px",
              backgroundColor: "#86b4dd",
              border: "1px solid white",
              borderRadius: "5px",
              paddingTop: "4px",
            }}
          >
            <GenelToplamAylikSatis />
            <GenelToplamAylik />
          </div>
        </div>
      </div>

      <div>
        <div className="kucukEkran">
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
