import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Table } from "antd";

const KlasHaftalik = () => {
  const [data, setData] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/klas/kayit`);
        setData(response.data);
        const currentWeekNumber = moment().isoWeek();
        setCurrentWeek(currentWeekNumber);
      } catch (error) {
        console.error("Veri getirme hatası:", error);
      }
    };

    fetchData();
  }, []);

  // Sadece içerisinde bulunduğumuz haftaya ait satışları ve adetleri hesapla
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

    // Initialize quantity for each product
    ["KLAS 60 AH AKÜ", "KLAS 60 AH DAR", "KLAS 70 AH EFB", "KLAS 72 AH AKÜ", "KLAS 90 AH AKÜ", "KLAS 100 AH AKÜ", "KLAS 105 AH AKÜ", "KLAS 135 AH AKÜ", "KLAS 150 AH AKÜ", "KLAS 180 AH AKÜ", "KLAS 225 AH AKÜ"].forEach(product => {
      weekSales.quantityByName[product] = 0;
    });

    data.forEach((belge) => {
      const hafta = moment(belge.createdAt).isoWeek();

      if (hafta === weekNumber) {
        weekSales.totalSales += 1; // Satış adedini artır
        weekSales.totalPieces += belge.piece; // Satış adetini artır

        // Ödeme türüne göre satış adedini artır
        if (belge.paymentType === 'visa') {
          weekSales.salesByPaymentType.visa += 1;
        } else if (belge.paymentType === 'nakit') {
          weekSales.salesByPaymentType.nakit += 1;
        } else if (belge.paymentType === 'veresiye') {
          weekSales.salesByPaymentType.veresiye += 1;
        }

        // Adetini artır sadece belirli ürünler için
        if (weekSales.quantityByName.hasOwnProperty(belge.aku)) {
          weekSales.quantityByName[belge.aku] += 1;
        }
      }
    });

    return weekSales;
  };

  // 1'den 52'ye kadar olan hafta numaralarını içeren array
  const weeksData = Array.from({ length: 52 }, (_, index) => index + 1);

  // Tablo sütun tanımları
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
  ];

  // Tablo veri düzeni
  const dataSource = weeksData.map((week) => {
    const weekSalesData = calculateWeekSales(week);
    return {
      key: week,
      week,
      ...weekSalesData.quantityByName,
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
        />
      )}
    </div>
  );
};

export default KlasHaftalik;
