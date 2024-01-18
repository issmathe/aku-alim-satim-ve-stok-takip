import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const KlasAku = () => {
  const [klassAkuData, setKlassAkuData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/api");
      setKlassAkuData(response.data);
    } catch (error) {
      console.error("Veri çekiminde hata oluştu:", error.message);
    }
  };

  const fetchTotalSales = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/api/kayit/total");
      setTotalSales(response.data.totalSum);
    } catch (error) {
      console.error("Toplam satış verisini çekerken hata oluştu:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
    fetchTotalSales();
  }, []);

  const handleSale = () => {
    // Satış işlemleri burada gerçekleştirilebilir
    console.log("Satış yapılan ürünler");
  };

  return (
    <div style={{ paddingLeft: "40px" }}>
      <div>
        <h1 style={{ fontSize: '25px'}}>Klas Akü</h1>
        <h1 style={{ fontSize: '25px',color:"blue ",  }}><span style={{backgroundColor:"pink",color:"red"}}>Toplam satış:</span> {totalSales}₺</h1>
        <div className="card" style={{ width: "18rem" }}>
          {klassAkuData.map((item) => (
            <div key={item._id} className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">
                Fiyat: <span style={{ color: "blue" }}>{item.price}</span>{" "}
                <br /> Stok:{" "}
                <span style={{ color: "green" }}>{item.piece}</span>
              </p>
            </div>
          ))}
          <Link
            style={{ display: "block", textAlign: "center" }}
            to="/klassatim"
            className="btn btn-primary"
            onClick={handleSale}
          >
            Satış Yap
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default KlasAku;
