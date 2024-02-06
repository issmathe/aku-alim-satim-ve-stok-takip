import React, { useState, useEffect, useMemo } from "react";
import moment from 'moment';
import 'moment/locale/tr'; // Türkçe dil desteği
import axios from "axios";

const KlasAylar = () => {
  const [aylikSayilar, setAylikSayilar] = useState([]);

  const baslangicTarihi = "2024-01-01";
  const haftaSayisi = 52;

  const akuTurleri = useMemo(() => [
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
  ], []);

  const fetchAylikSayilar = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/klas/kayit`);
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

  useEffect(() => {
    fetchAylikSayilar();
  }, []);

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
          </tr>
        </thead>
        <tbody>
          {aylikSayilar.map((ay, ayIndex) => (
            <tr key={ayIndex}>
              <td style={{ border: "1px solid #ddd", padding: "5px" }}>
                {moment().month(ayIndex).format("MMMM")}
              </td>
              {ay.map((sayi, sayiIndex) => (
                <td key={sayiIndex} style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {sayi}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KlasAylar;
