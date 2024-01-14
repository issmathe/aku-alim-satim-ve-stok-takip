// Akaryakit.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Akaryakit = () => {
  const [benzinFiyatlari, setBenzinFiyatlari] = useState(null);

  useEffect(() => {
    const veriCek = async () => {
      try {
        const cevap = await benzinFiyatiAl();
        setBenzinFiyatlari(cevap.result);
      } catch (hata) {
        console.error('Benzin fiyatları alınırken hata oluştu:', hata);
      }
    };

    veriCek();
  }, []);

  const benzinFiyatiAl = async () => {
    const url = 'https://api.collectapi.com/gasPrice/stateUsaPrice?state=WA';
    const anahtar = 'apikey 1pxubcjpiopZ2JHMOrzbkk:6CsZoXgt8F13GjqqpSIRo8'; // Gerçek API anahtarınız ile değiştirin

    try {
      const cevap = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `apikey ${anahtar}`,
        },
        withCredentials: true,
      });

      return cevap.data;
    } catch (hata) {
      throw new Error('Benzin fiyatları alınamadı');
    }
  };

  return (
    <div>
      <h1>Washington'daki Benzin Fiyatları</h1>
      {benzinFiyatlari ? (
        <div>
          <h2>{benzinFiyatlari.state.name}</h2>
          <p>Normal: {benzinFiyatlari.state.regular}</p>
          <p>Orta: {benzinFiyatlari.state.midGrade}</p>
          <p>Premium: {benzinFiyatlari.state.premium}</p>
          <p>Dizel: {benzinFiyatlari.state.diesel}</p>

          <h2>Şehirler</h2>
          {benzinFiyatlari.cities.map(sehir => (
            <div key={sehir.name}>
              <h3>{sehir.name}</h3>
              <p>Normal: {sehir.regular}</p>
              <p>Orta: {sehir.midGrade}</p>
              <p>Premium: {sehir.premium}</p>
              <p>Dizel: {sehir.diesel}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Benzin fiyatları alınıyor...</p>
      )}
    </div>
  );
};

export default Akaryakit;
