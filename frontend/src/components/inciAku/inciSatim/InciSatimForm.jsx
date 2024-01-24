import React, { useState, useEffect } from "react";
import axios from "axios";

function InciSatimForm() {
  const [IncisAkuData, setIncisAkuData] = useState([]);
  const [formData, setFormData] = useState({
    aku: "",
    name: "",
    piece: 0,
    paymentType: "nakit", // Varsayılan olarak nakit seçili
  });
  const [successMessage, setSuccessMessage] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL + "/api/inci"
      );
      setIncisAkuData(response.data);
    } catch (error) {
      console.error("Veri çekiminde hata oluştu:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const existingAku = IncisAkuData.find((item) => item.name === formData.aku);

    try {
      const response = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/api/inci/kayit",
        formData
      );

      console.log("Kategori oluşturuldu:", response.data);
      setSuccessMessage("Kayıt başarılı");
      setFormData({
        aku: "",
        name: "",
        piece: 0,
        paymentType: "nakit",
      });

      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api/inci/${existingAku._id}`,
        {
          piece: existingAku.piece - 1,
        }
      );

      window.location.reload(); // Sayfayı yeniden yükle
    } catch (error) {
      console.error("Kategori oluşturulurken hata:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center background">Inci Akü Satım İşlemleri</h2>

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
                {IncisAkuData.map((item) => (
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
                placeholder="Alıcı İsim Soyisim"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label htmlFor="piece" className="form-label">
                Satış Fiyatı:
              </label>
              <input
                type="number"
                className="form-control"
                id="piece"
                placeholder="Satış Fiyatı"
                value={formData.piece}
                onChange={(e) =>
                  setFormData({ ...formData, piece: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label htmlFor="paymentType" className="form-label">
                Ödeme Türü:
              </label>
              <select
                className="form-select"
                id="paymentType"
                value={formData.paymentType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    paymentType: e.target.value,
                  })
                }
              >
                <option value="nakit">Nakit</option>
                <option value="visa">Visa</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary d-block mx-auto">
              Kaydet
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InciSatimForm;
