import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const GunlukToplam = () => {
  const [totalDailySales, setTotalDailySales] = useState(0);

  useEffect(() => {
    const fetchDailySales = async () => {
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

        // Her bir marka için ayrı ayrı günlük satışları getir ve topla
        const promises = brands.map((brand) =>
          axios.get(`${process.env.REACT_APP_SERVER_URL}/api/${brand}/kayit`)
        );
        const responses = await Promise.all(promises);

        const today = moment().startOf("day");

        const totalDailySales = responses.reduce((accumulator, response) => {
          const dailySales = response.data.reduce(
            (dailyAccumulator, belge) => {
              const gun = moment(belge.createdAt);

              if (gun.isSame(today, "day")) {
                dailyAccumulator += 1; // Her satışta adeti artırıyoruz
              }

              return dailyAccumulator;
            },
            0
          );

          return accumulator + dailySales;
        }, 0);

        setTotalDailySales(totalDailySales);
      } catch (error) {
        console.error(
          "Günlük satış verilerini çekerken hata oluştu:",
          error.message
        );
      }
    };

    fetchDailySales();
  }, []);

  return (
    <div>
      <div>
        <h1
          style={{
            borderRadius: "5px",
            border: "1px solid white",
            backgroundColor: "#a768e3",
            width: "250px",
            fontSize: "18px",
            color: "black",
          }}
        >
          {" "}
          Bugünkü Satış:{" "}
          <span style={{ color: "white", backgroundColor: "green" }}>
            {totalDailySales}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default GunlukToplam;
