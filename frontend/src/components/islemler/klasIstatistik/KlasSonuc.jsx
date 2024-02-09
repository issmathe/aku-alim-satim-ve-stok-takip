import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Button, Card } from "antd";
import { styled } from "@mui/system";
import Grafik from "./KlasGrafik";
import KlasHaftalik from "./KlasHaftalik";

const { Meta } = Card;

const StyledCard = styled(Card)({
  backgroundColor: "yellow",
  width: 200,
  margin: 20,
  color: "red",
});

const KlasSonuc = () => {
  const [akuAdet, setAkuAdet] = useState([]);

  const akuTurleri = useMemo(
    () => [
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
    ],
    []
  );

  useEffect(() => {
    const fetchAkuAdetAndCalculateTable = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/klas/kayit`
        );
        setAkuAdet(response.data);
      } catch (error) {
        console.error("Veri getirme hatası:", error);
      }
    };

    fetchAkuAdetAndCalculateTable();
  }, []);

  const countAdet = (akuTur) =>
    akuAdet.filter((item) => item.aku === akuTur).length;

  //button
  const [isLoadingA, setIsLoadingA] = useState(false);
  const [isLoadingB, setIsLoadingB] = useState(false);
  const grafikGor = () => {
    setIsLoadingA(!isLoadingA);
  };
  const haftalikGor = () => {
    setIsLoadingB(!isLoadingB);
  };
  return (
    <div style={{ padding: "10px" }}>
      <h2 style={{ textAlign: "center", color: "#144b82" }}>
        Toplam Satılan Klas Akü Adeti: {akuAdet.length}
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
      <hr />
      <div style={{gap:"35px"}}>
        <Button onClick={grafikGor}>Grafik Olarak Göster</Button>
        {isLoadingA && <Grafik />}
        <Button onClick={haftalikGor}>Haftalık Olarak Göster</Button>
        {isLoadingB && <KlasHaftalik />}
      </div>
    </div>
  );
};

export default KlasSonuc;
