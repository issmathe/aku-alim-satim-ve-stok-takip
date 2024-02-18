import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const GenelToplamAylikSatis = () => {
  const [totalMonthlySalesPrice, setTotalMonthlySalesPrice] = useState(0);
  const [previousMonthlySalesPrice, setPreviousMonthlySalesPrice] = useState(0);

  useEffect(() => {
    const fetchMonthlySalesPrice = async () => {
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

        // Her bir marka için ayrı ayrı aylık satış fiyatlarını getir ve topla
        const promises = brands.map((brand) =>
          axios.get(`${process.env.REACT_APP_SERVER_URL}/api/${brand}/kayit`)
        );
        const responses = await Promise.all(promises);

        const currentMonthNumber = moment().month() + 1;

        const totalMonthlySalesPrice = responses.reduce(
          (accumulator, response) => {
            const monthlySalesPrice = response.data.reduce(
              (monthlyAccumulator, belge) => {
                const ay = moment(belge.createdAt).month() + 1;

                if (ay === currentMonthNumber) {
                  monthlyAccumulator += belge.piece; // Her satışın fiyatını toplam fiyata ekle
                }

                return monthlyAccumulator;
              },
              0
            );

            return accumulator + monthlySalesPrice;
          },
          0
        );
        const formattedTotalMonthlySalesPrice = totalMonthlySalesPrice.toLocaleString("tr-TR", {
          maximumFractionDigits: 0,
        });
        setTotalMonthlySalesPrice(formattedTotalMonthlySalesPrice);
      } catch (error) {
        console.error(
          "Aylık satış fiyatı verisini çekerken hata oluştu:",
          error.message
        );
      }
    };

    const fetchPreviousMonthlySalesPrice = async () => {
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

        // Her bir marka için ayrı ayrı bir önceki aylık satış fiyatlarını getir ve topla
        const promises = brands.map((brand) =>
          axios.get(`${process.env.REACT_APP_SERVER_URL}/api/${brand}/kayit`)
        );
        const responses = await Promise.all(promises);

        const previousMonthNumber = moment().subtract(1, "months").month() + 1;

        const previousMonthlySalesPrice = responses.reduce(
          (accumulator, response) => {
            const monthlySalesPrice = response.data.reduce(
              (monthlyAccumulator, belge) => {
                const ay = moment(belge.createdAt).month() + 1;

                if (ay === previousMonthNumber) {
                  monthlyAccumulator += belge.piece; // Her satışın fiyatını toplam fiyata ekle
                }

                return monthlyAccumulator;
              },
              0
            );

            return accumulator + monthlySalesPrice;
          },
          0
        );

        setPreviousMonthlySalesPrice(previousMonthlySalesPrice);
      } catch (error) {
        console.error(
          "Bir önceki aylık satış fiyatı verisini çekerken hata oluştu:",
          error.message
        );
      }
    };

    fetchMonthlySalesPrice();
    fetchPreviousMonthlySalesPrice();
  }, []);

  return (
    <div>
      <div>
        <h1
          style={{
            borderRadius: "3px",
            backgroundColor: "#df912c",
            width: "270px",
            fontSize: "18px",
            color: "black",
          }}
        >
          Bu aydaki toplam satış:{" "}
          <span style={{ color: "white", backgroundColor: "green" }}>
            {totalMonthlySalesPrice}₺
          </span>
        </h1>
        <h1
          style={{
            borderRadius: "3px",
            backgroundColor: "#df912c",
            width: "270px",
            fontSize: "18px",
            color: "black",
          }}
        >
          Bir önceki ay:{" "}
          <span style={{ color: "white", backgroundColor: "green" }}>
            {previousMonthlySalesPrice}
          </span>
        </h1>
      </div>{" "}
    </div>
  );
};

export default GenelToplamAylikSatis;
