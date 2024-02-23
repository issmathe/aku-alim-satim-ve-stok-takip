import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const GenelToplamHaftalik = () => {
  const [totalWeeklySales, setTotalWeeklySales] = useState(0);
  const [previousWeeklySales, setPreviousWeeklySales] = useState(0);

  useEffect(() => {
    const fetchWeeklySales = async () => {
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

        // Her bir marka için ayrı ayrı haftalık satışları getir ve topla
        const promises = brands.map((brand) =>
          axios.get(`${process.env.REACT_APP_SERVER_URL}/api/${brand}/kayit`)
        );
        const responses = await Promise.all(promises);

        const currentWeekNumber = moment().week();
        const previousWeekNumber = moment().subtract(1, "weeks").week();

        const totalWeeklySales = responses.reduce((accumulator, response) => {
          const weeklySales = response.data.reduce(
            (weeklyAccumulator, belge) => {
              const hafta = moment(belge.createdAt).week();

              if (hafta === currentWeekNumber) {
                weeklyAccumulator += 1; // Her satışta adeti artırıyoruz
              }

              return weeklyAccumulator;
            },
            0
          );

          return accumulator + weeklySales;
        }, 0);

        const previousWeeklySales = responses.reduce(
          (accumulator, response) => {
            const weeklySales = response.data.reduce(
              (weeklyAccumulator, belge) => {
                const hafta = moment(belge.createdAt).week();

                if (hafta === previousWeekNumber) {
                  weeklyAccumulator += 1; // Her satışta adeti artırıyoruz
                }

                return weeklyAccumulator;
              },
              0
            );

            return accumulator + weeklySales;
          },
          0
        );

        setTotalWeeklySales(totalWeeklySales);
        setPreviousWeeklySales(previousWeeklySales);
      } catch (error) {
        console.error(
          "Haftalık satış verisini çekerken hata oluştu:",
          error.message
        );
      }
    };

    fetchWeeklySales();
  }, []);

  return (
    <div>
      <div>
        <h1
          style={{
            borderRadius: "5px",
            border: "1px solid white", // White border
            backgroundColor: "#df912c",
            width: "250px",
            fontSize: "18px",
            color: "black",
          }}
        >
          {" "}
          Bu haftaki toplam satış:{" "}
          <span style={{ color: "white", backgroundColor: "green" }}>
            {totalWeeklySales}
          </span>
        </h1>
        <h1
          style={{
            borderRadius: "5px",
            border: "1px solid white", // White border
            backgroundColor: "#df912c",
            width: "250px",
            fontSize: "18px",
            color: "black",
          }}
        >
          Bir önceki hafta:{" "}
          <span style={{ color: "white", backgroundColor: "green" }}>
            {previousWeeklySales}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default GenelToplamHaftalik;
