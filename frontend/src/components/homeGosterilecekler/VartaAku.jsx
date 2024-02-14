import React, { useState, useEffect } from "react";
import { Button, Card, Space } from "antd";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

const VartaAku = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [currentWeekSalesData, setCurrentWeekSalesData] = useState({
    totalSales: 0,
    totalPieces: 0,
    salesByPaymentType: {
      visa: 0,
      nakit: 0,
      veresiye: 0,
    },
  });
  const [currentMonthSalesData, setCurrentMonthSalesData] = useState({
    totalSales: 0,
    totalPieces: 0,
    salesByPaymentType: {
      visa: 0,
      nakit: 0,
      veresiye: 0,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalSalesResponse = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/Varta/kayit/total`
        );
        setTotalSales(totalSalesResponse.data.totalSum);

        const totalQuantityResponse = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/Varta/kayit`
        );
        setTotalQuantity(totalQuantityResponse.data.length);
      } catch (error) {
        console.error("Toplam satış veya adet verisini çekerken hata oluştu:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchWeeklySales = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/Varta/kayit`);
        const currentWeekNumber = moment().isoWeek();

        const currentWeekSalesData = response.data.reduce(
          (accumulator, belge) => {
            const hafta = moment(belge.createdAt).isoWeek();

            if (hafta === currentWeekNumber) {
              accumulator.totalSales += 1;
              accumulator.totalPieces += belge.piece;

              if (belge.paymentType === "visa") {
                accumulator.salesByPaymentType.visa += 1;
              } else if (belge.paymentType === "nakit") {
                accumulator.salesByPaymentType.nakit += 1;
              } else if (belge.paymentType === "veresiye") {
                accumulator.salesByPaymentType.veresiye += 1;
              }
            }

            return accumulator;
          },
          {
            totalSales: 0,
            totalPieces: 0,
            salesByPaymentType: {
              visa: 0,
              nakit: 0,
              veresiye: 0,
            },
          }
        );

        setCurrentWeekSalesData(currentWeekSalesData);
      } catch (error) {
        console.error("Haftalık veri getirme hatası:", error);
      }
    };

    fetchWeeklySales();
  }, []);

  useEffect(() => {
    const fetchMonthlySales = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/Varta/kayit`);
        const currentMonthNumber = moment().month() + 1;

        const currentMonthSalesData = response.data.reduce(
          (accumulator, belge) => {
            const ay = moment(belge.createdAt).month() + 1;

            if (ay === currentMonthNumber) {
              accumulator.totalSales += 1;
              accumulator.totalPieces += belge.piece;

              if (belge.paymentType === "visa") {
                accumulator.salesByPaymentType.visa += 1;
              } else if (belge.paymentType === "nakit") {
                accumulator.salesByPaymentType.nakit += 1;
              } else if (belge.paymentType === "veresiye") {
                accumulator.salesByPaymentType.veresiye += 1;
              }
            }

            return accumulator;
          },
          {
            totalSales: 0,
            totalPieces: 0,
            salesByPaymentType: {
              visa: 0,
              nakit: 0,
              veresiye: 0,
            },
          }
        );

        setCurrentMonthSalesData(currentMonthSalesData);
      } catch (error) {
        console.error("Aylık veri getirme hatası:", error);
      }
    };

    fetchMonthlySales();
  }, []);

  return (
    <div>
      <Space direction="vertical" size={16}>
        <Card
          style={{
            width: 200,
            fontSize: "12px",
            background: "#cfc0b4",
          }}
        >
          <h4
            style={{
              color: "#1f1a38",
              border: "1px solid",
              borderRadius: "15px",
              backgroundColor: "#f2c202",
            }}
          >
            Varta AKÜ
          </h4>
          <hr />
          <div>
            <h1 style={{ fontSize: "11px" }}>
              Toplam Satış Tutarı:{" "}
              <span
                style={{
                  color: "#FFFACD",
                  fontSize: "20px",
                  backgroundColor: "#90A4AE",
                  borderRadius: "10px",
                }}
              >
                {totalSales}₺
              </span>
            </h1>
            <h1 style={{ fontSize: "11px" }}>
              Toplam Satış Adeti:{" "}
              <span
                style={{
                  color: "#FFFACD",
                  fontSize: "20px",
                  backgroundColor: "#90A4AE",
                  borderRadius: "8px",
                }}
              >
                {totalQuantity}
              </span>{" "}
            </h1>
          </div>
          <hr />
          <p>Haftalık Satış Fiyatı: {currentWeekSalesData.totalPieces}</p>
          <p>Haftalık Satış Adeti: {currentWeekSalesData.totalSales}</p>

          <hr />
          <p>Aylık Satış Fiyatı: {currentMonthSalesData.totalPieces}</p>
          <p>Aylık Satış Adeti: {currentMonthSalesData.totalSales}</p>
          <hr />
          <Button type="primary">
            <Link to="/VartaAkuSatim" style={{ color: "white" }}>
              Varta Akü Satışı Yap
            </Link>
          </Button>
        </Card>
      </Space>
    </div>
  );
};

export default VartaAku;
