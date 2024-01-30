import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button } from "react-bootstrap";

const Veresiye = () => {
  const [veresiyeData, setVeresiyeData] = useState([]);

  useEffect(() => {
    const fetchVeresiyeData = async () => {
      try {
        const responses = await Promise.all([
          axios.get(`${process.env.REACT_APP_SERVER_URL}/api/klas/kayit`),
          axios.get(`${process.env.REACT_APP_SERVER_URL}/api/mutlu/kayit`),
          axios.get(`${process.env.REACT_APP_SERVER_URL}/api/inci/kayit`),
          axios.get(`${process.env.REACT_APP_SERVER_URL}/api/varta/kayit`),
          axios.get(`${process.env.REACT_APP_SERVER_URL}/api/kraft/kayit`),
          axios.get(`${process.env.REACT_APP_SERVER_URL}/api/duracel/kayit`)
        ]);

        const veresiyeRecords = responses
          .flatMap((response) => response.data)
          .filter((item) => item.paymentType === "veresiye");

        setVeresiyeData(veresiyeRecords);
      } catch (error) {
        console.error("Veri çekiminde hata oluştu:", error.message);
      }
    };

    fetchVeresiyeData();
  }, []);

  const markAsPaid = async (id) => {
    try {
      const confirmPayment = window.confirm("Ödendi olarak işaretle?");
      window.location.reload(); // Doğru kullanım
      if (confirmPayment) {
        const updateRequests = [
          axios.put(`${process.env.REACT_APP_SERVER_URL}/api/klas/kayit/${id}`, { paymentType: "nakit" }),
          axios.put(`${process.env.REACT_APP_SERVER_URL}/api/mutlu/kayit/${id}`, { paymentType: "nakit" }),
          axios.put(`${process.env.REACT_APP_SERVER_URL}/api/inci/kayit/${id}`, { paymentType: "nakit" }),
          axios.put(`${process.env.REACT_APP_SERVER_URL}/api/varta/kayit/${id}`, { paymentType: "nakit" }),
          axios.put(`${process.env.REACT_APP_SERVER_URL}/api/kraft/kayit/${id}`, { paymentType: "nakit" }),
          axios.put(`${process.env.REACT_APP_SERVER_URL}/api/duracel/kayit/${id}`, { paymentType: "nakit" }),
        ];
        
        await Promise.all(updateRequests);

        setVeresiyeData((prevData) =>
          prevData.map((item) =>
            item._id === id ? { ...item, paymentType: "nakit" } : item
          )
          
        );
        window.location.reload(); // Doğru kullanım

      } else {
        console.log("İşlem iptal edildi.");
      }

    } catch (error) {
      console.error("Ödeme işleminde hata oluştu:", error.message);
    }
    
  };

  return (
    <Container className="mt-5">
      <h1 style={{ fontSize: "25px" }}>Veresiye Listesi</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Satış Tarihi</th>
            <th>Satış Yapılan Kişi Bilgisi</th>
            <th>Akü Çeşidi</th>
            <th>Satış Fiyatı</th>
            <th className="text-center">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {veresiyeData.slice().reverse().map((item) => (
            <tr key={item._id}>
              <td>{new Date(item.createdAt).toLocaleString()}</td>
              <td>{item.name}</td>
              <td>{item.aku}</td>
              <td>{item.piece}</td>
              <td className="text-center">
                <Button variant="danger" onClick={() => markAsPaid(item._id)}>
                  Ödendi İşaretle
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Veresiye;
