import React, { useState, useEffect } from 'react';

function EditForm({ category, onSave, onCancel }) {
  const [editedCategory, setEditedCategory] = useState(category);

  useEffect(() => {
    setEditedCategory(category);
  }, [category]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCategory({ ...editedCategory, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(editedCategory);
  };

  return (
    <div>
      <h3>Varta Akü Stok Bilgisi Güncelleme</h3>
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label>Adet</label>
          <input
            type="number"
            className="form-control"
            name="piece"
            value={editedCategory.piece}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Fiyat</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={editedCategory.price}
            onChange={handleInputChange}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Kaydet
        </button>
        <button className="btn btn-secondary ml-2" onClick={onCancel}>
          İptal
        </button>
      </form>
    </div>
  );
}

export default EditForm;
