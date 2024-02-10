import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import moment from 'moment';

const EuroreparHaftalik = () => {
  const baslangicTarihi = "2024-01-01";
  const haftaSayisi = 52;

  const akuTurleri = useMemo(() => [
    "60 AH AKÜ", 
    "60 EFB AKÜ",
    "70 EFB AKÜ",
    "70 AGM AKÜ",
    "72 AH AKÜ",
  ], []);

  const haftaNumarasi = useCallback((tarih) => {
    return Math.ceil(moment(tarih).diff(moment(baslangicTarihi), 'weeks', true));
  }, [baslangicTarihi]);

  const [tablo, setTablo] = useState(Array.from({ length: haftaSayisi + 1 }, () => Array(akuTurleri.length).fill(0)));

  useEffect(() => {
    const fetchAkuAdetAndCalculateTable = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/Eurorepar/kayit`);

        const newTablo = Array.from({ length: haftaSayisi + 1 }, () => Array(akuTurleri.length).fill(0));
        response.data.forEach((item) => {
          const hafta = haftaNumarasi(item.satisTarihi);
          const akuTurIndex = akuTurleri.indexOf(item.aku);
          if (hafta > 0 && hafta <= haftaSayisi && akuTurIndex !== -1) {
            newTablo[hafta][akuTurIndex] += 1;
          }
        });
        setTablo(newTablo);
      } catch (error) {
        console.error("Veri getirme hatası:", error);
      }
    };

    fetchAkuAdetAndCalculateTable();
  }, [haftaNumarasi, haftaSayisi, akuTurleri]);

  const currentWeek = moment().isoWeek();

  const haftalikToplamSatir = tablo.map((hafta, haftaIndex) => {
    const haftalikToplam = hafta.reduce((acc, adet) => acc + adet, 0);
    return <td key={haftaIndex} style={{ border: "1px solid #ddd", padding: "8px" }}>{haftalikToplam}</td>;
  });

  return (
    <div style={{ padding: "10px" }}>
      <div>
        <h2 style={{ textAlign: "center", color: "#144b82" }}>
          Haftalık Satış
        </h2>
        <table
          border="1"
          style={{
            borderCollapse: "collapse",
            width: "100%",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Hafta
              </th>
              {akuTurleri.map((akuTur, index) => (
                <th
                  key={index}
                  style={{ border: "1px solid #ddd", padding: "8px" }}
                >
                  {akuTur}
                </th>
              ))}
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Haftalık Toplam
              </th>
            </tr>
          </thead>
          <tbody>
            {tablo.map((hafta, haftaIndex) => (
              <tr
                key={haftaIndex}
                style={{
                  background:
                    haftaIndex === currentWeek ? "yellow" : "transparent",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <td style={{ border: "1px solid #ddd", padding: "5px" }}>
                  {haftaIndex}
                </td>
                {hafta.map((adet, adetIndex) => (
                  <td
                    key={adetIndex}
                    style={{ border: "1px solid #ddd", padding: "8px" }}
                  >
                    {adet}
                  </td>
                ))}
                {haftalikToplamSatir[haftaIndex]}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EuroreparHaftalik;
