import { Link } from "react-router-dom";
import HavaDurumu from "../yardimcilar/HavaDurumu";
import "./header.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Dropdown, Space } from "antd";

//Tailwind


const Header = () => {
  const { loginWithRedirect, logout, isLoading, isAuthenticated } = useAuth0();
  const items = [
    isAuthenticated && {
      key: "1",
      label: (
          <Link to="/akuislemleri">Klas Akü İşlemleri</Link>

      ),
    },
    isAuthenticated && {
      key: "2",
      label: (
          <Link to="/klassatim">Klas Akü Satım İşlemleri</Link>
      ),
    },
  ];
  

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Çıkış yapmak istediğinize emin misiniz?"
    );
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
            <li>
              <Link to="/">ANASAYFA</Link>
            </li>
            <Space direction="vertical">
              <Space wrap>
                <Dropdown
                  menu={{
                    items,
                  }}
                  placement="bottomLeft"
                >
                  <Button>Klas Akü</Button>
                </Dropdown>
              </Space>
            </Space>
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
