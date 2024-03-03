// DuracelAylik.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Table } from "antd";

const DuracelAylik = () => {
  const [data, setData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/duracel/kayit`
        );
        setData(response.data);
        const currentMonthNumber = moment().month() + 1; // moment month starts from 0
        setCurrentMonth(currentMonthNumber);
      } catch (error) {
        console.error("Veri getirme hatası:", error);
      }
    };

    fetchData();
  }, []);

  const calculateMonthSales = (monthNumber) => {
    const monthSales = {
      totalSales: 0,
      totalPieces: 0,
      salesByPaymentType: {
        visa: 0,
        nakit: 0,
        veresiye: 0,
      },
      quantityByName: {},
    };

    [
      "45 DAR AKÜ ",
      "60 AH AKÜ ",
      "70 EFB AKÜ",
      "70 AGM AKÜ",
      "72 AH AKÜ",
      "92 AGM AKÜ",
    ].forEach((product) => {
      monthSales.quantityByName[product] = 0;
    });

    data.forEach((belge) => {
      const ay = moment(belge.createdAt).month() + 1; // moment month starts from 0

      if (ay === monthNumber) {
        monthSales.totalSales += 1;
        monthSales.totalPieces += belge.piece;

        if (belge.paymentType === "visa") {
          monthSales.salesByPaymentType.visa += 1;
        } else if (belge.paymentType === "nakit") {
          monthSales.salesByPaymentType.nakit += 1;
        } else if (belge.paymentType === "veresiye") {
          monthSales.salesByPaymentType.veresiye += 1;
        }

        if (monthSales.quantityByName.hasOwnProperty(belge.aku)) {
          monthSales.quantityByName[belge.aku] += 1;
        }
      }
    });

    return monthSales;
  };

  const monthsData = Array.from({ length: 12 }, (_, index) => index + 1);

  const columns = [
    {
      title: "Ay",
      dataIndex: "month",
      key: "month",
      render: (month) =>
        moment()
          .month(month - 1)
          .format("MMMM"), // Format ay ismini al
    },
    ...Object.keys(calculateMonthSales(currentMonth).quantityByName).map(
      (product, index) => ({
        title: `Adet (${product})`,
        dataIndex: product,
        key: index,
      })
    ),
    {
      title: "Toplam Satış",
      dataIndex: "totalSales",
      key: "totalSales",
      render: (_, record) => record.totalSales,
    },
  ];

  const dataSource = monthsData.map((month) => {
    const monthSalesData = calculateMonthSales(month);
    const isCurrentMonth = month === currentMonth;

    return {
      key: month,
      month,
      ...monthSalesData.quantityByName,
      totalSales: monthSalesData.totalSales,
      isCurrentMonth: isCurrentMonth,
    };
  });

  return (
    <div>
      {currentMonth && (
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          style={{ padding: "10px" }}
          rowClassName={(record) =>
            record.isCurrentMonth ? "current-week-row" : ""
          }
        />
      )}
    </div>
  );
};

export default DuracelAylik;
