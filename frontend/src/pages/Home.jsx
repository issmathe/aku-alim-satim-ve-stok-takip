import React from "react";
import Header from "../components/header/Header.jsx";

const Home = () => {
  return (
    <div>
      <Header />
      <div
        className="text-center text-warning pt-2"
        style={{
          height: "100vh",
          background: "#364d79",
          padding: "20px", // Padding ekledim
          boxSizing: "border-box", // Padding'in genişliği ve yüksekliği dahil olmasını sağlar
        }}
      >
        <h2 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>HOŞGELDİNİZ</h2>{" "}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{ maxWidth: "100%", height: "auto", maxHeight: "550px" }}
            src="https://th.bing.com/th/id/OIG3.b_AM18xh_tjl6zR5NYRA?pid=ImgGn"
            alt="Resim Açıklaması"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
