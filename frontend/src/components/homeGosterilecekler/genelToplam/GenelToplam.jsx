import React, { useState, useEffect } from "react";
import axios from "axios";

const GenelToplam = () => {
  const [totalSales, setTotalSales] = useState(0);

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

      const responses = await Promise.all(
        brands.map((brand) =>
          axios.get(
            `${process.env.REACT_APP_SERVER_URL}/api/${brand}/kayit/total`
          )
        )
      );

      const totalSum = responses.reduce(
        (acc, response) => acc + response.data.totalSum,
        0
      );

      // toLocaleString kullanarak sayıyı biçimlendir, virgülden sonrasına sıfır basamak
      const formattedTotal = totalSum.toLocaleString("tr-TR", {
        maximumFractionDigits: 0,
      });

      setTotalSales(formattedTotal);
    } catch (error) {
      console.error(
        "Toplam satış verisini çekerken hata oluştu:",
        error.message
      );
    }
  };

  useEffect(() => {
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
        Toplam satış Tutarı:{" "}
        <span style={{ color: "white", backgroundColor: "green" }}>
          {totalSales}₺
        </span>{" "}
      </h1>
    </div>
  );
};

export default GenelToplam;
