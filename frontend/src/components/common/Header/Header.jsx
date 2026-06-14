import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoIcon from '@/assets/icons/logo.svg';
import cartIcon from '@/assets/icons/cart.svg';
import profileIcon from '@/assets/icons/profile.svg';
import './Header.css';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const isCollections = location.pathname === '/collections';

  const handleProfileClick = () => {
    const session = localStorage.getItem('xiv_user_session');
    if (session) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-left">
          <nav className="nav-links">
            <Link to="/" className={`nav-link ${isHome ? 'active' : ''}`}>HOME</Link>
            <Link to="/collections" className={`nav-link ${isCollections ? 'active' : ''}`}>COLLECTIONS</Link>
            <Link to="/#new" className="nav-link">NEW</Link>
          </nav>
        </div>

        <div className="header-center">
          <Link to="/" className="logo-container" aria-label="Home">
            <img src={logoIcon} className="logo-img" alt="XIV Logo" />
          </Link>
        </div>

        <div className="header-right">
          <Link to="/cart" className="cart-badge-group" style={{ textDecoration: 'none' }}>
            <div className="circular-btn cart-btn" aria-label="Cart">
              <img src={cartIcon} alt="" className="dark-icon" />
            </div>
            <div className="cart-badge-pill">3</div>
          </Link>
          
          <button 
            className="circular-btn profile-btn" 
            aria-label="Profile" 
            onClick={handleProfileClick}
          >
            <img src={profileIcon} alt="" className="inverted-icon" />
          </button>
        </div>
      </div>
    </header>
  );
}

