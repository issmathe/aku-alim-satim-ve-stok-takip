import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart } from "@mui/x-charts/PieChart";



const VartaGrafik = () => {
  const [akuAdet, setAkuAdet] = useState([]);

  const fetchAkuAdet = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/varta/kayit`
      );
      setAkuAdet(response.data);
    } catch (error) {
      console.error("Veri getirme hatası:", error);
    }
  };

  useEffect(() => {
    fetchAkuAdet();
  }, []);

  // Her bir akü türü için adetleri saymak için bir fonksiyon
  const countAdet = (akuTur) => {
    return akuAdet.filter((item) => item.aku === akuTur).length;
  };

  const akuTurleri = [
    "60 AH AKÜ",
    "60 AH EFB",
    "70 AH EFB",
    "70 AH AGM",
    "74 AH AKÜ",
    "105 AH AKÜ",
    "180 AH AKÜ",
    "240 AH EFB",
  ];

  // Her bir akuTur için belirlenen özel renkler
  const akuTurRenkleri = {
    "60 AH AKÜ": "#140f07", // Yeşil
    "60 AH EFB": "#00ff00", // Yeşil
    "70 AH EFB": "#140f07", // Yeşil (Özel Renk)
    "70 AH AGM": "#ff00ff", // Pembe
    "74 AH AKÜ": "#ff0000", // Kırmızı (Özel Renk)
    "105 AH AKÜ": "#def84c", // Açık Yeşil (Özel Renk)
    "180 AH AKÜ": "#cfc5ff", // Lime Yeşili (Özel Renk)
    "240 AH EFB": "#f2c08c", // Yeşil Sarı (Özel Renk)
  };

  // Sütun grafiği için verileri hazırla
  const chartData = akuTurleri.map((akuTur, index) => ({
    category: akuTur,
    value: countAdet(akuTur),
  }));

  const pieChartData = chartData.map((item) => ({
    label: item.category,
    value: item.value,
    color: akuTurRenkleri[item.category] || "#000000", // Belirlenen renkleri ata veya varsayılan renk siyah (#000000)
  }));

  return (
    <div style={{ padding: "20px" }}>
      <PieChart
        series={[
          {
            startAngle: -180,
            endAngle: 180,
            data: pieChartData,
          },
        ]}
        height={300}
      />
    </div>
  );
};

export default VartaGrafik;
