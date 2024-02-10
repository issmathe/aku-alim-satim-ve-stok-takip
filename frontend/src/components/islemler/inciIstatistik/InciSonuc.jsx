import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Button, Card } from "antd";
import { styled } from "@mui/system";
import InciHaftalik from "./InciHaftalik";
import InciAylik from "./InciAylik";
import InciGrafik from "./InciGrafik";

const { Meta } = Card;

const StyledCard = styled(Card)({
  backgroundColor: "yellow",
  width: 200,
  margin: 20,
  color: "red",
});

const InciSonuc = () => {
  const [akuAdet, setAkuAdet] = useState([]);

  const akuTurleri = useMemo(
    () => [
      "42 AH İNCE ",
      "50 AH AKÜ",
      "60 AH AKÜ",
      "60 AH DAR",
      "72 AH AKÜ",
      "105 AH AKÜ",
      "135 AH AKÜ",
      "180 AH AKÜ",
    ],
    []
  );

  useEffect(() => {
    const fetchAkuAdetAndCalculateTable = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/inci/kayit`
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

  // Button states
  const [isGrafikLoading, setIsGrafikLoading] = useState(false);
  const [isHaftalikLoading, setIsHaftalikLoading] = useState(false);
  const [isAylikLoading, setIsAylikLoading] = useState(false);

  // Button click handlers
  const grafikGor = () => {
    setIsGrafikLoading(!isGrafikLoading);
    setIsHaftalikLoading(false);
    setIsAylikLoading(false);
  };

  const haftalikGor = () => {
    setIsHaftalikLoading(!isHaftalikLoading);
    setIsGrafikLoading(false);
    setIsAylikLoading(false);
  };

  const aylikGor = () => {
    setIsAylikLoading(!isAylikLoading);
    setIsGrafikLoading(false);
    setIsHaftalikLoading(false);
  };

  return (
    <div style={{ padding: "10px" }}>
      <h2 style={{ textAlign: "center", color: "#144b82" }}>
        Toplam Satılan Inci Akü Adeti: {akuAdet.length}
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
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <Button type="primary" onClick={grafikGor}>
          Grafik Olarak Göster
        </Button>
        <Button type="primary" onClick={haftalikGor}>
          Haftalık Olarak Göster
        </Button>
        <Button type="primary" onClick={aylikGor}>
          Aylık Olarak Göster
        </Button>
      </div>
      <br />
      <div>{isAylikLoading && <InciAylik />}</div>
      <div>{isGrafikLoading && <InciGrafik />}</div>
      <div>{isHaftalikLoading && <InciHaftalik />}</div>
    </div>
  );
};

export default InciSonuc;
