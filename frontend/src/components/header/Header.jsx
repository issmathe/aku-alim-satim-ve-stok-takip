import { Link } from "react-router-dom";
import HavaDurumu from "../yardimcilar/HavaDurumu";
import "./header.css";

const Header = () => {




  return (
    <div>
      <header>
        <div className="logoContainer">
          <HavaDurumu />
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">ANASAYFA</Link>
            </li>
            <li>
              <Link to="/akuislemleri">Klas Akü İşlemleri</Link>
            </li>
            <li>
              <Link to="/klassatım">Klas Akü Satım İşlemleri</Link>
            </li>
          </ul>

        </nav>
        <div className="headerButtonContainer">
          <button className="button buttonPrimary">Kayıt ol</button>
          <button className="button buttonSecondary">Giriş yap</button>
        </div>
      </header>
    </div>
  );
};

export default Header;
