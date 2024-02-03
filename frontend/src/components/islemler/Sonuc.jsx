// Sonuc.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'antd';

const { Meta } = Card;

const Sonuc = () => {
  const [akuAdet, setAkuAdet] = useState([]);
  
  const fetchAkuAdet = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/klas/kayit`);
      setAkuAdet(response.data);
    } catch (error) {
      console.error('Veri getirme hatası:', error);
    }
  };

  useEffect(() => {
    fetchAkuAdet();
  }, []);

  // Her bir akü türü için adetleri saymak için bir fonksiyon
  const countAdet = (akuTur) => {
    return akuAdet.filter(item => item.aku === akuTur).length;
  };

  const akuTurleri = [
    'KLAS 60 AH AKÜ',
    'KLAS 60 AH DAR',
    'KLAS 70 AH EFB',
    'KLAS 72 AH AKÜ',
    'KLAS 90 AH AKÜ',
    'KLAS 100 AH AKÜ',
    'KLAS 105 AH AKÜ',
    'KLAS 135 AH AKÜ',
    'KLAS 150 AH AKÜ',
    'KLAS 180 AH AKÜ',
    'KLAS 225 AH AKÜ',
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center',color:"blue", }}>Toplam Satılan Klas Akü Adeti: {akuAdet.length}</h2>
      <div style={{ backgroundColor:"pink",display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {akuTurleri.map((akuTur, index) => (
          <Card
            key={index}
            style={{backgroundColor:"yellow", width: 200, margin: 20, color: 'red' }}
            // veya className kullanarak
            // className="custom-card-style"
          >
            <Meta
              title={` ${akuTur}`}
              description={<span style={{ color: 'blue', textAlign: 'center', display: 'block' }}>{countAdet(akuTur)}</span>}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Sonuc;
