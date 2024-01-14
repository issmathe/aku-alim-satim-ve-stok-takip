import React, { useState, useEffect } from "react";
import axios from "axios";

function KlasSatimForm() {
  const [klassAkuData, setKlassAkuData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL + "/api"
      );
      setKlassAkuData(response.data);
    } catch (error) {
      console.error("Veri çekiminde hata oluştu:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    aku: "",
    name: "",
    piece: 0,
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const existingAku = klassAkuData.find((item) => item.name === formData.aku);
    try {
      const response = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/api/kayit",
        formData
      );
      console.log("Category created:", response.data);
      setSuccessMessage("Kayıt başarılı");
      setFormData({ aku: "", name: "", piece: 0 }); // Form verilerini sıfırla

      await axios.put(`http://localhost:5000/api/${existingAku._id}`, {
        piece: existingAku.piece - 1,
      });

      window.location.reload(); // Sayfayı yeniden yükle
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
        <h2 class="text-center background">Klas Akü Satım İşlemleri</h2>

          {successMessage && (
            <p className="alert alert-success">{successMessage}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <select
                className="form-select mt-3"
                value={formData.aku}
                onChange={(e) =>
                  setFormData({ ...formData, aku: e.target.value })
                }
              >
                <option value="" disabled>
                  Sattığınız akü çeşidini seçin
                </option>
                {klassAkuData.map((item) => (
                  <option key={item._id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Alıcı İsim Soyisim:
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
                Satiş Fiyatı:
              </label>
              <input
                type="number"
                className="form-control"
                id="piece"
                placeholder="Ürün Fiyatı"
                value={formData.piece}
                onChange={(e) =>
                  setFormData({ ...formData, piece: e.target.value })
                }
              />
            </div>
            <button type="submit" class="btn btn-primary d-block mx-auto">
              Kaydet
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default KlasSatimForm;
