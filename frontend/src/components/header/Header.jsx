import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Dropdown, Space } from 'antd';
import HavaDurumu from '../yardimcilar/HavaDurumu';
import './header.css';

const Header = () => {
  const { loginWithRedirect, logout, isLoading, isAuthenticated } = useAuth0();

  const klasAkuItems = [
    isAuthenticated && {
      key: '1',
      label: <Link to="/akuislemleri">Klas Akü İşlemleri</Link>,
    },
    isAuthenticated && {
      key: '2',
      label: <Link to="/klassatim">Klas Akü Satım İşlemleri</Link>,
    },
  ];

  const mutluAkuItems = [
    isAuthenticated && {
      key: '1',
      label: <Link to="/mutluaku">Mutlu Akü İşlemleri</Link>,
    },
    isAuthenticated && {
      key: '2',
      label: <Link to="/mutluaku/islem1">Mutlu Akü Satım İşlemleri</Link>,
    }
  ];

  const inciAkuItems = [
    isAuthenticated && {
      key: '1',
      label: <Link to="/mutluaku">İnci Akü İşlemleri</Link>,
    },
    isAuthenticated && {
      key: '2',
      label: <Link to="/mutluaku/islem1">İnci Akü Satım İşlemleri</Link>,
    }
  ];
  const vartaAkuItems = [
    isAuthenticated && {
      key: '1',
      label: <Link to="/mutluaku">Varta Akü İşlemleri</Link>,
    },
    isAuthenticated && {
      key: '2',
      label: <Link to="/mutluaku/islem1">Varta Akü Satım İşlemleri</Link>,
    }
  ];
  const kraftAkuItems = [
    isAuthenticated && {
      key: '1',
      label: <Link to="/mutluaku">Kraft Akü İşlemleri</Link>,
    },
    isAuthenticated && {
      key: '2',
      label: <Link to="/mutluaku/islem1">Kraft Akü Satım İşlemleri</Link>,
    }
  ];
  const handleLogout = () => {
    const confirmLogout = window.confirm('Çıkış yapmak istediğinize emin misiniz?');
    if (confirmLogout) {
      logout();
    }
  };

  return (
    <div>
      <header>
        <div className="d-flex">
          <div className="logoContainer">
            <HavaDurumu />
          </div>
        </div>
        <nav>
          <ul>
            <li style={{ paddingTop: "2px", marginTop: "1px", border: "1px solid white", borderRadius: "3px" }}>
              <Link to="/">ANASAYFA</Link>
            </li>
            <li>
              <Space direction="vertical">
                <Space wrap>
                  <Dropdown menu={{ items: klasAkuItems }} placement="bottomLeft">
                    <Button className="text-center btn dangerbtn btn-success">
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        Klas Akü
                      </div>
                    </Button>
                  </Dropdown>
                </Space>
              </Space>
            </li>
            <li>
              <Space direction="vertical">
                <Space wrap>
                  <Dropdown menu={{ items: mutluAkuItems }} placement="bottomLeft">
                    <Button className="text-center btn dangerbtn btn-success">
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        Mutlu Akü
                      </div>
                    </Button>
                  </Dropdown>
                </Space>
              </Space>
            </li>
            <li>
              <Space direction="vertical">
                <Space wrap>
                  <Dropdown menu={{ items: inciAkuItems }} placement="bottomLeft">
                    <Button className="text-center btn dangerbtn btn-success">
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        İnci Akü
                      </div>
                    </Button>
                  </Dropdown>
                </Space>
              </Space>
            </li>
            <li>
              <Space direction="vertical">
                <Space wrap>
                  <Dropdown menu={{ items: vartaAkuItems }} placement="bottomLeft">
                    <Button className="text-center btn dangerbtn btn-success">
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        Varta Akü
                      </div>
                    </Button>
                  </Dropdown>
                </Space>
              </Space>
            </li>
            <li>
              <Space direction="vertical">
                <Space wrap>
                  <Dropdown menu={{ items: kraftAkuItems }} placement="bottomLeft">
                    <Button className="text-center btn dangerbtn btn-success">
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      Kraft Akü
                      </div>
                    </Button>
                  </Dropdown>
                </Space>
              </Space>
            </li>
          </ul>
        </nav>
        <div>
          {isLoading ? (
            <p>Loading...</p>
          ) : isAuthenticated ? (
            <button onClick={handleLogout} className="btn btn-danger">
              Çıkış Yap
            </button>
          ) : (
            <button onClick={loginWithRedirect} className="btn btn-primary">
              Giriş Yap
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
