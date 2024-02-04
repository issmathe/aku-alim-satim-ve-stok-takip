import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart } from "@mui/x-charts/PieChart";



const MutluGrafik = () => {
  const [akuAdet, setAkuAdet] = useState([]);

  const fetchAkuAdet = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/mutlu/kayit`
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
    "72 AH AKÜ",
    "105 AH AKÜ",
    "135 AH AKÜ",
    "180 AH AKÜ",
  ];

  // Her bir akuTur için belirlenen özel renkler
  const akuTurRenkleri = {
    "60 AH AKÜ": "#140f07", // Yeşil
    "72 AH AKÜ": "#def84c", // Açık Yeşil
    "105 AH AKÜ": "#cfc5ff", // Lime Yeşili
    "135 AH AKÜ": "#f2c08c", // Yeşil Sarı
    "180 AH AKÜ": "#522e09", // Medium Spring Green
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

export default MutluGrafik;
