import React, { useState, useEffect } from "react";
import axios from "axios";
import MutluDuzenleme from "../mutluEkle/MutluDuzenleme";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import MutluAkuEkle from "./MutluAkuEkle";

const MutluGoster = () => {
  const [MutlusAkuData, setMutlusAkuData] = useState([]);
  const [editCategory, setEditCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/mutlu`);
      setMutlusAkuData(response.data);
    } catch (error) {
      console.error("Veri çekiminde hata oluştu:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (itemId) => {
    try {
      const userConfirmed = window.confirm("Bu öğeyi silmek istediğinizden emin misiniz?");
      if (userConfirmed) {
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/mutlu/${itemId}`);
        fetchData();
      } else {
        console.log("Silme işlemi iptal edildi.");
      }
    } catch (error) {
      console.error("Veri silme hatası:", error.message);
    }
  };

  const handleEdit = (category) => {
    setEditCategory(category);
  };

  const handleCancelEdit = () => {
    setEditCategory(null);
  };

  const handleSaveEdit = async (editedCategory) => {
    try {
      await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/mutlu/${editedCategory._id}`, editedCategory);
      setEditCategory(null);
      fetchData();
    } catch (error) {
      console.error("Kategori güncelleme hatası:", error);
    }
  };

  const handleAddAkuClick = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="container mt-5">
      <h1 style={{ fontSize: "30px" }} className="text-center">Mutlu Akü Stok Bilgisi</h1>
      <ListGroup>
        {MutlusAkuData.map((item) => (
          <ListGroupItem
            key={item._id}
            className="d-flex justify-content-between align-items-center"
          >
            <div>
              <p style={{ color: "green" }}>{item.name} </p>
              <p>
                Adet: <span style={{ color: "red" }}>{item.piece}</span>
              </p>
              <p>
                Akü Fiyat: <span style={{ color: "red" }}>{item.price}</span>
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }} >
              <Button
                variant="primary"
                className="ml-2"
                onClick={() => handleEdit(item)}
              >
                Düzenle
              </Button>
              <Button
                variant="danger"
                className="ml-2"
                onClick={() => handleDelete(item._id)}
              >
                Sil
              </Button>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
      {editCategory && (
        <MutluDuzenleme
          category={editCategory}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
      <br />
      <div className="d-flex justify-content-center">
        {showForm ? (
          <MutluAkuEkle handleAddAkuClick={handleAddAkuClick} />
        ) : (
          <button
            className="btn btn-success"
            onClick={handleAddAkuClick}
          >
            Akü Ekle
          </button>
        )}
      </div>
    </div>
  );
};

export default MutluGoster;
