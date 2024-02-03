import React from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Space } from "antd";
import HavaDurumu from "../yardimcilar/HavaDurumu";
import "./header.css";

const Header = () => {

  const createDropdown = (menuItems, buttonText) => (
    <Space direction="vertical">
      <Space wrap>
        <Dropdown menu={{ items: menuItems }} placement="bottomLeft">
          <Button className="text-center btn dangerbtn btn-success">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              {buttonText}
            </div>
          </Button>
        </Dropdown>
      </Space>
    </Space>
  );
  const klasAkuItems = [
    { key: "1", label: <Link to="/klasAkuIslemleri">Klas Akü İşlemleri</Link> },
    {
      key: "2",
      label: <Link to="/klasAkuSatim">Klas Akü Satım İşlemleri</Link>,
    },
  ];

  const mutluAkuItems = [
    {
      key: "1",
      label: <Link to="/mutluAkuIslemleri">Mutlu Akü İşlemleri</Link>,
    },
    {
      key: "2",
      label: <Link to="/mutluAkuSatim">Mutlu Akü Satım İşlemleri</Link>,
    },
  ];

  const inciAkuItems = [
    { key: "1", label: <Link to="/inciAkuIslemleri">İnci Akü İşlemleri</Link> },
    {
      key: "2",
      label: <Link to="/inciAkuSatim">İnci Akü Satım İşlemleri</Link>,
    },
  ];

  const vartaAkuItems = [
    {
      key: "1",
      label: <Link to="/vartaAkuIslemleri">Varta Akü İşlemleri</Link>,
    },
    {
      key: "2",
      label: <Link to="/vartaAkuSatim">Varta Akü Satım İşlemleri</Link>,
    },
  ];

  const kraftAkuItems = [
    {
      key: "1",
      label: <Link to="/kraftAkuIslemleri">Kraft Akü İşlemleri</Link>,
    },
    {
      key: "2",
      label: <Link to="/kraftAkuSatim">Kraft Akü Satım İşlemleri</Link>,
    },
  ];

  const duracelAkuItems = [
    {
      key: "1",
      label: <Link to="/duracelAkuIslemleri">Duracel Akü İşlemleri</Link>,
    },
    {
      key: "2",
      label: <Link to="/duracelAkuSatim">Duracel Akü Satım İşlemleri</Link>,
    },
  ];
  const islemler = [
    { key: "1", label: <Link to="/veresiye">Veresiye Listem</Link> },
    { key: "2", label: <Link to="/sonuc">Akü İstatistik</Link> },
  ];


  return (
    <div>
      <header className="header" style={{ height: "80px" }}>
        <div className="d-flex">
          <div className="logoContainer">
            <HavaDurumu />
          </div>
        </div>
        <nav>
          <ul>
            <li
              style={{
                paddingTop: "2px",
                marginTop: "1px",
                border: "1px solid white",
                borderRadius: "3px",
              }}
            >
              <Link to="/">ANASAYFA</Link>
            </li>
            <li>{createDropdown(klasAkuItems, "Klas Akü")}</li>
            <li>{createDropdown(mutluAkuItems, "Mutlu Akü")}</li>
            <li>{createDropdown(inciAkuItems, "İnci Akü")}</li>
            <li>{createDropdown(vartaAkuItems, "Varta Akü")}</li>
            <li>{createDropdown(kraftAkuItems, "Kraft Akü")}</li>
            <li>{createDropdown(duracelAkuItems, "Duracel Akü")}</li>
            <li>{createDropdown(islemler, "İşlemler")}</li>
          </ul>
        </nav>
        <div>
        <button className="btn btn-primary">
              Giriş Yap
            </button>
        </div>
      </header>
    </div>
  );
};

export default Header;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth0 } from '@auth0/auth0-react';
// import { Button, Dropdown, Space } from 'antd';
// import HavaDurumu from '../yardimcilar/HavaDurumu';
// import './header.css';

// const Header = () => {
//   const { loginWithRedirect, logout, isLoading, isAuthenticated } = useAuth0();

//   const createDropdown = (menuItems, buttonText) => (
//     <Space direction="vertical">
//       <Space wrap>
//         <Dropdown menu={{ items: menuItems }} placement="bottomLeft">
//           <Button className="text-center btn dangerbtn btn-success">
//             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
//               {buttonText}
//             </div>
//           </Button>
//         </Dropdown>
//       </Space>
//     </Space>
//   );

