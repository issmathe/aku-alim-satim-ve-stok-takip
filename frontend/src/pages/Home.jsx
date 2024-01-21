import React from "react";
import Header from "../components/header/Header.jsx";

const Home = () => {
  return (
    <div>
      <Header />
      <div
        style={{
          height: "100vh",
          background: "#364d79",
        }}
      >
        <h2 className="text-center text-warning pt-2">HOŞGELDİNİZ</h2>{" "}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{ height: "550px" }}
            src="https://th.bing.com/th/id/OIG3.b_AM18xh_tjl6zR5NYRA?pid=ImgGn"
            alt="Resim Açıklaması"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
