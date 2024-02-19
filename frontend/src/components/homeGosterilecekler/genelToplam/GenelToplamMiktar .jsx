import React, { useState, useEffect } from "react";
import axios from "axios";


const GenelToplamMiktar = () => {
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    const fetchTotalSales = async () => {
      try {
        const brands = [
          "klas",
          "mutlu",
          "inci",
          "varta",
          "kraft",
          "duracel",
          "eurorepar",
        ];

        // Her bir marka için ayrı ayrı satışları getir ve topla
        const promises = brands.map((brand) =>
          axios.get(`${process.env.REACT_APP_SERVER_URL}/api/${brand}/kayit`)
        );
        const responses = await Promise.all(promises);

        const totalSales = responses.reduce((accumulator, response) => {
          const brandTotal = response.data.reduce((brandAccumulator, belge) => {
            brandAccumulator += 1; // Her satışta adeti artırıyoruz
            return brandAccumulator;
          }, 0);

          return accumulator + brandTotal;
        }, 0);

        setTotalSales(totalSales);
      } catch (error) {
        console.error("Toplam satış verisini çekerken hata oluştu:", error.message);
      }
    };

    fetchTotalSales();
  }, []);

  return (
    <div>
      <h1
        style={{
          borderRadius: "3px",
          backgroundColor: "#df912c",
          width: "250px",
          fontSize: "18px",
          color: "black",
        }}
      >
        Toplam Satış Miktarı:{" "}
        <span style={{ color: "white", backgroundColor: "green" }}>
          {totalSales}
        </span>
      </h1>
    </div>
  );
};

export default GenelToplamMiktar;
