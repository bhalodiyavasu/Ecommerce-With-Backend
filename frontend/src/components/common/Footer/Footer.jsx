import React from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@/contexts/ToastContext';
import './Footer.css';

export default function Footer() {
  const { showToast } = useToast();

  return (
    <footer className="footer">
      <div className="footer-top-border"></div>
      
      <div className="footer-container">
        <div className="footer-section info-section">
          <h4 className="footer-col-title">INFO</h4>
          <div className="footer-col-links vertical-links">
            <Link to="/pricing" className="footer-link">PRICING <span className="slash">/</span></Link>
            <Link to="/about" className="footer-link">ABOUT <span className="slash">/</span></Link>
            <Link to="/contacts" className="footer-link">CONTACTS <span className="slash">/</span></Link>
          </div>
        </div>

        <div className="footer-section languages-section">
          <h4 className="footer-col-title">LANGUAGES</h4>
          <div className="footer-col-links row-links">
            <Link to="#eng" className="footer-link active-lang">ENG <span className="slash">/</span></Link>
            <Link to="#esp" className="footer-link">ESP <span className="slash">/</span></Link>
            <Link to="#sve" className="footer-link">SVE</Link>
          </div>
        </div>
      </div>

      <div className="footer-watermark">Ecommerce</div>

      {/* Temporary Toast Test Buttons */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', padding: '20px', borderTop: '1px solid var(--color-border-light)', flexWrap: 'wrap' }}>
        <button onClick={() => showToast('success', 'This is a success message!')} style={{ padding: '8px 16px', cursor: 'pointer', border: '1px solid var(--color-black)', background: 'var(--color-white)', color: 'var(--color-black)' }}>TEST SUCCESS</button>
        <button onClick={() => showToast('error', 'This is an error message!')} style={{ padding: '8px 16px', cursor: 'pointer', border: '1px solid var(--color-black)', background: 'var(--color-white)', color: 'var(--color-black)' }}>TEST ERROR</button>
        <button onClick={() => showToast('info', 'This is an info message!')} style={{ padding: '8px 16px', cursor: 'pointer', border: '1px solid var(--color-black)', background: 'var(--color-white)', color: 'var(--color-black)' }}>TEST INFO</button>
        <button onClick={() => showToast('warning', 'This is a warning message!')} style={{ padding: '8px 16px', cursor: 'pointer', border: '1px solid var(--color-black)', background: 'var(--color-white)', color: 'var(--color-black)' }}>TEST WARNING</button>
      </div>
    </footer>
  );
}

