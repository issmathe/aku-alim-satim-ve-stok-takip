import { Link } from "react-router-dom";
import HavaDurumu from "../yardimcilar/HavaDurumu";
import "./header.css";
import { useAuth0 } from "@auth0/auth0-react";
import Namaz from "../yardimcilar/Namaz";

const Header = () => {
  const { loginWithRedirect, logout, isLoading, isAuthenticated } = useAuth0();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Çıkış yapmak istediğinize emin misiniz?");
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
        <div>
          <Namaz/>
        </div>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">ANASAYFA</Link>
            </li>
            {isAuthenticated && (
              <>
                <li>
                  <Link to="/akuislemleri">Klas Akü İşlemleri</Link>
                </li>
                <li>
                  <Link to="/klassatim">Klas Akü Satım İşlemleri</Link>
                </li>
              </>
            )}
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
            <button
              onClick={loginWithRedirect}
              className="btn btn-primary"
            >
              Giriş Yap
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
