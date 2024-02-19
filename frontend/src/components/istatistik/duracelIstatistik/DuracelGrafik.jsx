import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart } from "@mui/x-charts/PieChart";



const DuracelGrafik = () => {
  const [akuAdet, setAkuAdet] = useState([]);

  const fetchAkuAdet = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/Duracel/kayit`
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
    "45 DAR AKÜ ",
    "60 AH AKÜ ",
    "70 EFB AKÜ",
    "70 AGM AKÜ",
    "72 AH AKÜ",
    "92 AGM AKÜ",
  ];

  // Her bir akuTur için belirlenen özel renkler
  const akuTurRenkleri = {
    "45 DAR AKÜ": "#ff0000", // Örneğin: Kırmızı
    "60 AH AKÜ": "#140f07", // Yeşil
    "70 EFB AKÜ": "#00ff00", // Örneğin: Yeşil
    "70 AGM AKÜ": "#0000ff", // Örneğin: Mavi
    "72 AH AKÜ": "#def84c", // Açık Yeşil
    "92 AGM AKÜ": "#ff00ff", // Örneğin: Mor
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

export default DuracelGrafik;
