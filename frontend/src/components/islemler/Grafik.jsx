import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart } from "@mui/x-charts/PieChart";



const Grafik = () => {
  const [akuAdet, setAkuAdet] = useState([]);

  const fetchAkuAdet = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/klas/kayit`
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
    "KLAS 60 AH AKÜ",
    "KLAS 60 AH DAR",
    "KLAS 70 AH EFB",
    "KLAS 72 AH AKÜ",
    "KLAS 90 AH AKÜ",
    "KLAS 100 AH AKÜ",
    "KLAS 105 AH AKÜ",
    "KLAS 135 AH AKÜ",
    "KLAS 150 AH AKÜ",
    "KLAS 180 AH AKÜ",
    "KLAS 225 AH AKÜ",
  ];

  // Her bir akuTur için belirlenen özel renkler
  const akuTurRenkleri = {
    "KLAS 60 AH AKÜ": "#140f07", // Yeşil
    "KLAS 60 AH DAR": "#def84c", // Açık Yeşil
    "KLAS 70 AH EFB": "#cfc5ff", // Lime Yeşili
    "KLAS 72 AH AKÜ": "#f2c08c", // Yeşil Sarı
    "KLAS 90 AH AKÜ": "#522e09", // Medium Spring Green
    "KLAS 100 AH AKÜ": "#ff597a", // Chartreuse
    "KLAS 105 AH AKÜ": "#00ffd9", // Spring Green
    "KLAS 135 AH AKÜ": "#807970", // Yellow Green
    "KLAS 150 AH AKÜ": "#144b82", // Olive Drab
    "KLAS 180 AH AKÜ": "#006af0", // Dark Olive Green
    "KLAS 225 AH AKÜ": "#228B22", // Forest Green
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

export default Grafik;
