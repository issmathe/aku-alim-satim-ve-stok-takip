import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Button, Card } from "antd";
import { styled } from "@mui/system";
import Grafik from "./MutluGrafik";
import MutluHaftalik from "./MutluHaftalik";
import MutluAylik from "./MutluAylik";

const { Meta } = Card;

const StyledCard = styled(Card)({
  backgroundColor: "yellow",
  width: 200,
  margin: 20,
  color: "red",
});

const MutluSonuc = () => {
  const [akuAdet, setAkuAdet] = useState([]);

  const akuTurleri = useMemo(
    () => [
      "60 AH AKÜ",
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
          `${process.env.REACT_APP_SERVER_URL}/api/mutlu/kayit`
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
  const [isLoadingC, setIsLoadingC] = useState(false);
  const grafikGor = () => {
    setIsLoadingA(!isLoadingA);
  };
  const haftalikGor = () => {
    setIsLoadingB(!isLoadingB);
  };
  const aylikGor = () => {
    setIsLoadingC(!isLoadingC);
  };
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
      <hr />
      <div style={{ display: "flex",justifyContent:"center", gap: "20px" }}>
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
      <br/>
      <div>{isLoadingC && <MutluAylik />}</div>
      <div>{isLoadingA && <Grafik />}</div>
      <div>{isLoadingB && <MutluHaftalik />}</div>
    </div>
  );
};

export default MutluSonuc;