//   const klasAkuItems = [
//     isAuthenticated && {
//       key: '1',
//       label: <Link to="/klasAkuIslemleri">Klas Akü İşlemleri</Link>,
//     },
//     isAuthenticated && {
//       key: '2',
//       label: <Link to="/klasAkuSatim">Klas Akü Satım İşlemleri</Link>,
//     },
//   ];

//   const mutluAkuItems = [
//     isAuthenticated && {
//       key: '1',
//       label: <Link to="/mutluAkuIslemleri">Mutlu Akü İşlemleri</Link>,
//     },
//     isAuthenticated && {
//       key: '2',
//       label: <Link to="/mutluAkuSatim">Mutlu Akü Satım İşlemleri</Link>,
//     }
//   ];

//   const inciAkuItems = [
//     isAuthenticated && {
//       key: '1',
//       label: <Link to="/inciAkuIslemleri">İnci Akü İşlemleri</Link>,
//     },
//     isAuthenticated && {
//       key: '2',
//       label: <Link to="/inciAkuSatim">İnci Akü Satım İşlemleri</Link>,
//     }
//   ];

//   const vartaAkuItems = [
//     isAuthenticated && {
//       key: '1',
//       label: <Link to="/vartaAkuIslemleri">Varta Akü İşlemleri</Link>,
//     },
//     isAuthenticated && {
//       key: '2',
//       label: <Link to="/vartaAkuSatim">Varta Akü Satım İşlemleri</Link>,
//     }
//   ];

//   const kraftAkuItems = [
//     isAuthenticated && {
//       key: '1',
//       label: <Link to="/kraftAkuIslemleri">Kraft Akü İşlemleri</Link>,
//     },
//     isAuthenticated && {
//       key: '2',
//       label: <Link to="/kraftAkuSatim">Kraft Akü Satım İşlemleri</Link>,
//     }
//   ];

//   const islemler = [
//     isAuthenticated && {
//       key: '1',
//       label: <Link to="/veresiye">Veresiye Listem</Link>,
//     },
//     isAuthenticated && {
//       key: '2',
//       label: <Link to="/">İstatistik</Link>,
//     }
//   ];

//   const duracelAkuItems = [
//     isAuthenticated && {
//       key: '1',
//       label: <Link to="/duracelAkuIslemleri">Duracel Akü İşlemleri</Link>,
//     },
//     isAuthenticated && {
//       key: '2',
//       label: <Link to="/duracelAkuSatim">Duracel Akü Satım İşlemleri</Link>,
//     }
//   ];

//   const handleLogout = () => {
//     const confirmLogout = window.confirm('Çıkış yapmak istediğinize emin misiniz?');
//     if (confirmLogout) {
//       logout();
//     }
//   };

//   return (
//     <div>
//       <header className="header" style={{height:"80px"}}>
//         <div className="d-flex">
//           <div className="logoContainer">
//             <HavaDurumu />
//           </div>
//         </div>
//         <nav>
//           <ul>
//             <li style={{ paddingTop: "2px", marginTop: "1px", border: "1px solid white", borderRadius: "3px" }}>
//               <Link to="/">ANASAYFA</Link>
//             </li>
//             <li>
//               {createDropdown(klasAkuItems, 'Klas Akü')}
//             </li>
//             <li>
//               {createDropdown(mutluAkuItems, 'Mutlu Akü')}
//             </li>
//             <li>
//               {createDropdown(inciAkuItems, 'İnci Akü')}
//             </li>
//             <li>
//               {createDropdown(vartaAkuItems, 'Varta Akü')}
//             </li>
//             <li>
//               {createDropdown(kraftAkuItems, 'Kraft Akü')}
//             </li>
//             <li>
//               {createDropdown(duracelAkuItems, 'Duracel Akü')}
//             </li>
//             <li>
//               {createDropdown(islemler, 'İşlemler')}
//             </li>
//           </ul>
//         </nav>
//         <div>
//           {isLoading ? (
//             <p>Loading...</p>
//           ) : isAuthenticated ? (
//             <button onClick={handleLogout} className="btn btn-danger">
//               Çıkış Yap
//             </button>
//           ) : (
//             <button onClick={loginWithRedirect} className="btn btn-primary">
//               Giriş Yap
//             </button>
//           )}
//         </div>
//       </header>
//     </div>
//   );
// };

// export default Header;
