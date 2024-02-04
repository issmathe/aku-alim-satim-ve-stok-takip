import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "antd";

const Aylar = () => {
  const [akuAdet, setAkuAdet] = useState([]);

  useEffect(() => {
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

    fetchAkuAdet();
  }, []);

  const countAdetInMonth = (akuTur, monthName) => {
    const filteredData = akuAdet.filter(
      (item) =>
        item.aku === akuTur &&
        new Date(item.date).toLocaleDateString('tr-TR', { month: 'long' }) === monthName
    );
    return filteredData.length;
  };

  const countTotalInMonth = (monthName) => {
    const filteredData = akuAdet.filter(
      (item) =>
        new Date(item.date).toLocaleDateString('tr-TR', { month: 'long' }) === monthName
    );
    return filteredData.length;
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

  const aylar = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  const columns = [
    {
      title: "Akü Türü / Ay",
      dataIndex: "akuTur",
      key: "akuTur",
      width: 150,
    },
    ...aylar.map((ay) => ({
      title: ay,
      dataIndex: ay,
      key: ay,
    })),
  ];

  const dataSource = akuTurleri.map((akuTur, akuIndex) => {
    const rowData = { akuTur: akuTur, key: akuIndex };
    aylar.forEach((ay) => {
      rowData[ay] = countAdetInMonth(akuTur, ay);
    });
    return rowData;
  });

  const totalRow = {
    akuTur: "Toplam",
    key: akuTurleri.length,
    ...aylar.reduce((accumulator, ay) => {
      accumulator[ay] = countTotalInMonth(ay);
      return accumulator;
    }, {}),
  };

  return (
    <div style={{ padding: "10px" }}>
      <h2 style={{ textAlign: "center", color: "#144b82" }}>
        Toplam Satılan Klas Akü Adeti: {akuAdet.length}
      </h2>
      <Table dataSource={[...dataSource, totalRow]} columns={columns} pagination={false} />
    </div>
  );
};

export default Aylar;
