import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";

const VartaSatimGoster = () => {
  const [VartasAkuData, setVartasAkuData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItemId, setEditItemId] = useState("");
  const [editedData, setEditedData] = useState({
    name: "",
    aku: "",
    piece: 0,
    paymentType: "", // Ödeme tipi ekledik
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL + "/api/Varta/kayit"
      );
      setVartasAkuData(response.data);
    } catch (error) {
      console.error("Veri çekiminde hata oluştu:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
    fetchTotalSales();
  }, []);

  const fetchTotalSales = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL + "/api/Varta/kayit/total"
      );
      setTotalSales(response.data.totalSum);
    } catch (error) {
      console.error(
        "Toplam satış verisini çekerken hata oluştu:",
        error.message
      );
    }
  };

  const handleDelete = async (itemId) => {
    try {
      const userConfirmed = window.confirm(
        "Bu öğeyi silmek istediğinizden emin misiniz?"
      );

      if (userConfirmed) {
        await axios.delete(
          `${process.env.REACT_APP_SERVER_URL}/api/Varta/kayit/${itemId}`
        );
        fetchData();
        fetchTotalSales();
      } else {
        console.log("Silme işlemi iptal edildi.");
      }
    } catch (error) {
      console.error("Veri silme hatası:", error.message);
    }
  };

  const handleEdit = (item) => {
    setEditItemId(item._id);
    setEditedData({
      name: item.name,
      aku: item.aku,
      piece: item.piece,
      paymentType: item.paymentType, // Ödeme tipini set ettik
    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api/Varta/kayit/${editItemId}`,
        editedData
      );
      console.log("Güncelleme başarılı:", response.data);
      setShowEditModal(false);
      fetchData();
      fetchTotalSales();
    } catch (error) {
      console.error("Veri güncelleme hatası:", error.message);
    }
  };

  return (
    <Container className="mt-5">
      <h1 style={{ fontSize: "25px" }}>Toplam satış Tutarı: {totalSales}₺</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Satış Tarihi</th>
            <th>Satış Yapılan Kişi Bilgisi</th>
            <th>Akü Çeşidi</th>
            <th>Satış Fiyatı</th>
            <th>Ödeme Tipi</th>
            <th className="text-center">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {VartasAkuData.slice().reverse().map((item) => (
            <tr key={item._id}>
              <td>{new Date(item.createdAt).toLocaleString()}</td>
              <td>{item.name}</td>
              <td>{item.aku}</td>
              <td>{item.piece}</td>
              <td>{item.paymentType}</td>
              <td className="text-center">
                <Button
                  variant="danger"
                  style={{ marginRight: "21px" }}
                  onClick={() => handleDelete(item._id)}
                >
                  Sil
                </Button>
                <Button variant="warning" onClick={() => handleEdit(item)}>
                  Düzenle
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Düzenleme Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Satışı Düzenle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Satış Yapılan Kişi Bilgisi</Form.Label>
              <Form.Control
                type="text"
                placeholder="Satış Yapılan Kişi"
                value={editedData.name}
                onChange={(e) =>
                  setEditedData({ ...editedData, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formAku">
              <Form.Label>Akü Çeşidi</Form.Label>
              <Form.Control
                type="text"
                placeholder="Akü Çeşidi"
                value={editedData.aku}
                onChange={(e) =>
                  setEditedData({ ...editedData, aku: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formPiece">
              <Form.Label>Satış Fiyatı</Form.Label>
              <Form.Control
                type="number"
                placeholder="Satış Fiyatı"
                value={editedData.piece}
                onChange={(e) =>
                  setEditedData({ ...editedData, piece: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formPaymentType">
              <Form.Label>Ödeme Tipi</Form.Label>
              <Form.Control
                as="select"
                value={editedData.paymentType}
                onChange={(e) =>
                  setEditedData({
                    ...editedData,
                    paymentType: e.target.value,
                  })
                }
              >
                <option value="nakit">Nakit</option>
                <option value="visa">Visa</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            İptal
          </Button>
          <Button
            className="text-center"
            variant="primary"
            onClick={handleSaveEdit}
          >
            Kaydet
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default VartaSatimGoster;
