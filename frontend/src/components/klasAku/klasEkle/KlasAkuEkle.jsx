// KlasAkuEkle.js

import React, { useState } from "react";
import axios from "axios";

function KlasAkuEkle({ handleAddAkuClick }) {
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    piece: 0,
    price: 0,
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/api/klas",
        formData
      );
      console.log("Product created:", response.data);
      setSuccessMessage("Kayıt başarılı");
      setFormData({ title: "", name: "", piece: 0, price: 0 });
      window.location.reload(); // Sayfayı yenile
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div  className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="background">Klas Akü Ürün Ekleme</h2>
          {successMessage && (
            <p className="alert alert-success">{successMessage}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Başlık:
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Başlık"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Ürün İsmi:
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Ürün İsmi"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="piece" className="form-label">
                Ürün Adet:
              </label>
              <input
                type="number"
                className="form-control"
                id="piece"
                placeholder="Ürün Adet"
                value={formData.piece}
                onChange={(e) =>
                  setFormData({ ...formData, piece: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Ürün Fiyatı:
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                placeholder="Ürün Fiyatı"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>
            <div className="d-flex justify-content-center mt-2">
              <button type="submit" className="btn btn-success">
                Ekle
              </button>
              <span style={{ width: "10px" }}></span>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleAddAkuClick()}
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default KlasAkuEkle;
