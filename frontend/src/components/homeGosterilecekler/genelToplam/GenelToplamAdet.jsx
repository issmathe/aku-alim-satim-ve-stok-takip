import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const GenelToplamAylik = () => {
  const [totalMonthlySales, setTotalMonthlySales] = useState(0);
  const [previousMonthlySales, setPreviousMonthlySales] = useState(0);

  useEffect(() => {
    const fetchMonthlySales = async () => {
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

        // Her bir marka için ayrı ayrı aylık satışları getir ve topla
        const promises = brands.map((brand) =>
          axios.get(`${process.env.REACT_APP_SERVER_URL}/api/${brand}/kayit`)
        );
        const responses = await Promise.all(promises);

        const currentMonthNumber = moment().month() + 1;
        const previousMonthNumber = moment().subtract(1, "months").month() + 1;

        const totalMonthlySales = responses.reduce((accumulator, response) => {
          const monthlySales = response.data.reduce(
            (monthlyAccumulator, belge) => {
              const ay = moment(belge.createdAt).month() + 1;

              if (ay === currentMonthNumber) {
                monthlyAccumulator += 1; // Her satışta adeti artırıyoruz
              }

              return monthlyAccumulator;
            },
            0
          );

          return accumulator + monthlySales;
        }, 0);

        const previousMonthlySales = responses.reduce(
          (accumulator, response) => {
            const monthlySales = response.data.reduce(
              (monthlyAccumulator, belge) => {
                const ay = moment(belge.createdAt).month() + 1;

                if (ay === previousMonthNumber) {
                  monthlyAccumulator += 1; // Her satışta adeti artırıyoruz
                }

                return monthlyAccumulator;
              },
              0
            );

            return accumulator + monthlySales;
          },
          0
        );

        setTotalMonthlySales(totalMonthlySales);
        setPreviousMonthlySales(previousMonthlySales);
      } catch (error) {
        console.error(
          "Aylık satış verisini çekerken hata oluştu:",
          error.message
        );
      }
    };

    fetchMonthlySales();
  }, []);

  return (
    <div>
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
          {" "}
          Bu aydaki toplam miktar:{" "}
          <span style={{ color: "white", backgroundColor: "green" }}>
            {totalMonthlySales}
          </span>
        </h1>
        <h1
          style={{
            borderRadius: "3px",
            backgroundColor: "#df912c",
            width: "250px",
            fontSize: "18px",
            color: "black",
          }}
        >
          Bir önceki ay:{" "}
          <span style={{ color: "white", backgroundColor: "green" }}>
            {previousMonthlySales}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default GenelToplamAylik;
