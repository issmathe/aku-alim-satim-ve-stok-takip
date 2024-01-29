import React, { useState, useEffect } from "react";
import { Card, Space } from "antd";
import axios from "axios";

const MutluAku = () => {
  const [klassAkuData, setKlassAkuData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL + "/api/mutlu"
      );
      setKlassAkuData(response.data);
    } catch (error) {
      console.error("Veri çekiminde hata oluştu:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <Space direction="vertical" size={16}>
          <Card
            style={{
              width: 225,
              fontSize: "12px",
              background: "#cfc0b4"
            }}
          >
            <button type="button" className="btn btn-primary">
              <a style={{ color: "white" }} href="/mutluAkuSatim">
                Mutlu Akü Satışı Yap
              </a>
            </button>
            <hr style={{padding:"2px", color: "black" }} />
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
                  Fiyat: <span style={{ color: "blue" }}>{item.price}</span>
                </span>
                <span style={{ marginLeft: "10px", fontSize: "14px" }}>
                  Stok: <span style={{ color: "red" }}>{item.piece}</span>
                </span>
                <hr style={{padding:"1px", color: "black" }} />
              </div>
            ))}
          </Card>
        </Space>
      </div>
    </div>
  );
};

export default MutluAku;
