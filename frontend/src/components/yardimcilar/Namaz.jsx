// Namaz.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Namaz = () => {
  const [namazVakitleri, setNamazVakitleri] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://ezanvakti.herokuapp.com/vakitler?ilce=9370');

        setNamazVakitleri(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Namaz vakitleri getirilemedi', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get the current date
  const currentDate = new Date().toLocaleDateString();

  // Filter namazVakitleri for the current date
  const todayNamazVakitleri = namazVakitleri.find((vakit) => vakit.MiladiTarihKisa === currentDate);

  return (
    <div>
      {/* <h2>Namaz Vakitleri</h2> */}
      {loading ? (
        <p>Veriler yükleniyor...</p>
      ) : (
        <ul>
          <li>Sabah : {todayNamazVakitleri.Gunes}</li>
          <li>Öğle : {todayNamazVakitleri.Ogle}</li>
          <li>İkindi : {todayNamazVakitleri.Ikindi}</li>
          <li>Akşam : {todayNamazVakitleri.Aksam}</li>
          <li>Yatsı : {todayNamazVakitleri.Yatsi}</li>
        </ul>
      )}
    </div>
  );
};

export default Namaz;
