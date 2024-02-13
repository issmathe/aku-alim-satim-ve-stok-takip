import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const KlasAylik = () => {
  const [data, setData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/klas/kayit`);
        setData(response.data);
        const currentMonthNumber = moment().month() + 1; // Moment.js ile ayı al
        setCurrentMonth(currentMonthNumber);
      } catch (error) {
        console.error("Veri getirme hatası:", error);
      }
    };

    fetchData();
  }, []);

  // Sadece içerisinde bulunduğumuz ay ait satışları ve adetleri hesapla
  const calculateCurrentMonthSales = () => {
    const currentMonthSales = {
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
      currentMonthSales.quantityByName[product] = 0;
    });

    data.forEach((belge) => {
      const ay = moment(belge.createdAt).month() + 1; // Moment.js ile belgenin aylık bilgisini al

      if (ay === currentMonth) {
        currentMonthSales.totalSales += 1; // Satış adedini artır
        currentMonthSales.totalPieces += belge.piece; // Satış adetini artır

        // Ödeme türüne göre satış adedini artır
        if (belge.paymentType === 'visa') {
          currentMonthSales.salesByPaymentType.visa += 1;
        } else if (belge.paymentType === 'nakit') {
          currentMonthSales.salesByPaymentType.nakit += 1;
        } else if (belge.paymentType === 'veresiye') {
          currentMonthSales.salesByPaymentType.veresiye += 1;
        }

        // Adetini artır sadece belirli ürünler için
        if (currentMonthSales.quantityByName.hasOwnProperty(belge.aku)) {
          currentMonthSales.quantityByName[belge.aku] += 1;
        }
      }
    });

    return currentMonthSales;
  };

  const currentMonthSalesData = calculateCurrentMonthSales();

  return (
    <div>
      {currentMonth && (
        <div>
          <p>Satış Adeti: {currentMonthSalesData.totalSales}</p>
          <p>Toplam Satış miktarı: {currentMonthSalesData.totalPieces}</p>
          <p>Visa Satış Adedi: {currentMonthSalesData.salesByPaymentType.visa}</p>
          <p>Nakit Satış Adedi: {currentMonthSalesData.salesByPaymentType.nakit}</p>
          <p>Veresiye Satış Adedi: {currentMonthSalesData.salesByPaymentType.veresiye}</p>
          
          {/* Map through the quantityByName object to display sales for each product */}
          {Object.keys(currentMonthSalesData.quantityByName).map((product, index) => (
            <p key={index}>Adet ({product}): {currentMonthSalesData.quantityByName[product]}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default KlasAylik;
