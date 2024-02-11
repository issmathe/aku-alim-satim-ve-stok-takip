import React, { useState, useEffect } from "react";
import { Button, Card, Space } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

const KlasAku = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [klassAkuData, setKlassAkuData] = useState([]);
  const [goster, setGoster] = useState(false);
  const [totalSales, setTotalSales] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL + "/api/klas"
      );
      setKlassAkuData(response.data);
    } catch (error) {
      console.error("Veri çekiminde hata oluştu:", error.message);
    }
  };

  const fetchTotalSales = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL + "/api/klas/kayit/total"
      );
      setTotalSales(response.data.totalSum);
    } catch (error) {
      console.error(
        "Toplam satış verisini çekerken hata oluştu:",
        error.message
      );
    }
  };

  const fetchTotalQuantity = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL + "/api/klas/kayit"
      );
      setTotalQuantity(response.data.length);
    } catch (error) {
      console.error(
        "Toplam adet verisini çekerken hata oluştu:",
        error.message
      );
    }
  };

  useEffect(() => {
    fetchData();
    fetchTotalSales();
    fetchTotalQuantity();

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const grafikGor = () => {
    setGoster(!goster);
  };

  return (
    <div>
      {windowWidth > 600 ? (
        <Space direction="vertical" size={16}>
          <Card
            style={{
              width: 210,
              fontSize: "12px",
              background: "#cfc0b4",
            }}
          >
            <h4 style={{ color: "#1f1a38", border: "1px solid", borderRadius: "15px", backgroundColor: "#f2c202" }}>KLAS AKÜ</h4>
            <div>
              <h1 style={{ fontSize: "17px" }}>
                Toplam Satış Tutarı:{" "}
                <span
                  style={{
                    color: "#FFFACD",
                    fontSize: "20px",
                    backgroundColor: "#90A4AE",
                    borderRadius: "10px",
                  }}
                >
                  {totalSales}₺
                </span>
              </h1>
              <h1 style={{ fontSize: "17px" }}>
                Toplam Satış Adeti:
                <br />{" "}
                <span
                  style={{
                    color: "#FFFACD",
                    fontSize: "20px",
                    backgroundColor: "#90A4AE",
                    borderRadius: "8px",
                  }}
                >
                  {totalQuantity}
                </span>{" "}
              </h1>
            </div>

            <Button type="primary">
              <Link to="/klasAkuSatim" style={{ color: "white" }}>
                Klas Akü Satışı Yap
              </Link>
            </Button>
            <hr style={{ color: "black" }} />
            <Button type="primary" onClick={grafikGor}>
              Akü Bilgileri Gör
            </Button>{" "}
            <hr style={{ color: "black" }} />
            <div>
              {goster && (
                <div>
                  {klassAkuData.map((item) => (
                    <div
                      style={{ fontSize: "14px", maxHeight: "100px" }}
                      key={item._id}
                      className="card-text"
                    >
                      <h5 className="card-title" style={{ fontSize: "16px" }}>
                        {item.name}
                      </h5>
                      <span style={{ fontSize: "14px" }}>
                        Fiyat:{" "}
                        <span style={{ color: "blue" }}>{item.price}</span>
                      </span>
                      <span style={{ marginLeft: "10px", fontSize: "14px" }}>
                        Stok: <span style={{ color: "red" }}>{item.piece}</span>
                      </span>
                      <hr style={{ padding: "1px", color: "black" }} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </Space>
      ) : (
        <Button type="warning">
          <Link to="/klasAkuSatim" style={{ color: "white" }}>
            Klas Akü Satışı Yap
          </Link>
        </Button>
      )}
    </div>
  );
};

export default KlasAku;
