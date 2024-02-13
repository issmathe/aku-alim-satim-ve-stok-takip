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
  const calculateCurrentWeekSales = () => {
    const currentWeekSales = {
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
      currentWeekSales.quantityByName[product] = 0;
    });

    data.forEach((belge) => {
      const hafta = moment(belge.createdAt).isoWeek();

      if (hafta === currentWeek) {
        currentWeekSales.totalSales += 1; // Satış adedini artır
        currentWeekSales.totalPieces += belge.piece; // Satış adetini artır

        // Ödeme türüne göre satış adedini artır
        if (belge.paymentType === 'visa') {
          currentWeekSales.salesByPaymentType.visa += 1;
        } else if (belge.paymentType === 'nakit') {
          currentWeekSales.salesByPaymentType.nakit += 1;
        } else if (belge.paymentType === 'veresiye') {
          currentWeekSales.salesByPaymentType.veresiye += 1;
        }

        // Adetini artır sadece belirli ürünler için
        if (currentWeekSales.quantityByName.hasOwnProperty(belge.aku)) {
          currentWeekSales.quantityByName[belge.aku] += 1;
        }
      }
    });

    return currentWeekSales;
  };

  const currentWeekSalesData = calculateCurrentWeekSales();

  // Tablo sütun tanımları
  const columns = Object.keys(currentWeekSalesData.quantityByName).map((product, index) => ({
    title: `Adet (${product})`,
    dataIndex: product,
    key: index,
  }));

  // Tablo veri düzeni
  const dataSource = [{
    key: 1,
    ...currentWeekSalesData.quantityByName,
  }];

  return (
    <div>
      {currentWeek && (
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
        />
      )}
    </div>
  );
};

export default KlasHaftalik;
