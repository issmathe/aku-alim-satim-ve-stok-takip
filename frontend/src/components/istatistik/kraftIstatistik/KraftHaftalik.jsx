import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Table } from "antd";
import "./index.css";

const KraftHaftalik = () => {
  const [data, setData] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/kraft/kayit`);
        setData(response.data);
        const currentWeekNumber = moment().isoWeek();
        setCurrentWeek(currentWeekNumber);
      } catch (error) {
        console.error("Veri getirme hatası:", error);
      }
    };

    fetchData();
  }, []);

  const calculateWeekSales = (weekNumber) => {
    const weekSales = {
      totalSales: 0,
      totalPieces: 0,
      salesByPaymentType: {
        visa: 0,
        nakit: 0,
        veresiye: 0,
      },
      quantityByName: {},
    };

    ["60 AH AKÜ",
    "70 AH EFB",
    "72 AH AKÜ",
    "90 AH TERS",
    "135 AH AKÜ",
    "180 AH AKÜ",].forEach(product => {
      weekSales.quantityByName[product] = 0;
    });

    data.forEach((belge) => {
      const hafta = moment(belge.createdAt).isoWeek();

      if (hafta === weekNumber) {
        weekSales.totalSales += 1;
        weekSales.totalPieces += belge.piece;

        if (belge.paymentType === 'visa') {
          weekSales.salesByPaymentType.visa += 1;
        } else if (belge.paymentType === 'nakit') {
          weekSales.salesByPaymentType.nakit += 1;
        } else if (belge.paymentType === 'veresiye') {
          weekSales.salesByPaymentType.veresiye += 1;
        }

        if (weekSales.quantityByName.hasOwnProperty(belge.aku)) {
          weekSales.quantityByName[belge.aku] += 1;
        }
      }
    });

    return weekSales;
  };

  const weeksData = Array.from({ length: 52 }, (_, index) => index + 1);

  const columns = [
    {
      title: "Hafta",
      dataIndex: "week",
      key: "week",
      render: (week) => `Hafta ${week}`,
    },
    ...Object.keys(calculateWeekSales(currentWeek).quantityByName).map((product, index) => ({
      title: `Adet (${product})`,
      dataIndex: product,
      key: index,
    })),
    {
      title: "Toplam Satış",
      dataIndex: "totalSales",
      key: "totalSales",
      render: (_, record) => record.totalSales,
    },
  ];

  const dataSource = weeksData.map((week) => {
    const weekSalesData = calculateWeekSales(week);
    const isCurrentWeek = week === currentWeek;

    return {
      key: week,
      week,
      ...weekSalesData.quantityByName,
      totalSales: weekSalesData.totalSales,
      isCurrentWeek: isCurrentWeek, // Ekledik
    };
  });

  return (
    <div>
      {currentWeek && (
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          style={{ padding: '10px' }}
          rowClassName={(record) => (record.isCurrentWeek ? "current-week-row" : "")} // Ekledik
        />
      )}
    </div>
  );
};

export default KraftHaftalik;
