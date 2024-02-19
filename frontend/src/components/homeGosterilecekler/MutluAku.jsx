import React, { useState, useEffect } from "react";
import { Button, Card, Space } from "antd";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

const MutluAku = () => {
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
  const [previousWeekSalesData, setPreviousWeekSalesData] = useState({
    totalSales: 0,
    totalPieces: 0,
    salesByPaymentType: {
      visa: 0,
      nakit: 0,
      veresiye: 0,
    },
  });
  const [previousMonthSalesData, setPreviousMonthSalesData] = useState({
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
          `${process.env.REACT_APP_SERVER_URL}/api/mutlu/kayit/total`
        );
        setTotalSales(totalSalesResponse.data.totalSum);

        const totalQuantityResponse = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/mutlu/kayit`
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
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/mutlu/kayit`);
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
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/mutlu/kayit`);
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

  useEffect(() => {
    const fetchPreviousWeekSales = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/mutlu/kayit`);
        const previousWeekNumber = moment().isoWeek() - 1;

        const previousWeekSalesData = response.data.reduce(
          (accumulator, belge) => {
            const hafta = moment(belge.createdAt).isoWeek();

            if (hafta === previousWeekNumber) {
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

        setPreviousWeekSalesData(previousWeekSalesData);
      } catch (error) {
        console.error("Önceki hafta veri getirme hatası:", error);
      }
    };

    fetchPreviousWeekSales();
  }, []);

  useEffect(() => {
    const fetchPreviousMonthSales = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/mutlu/kayit`);
        const currentMonthNumber = moment().month() + 1;
        const previousMonthNumber = currentMonthNumber - 1;

        const previousMonthSalesData = response.data.reduce(
          (accumulator, belge) => {
            const ay = moment(belge.createdAt).month() + 1;

            if (ay === previousMonthNumber) {
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

        setPreviousMonthSalesData(previousMonthSalesData);
      } catch (error) {
        console.error("Önceki ay veri getirme hatası:", error);
      }
    };

    fetchPreviousMonthSales();
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
            MUTLU AKÜ
          </h4>
          <hr />
          <div>
            <h1 style={{ fontSize: "10px" }}>
              Toplam Satış:{" "}
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
          <div style={{backgroundColor:"#a5859f",borderRadius:"3px"}}>
            <p>
              Haftalık Satış Tutarı:{" "}
              <span style={{ backgroundColor: "#10f604", borderRadius: "5px" }}>
                {currentWeekSalesData.totalPieces}
              </span>
            </p>
            <p>
              Haftalık Satış Adeti:{" "}
              <span style={{ backgroundColor: "#10f604", borderRadius: "5px" }}>
                {currentWeekSalesData.totalSales}
              </span>
            </p>
            <p>
              Önceki Hafta Satış Adeti:{" "}
              <span style={{ backgroundColor: "#f39a9a", borderRadius: "5px" }}>
                {previousWeekSalesData.totalSales}
              </span>
            </p>
          </div>
          <hr />
          <p>Aylık Satış Tutarı: <span style={{backgroundColor:"#55edc9",borderRadius:"5px"}}>{currentMonthSalesData.totalPieces}</span></p>
          <p>Aylık Satış Adeti: <span style={{backgroundColor:"#55edc9",borderRadius:"5px"}}>{currentMonthSalesData.totalSales}</span> </p>
          <p>Önceki Ay Satış Adeti: <span style={{backgroundColor:"#f39a9a",borderRadius:"5px"}}>{previousMonthSalesData.totalSales}</span></p>
          <hr />
          <Button type="primary">
            <Link to="/mutluAkuSatim" style={{ color: "white" }}>
              Mutlu Akü Satışı Yap
            </Link>
          </Button>
        </Card>
      </Space>
    </div>
  );
};

export default MutluAku;
