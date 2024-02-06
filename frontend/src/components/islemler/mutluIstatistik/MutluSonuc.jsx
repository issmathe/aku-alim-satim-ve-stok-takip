import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { Card } from "antd";
import { styled } from "@mui/system";
import Grafik from "./MutluGrafik";
import moment from 'moment';

const { Meta } = Card;

const StyledCard = styled(Card)({
  backgroundColor: "yellow",
  width: 200,
  margin: 20,
  color: "red",
});

const MutluSonuc = () => {
  const [akuAdet, setAkuAdet] = useState([]);
  const baslangicTarihi = "2024-01-01";
  const haftaSayisi = 52;

  const akuTurleri = useMemo(() => [
    "60 AH AKÜ",
    "72 AH AKÜ",
    "105 AH AKÜ",
    "135 AH AKÜ",
    "180 AH AKÜ",
  ], []);

  const haftaNumarasi = useCallback((tarih) => {
    return Math.ceil(moment(tarih).diff(moment(baslangicTarihi), 'weeks', true));
  }, [baslangicTarihi]);

  const [tablo, setTablo] = useState(Array.from({ length: haftaSayisi + 1 }, () => Array(akuTurleri.length).fill(0)));

  const fetchAkuAdetAndCalculateTable = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/mutlu/kayit`);
      setAkuAdet(response.data);

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
  }, [haftaNumarasi, haftaSayisi, akuTurleri]);

  useEffect(() => {
    fetchAkuAdetAndCalculateTable();
  }, [fetchAkuAdetAndCalculateTable]);

  const countAdet = (akuTur) => {
    return akuAdet.filter((item) => item.aku === akuTur).length;
  };

  const currentWeek = moment().isoWeek();

  const haftalikToplamSatir = tablo.map((hafta, haftaIndex) => {
    const haftalikToplam = hafta.reduce((acc, adet) => acc + adet, 0);
    return <td key={haftaIndex} style={{ border: "1px solid #ddd", padding: "8px" }}>{haftalikToplam}</td>;
  });

  return (
    <div style={{ padding: "10px" }}>
      <h2 style={{ textAlign: "center", color: "#144b82" }}>
        Toplam Satılan Mutlu Akü Adeti: {akuAdet.length}
      </h2>
      <div
        style={{
          backgroundColor: "pink",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {akuTurleri.map((akuTur, index) => (
          <StyledCard key={index}>
            <Meta
              title={` ${akuTur}`}
              description={
                <span
                  style={{
                    color: "blue",
                    textAlign: "center",
                    display: "block",
                  }}
                >
                  {countAdet(akuTur)}
                </span>
              }
            />
          </StyledCard>
        ))}
      </div>
      <Grafik />

      <br/><hr/>
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
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Hafta</th>
              {akuTurleri.map((akuTur, index) => (
                <th key={index} style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {akuTur}
                </th>
              ))}
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Haftalık Toplam</th>
            </tr>
          </thead>
          <tbody>
            {tablo.map((hafta, haftaIndex) => (
              <tr
                key={haftaIndex}
                style={{
                  background: haftaIndex === currentWeek ? "yellow" : "transparent",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <td style={{ border: "1px solid #ddd", padding: "5px" }}>{haftaIndex}</td>
                {hafta.map((adet, adetIndex) => (
                  <td key={adetIndex} style={{ border: "1px solid #ddd", padding: "8px" }}>
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

export default MutluSonuc;
