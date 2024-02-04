import React, { useState } from "react";
import axios from "axios";

function VartaAkuEkle({ handleAddAkuClick }) {
  const [formData, setFormData] = useState({
    name: "",
    piece: "",
    price: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/api/varta",
        formData
      );
      console.log("Product created:", response.data);
      setSuccessMessage("Kayıt başarılı");
      setFormData({ name: "", piece: 0, price: 0 });
      window.location.reload(); // Sayfayı yenile
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="background">Varta Akü Ürün Ekleme</h2>
          {successMessage && (
            <p className="alert alert-success">{successMessage}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Ürün İsmi:
              </label>
              <select
                className="form-select"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              >
                <option value="" disabled>
                  Ürün İsmi Seçin
                </option>
                {[
                  "74 AH AKÜ",
                  "60 AH EFB",
                  "70 AH EFB",
                  "70 AH AGM",
                  "105 AH AKÜ",
                  "180 AH AKÜ",
                  "240 AH EFB",
                ].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
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

export default VartaAkuEkle;
