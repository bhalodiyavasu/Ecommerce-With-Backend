import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem('adminSessionTime', Date.now().toString());
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="admin-login-wrapper">
      <form className="admin-login-box" onSubmit={handleSubmit}>
        <h2 className="admin-login-title">ADMIN LOGIN</h2>
        {error && <p className="admin-login-error">{error}</p>}
        <input
          className="admin-login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="admin-login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="admin-login-btn" type="submit">LOGIN</button>
      </form>
    </div>
  );
}
