import React, { useState, useEffect, useMemo } from "react";
import moment from 'moment';
import 'moment/locale/tr'; // Türkçe dil desteği
import axios from "axios";

const KraftAylik = () => {
  const [aylikSayilar, setAylikSayilar] = useState([]);
  const [monthlyTotal, setMonthlyTotal] = useState([]);

  const akuTurleri = useMemo(() => [
    "60 AH AKÜ",
    "70 AH EFB",
    "72 AH AKÜ",
    "90 AH TERS",
    "135 AH AKÜ",
    "180 AH AKÜ",
  ], []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/Kraft/kayit`);
        const yeniAylikSayilar = Array.from({ length: 12 }, () => Array(akuTurleri.length).fill(0));

        response.data.forEach((item) => {
          const ayIndex = moment(item.satisTarihi).month();
          const akuTurIndex = akuTurleri.indexOf(item.aku);

          if (ayIndex >= 0 && ayIndex < 12 && akuTurIndex !== -1) {
            yeniAylikSayilar[ayIndex][akuTurIndex] += 1;
          }
        });

        setAylikSayilar(yeniAylikSayilar);
      } catch (error) {
        console.error("Veri getirme hatası:", error);
      }
    };

    fetchData();
  }, [akuTurleri]);

  useEffect(() => {
    const monthlyTotal = Array(12).fill(0);

    aylikSayilar.forEach((ay, ayIndex) => {
      ay.forEach((sayi, sayiIndex) => {
        monthlyTotal[ayIndex] += sayi;
      });
    });

    setMonthlyTotal(monthlyTotal);
  }, [aylikSayilar]);

  const currentMonthIndex = moment().month(); // Güncellendi

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "#144b82" }}>Aylık Akü Sayıları</h2>
      <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Ay</th>
            {akuTurleri.map((akuTur, index) => (
              <th key={index} style={{ border: "1px solid #ddd", padding: "8px" }}>
                {akuTur}
              </th>
            ))}
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Toplam</th>
          </tr>
        </thead>
        <tbody>
          {aylikSayilar.map((ay, ayIndex) => (
            <tr key={ayIndex} style={{ background: ayIndex === currentMonthIndex ? "yellow" : "transparent" }}>
              <td style={{ border: "1px solid #ddd", padding: "5px" }}>
                {moment().month(ayIndex).format("MMMM")}
              </td>
              {ay.map((sayi, sayiIndex) => (
                <td key={sayiIndex} style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {sayi}
                </td>
              ))}
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {monthlyTotal[ayIndex]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KraftAylik;
