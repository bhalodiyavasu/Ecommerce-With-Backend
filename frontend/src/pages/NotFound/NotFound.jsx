import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button/Button';
import './NotFound.css';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">PAGE NOT FOUND</h2>
        <p className="not-found-message">
          THE LINK YOU FOLLOWED MAY BE BROKEN OR THE PAGE MAY HAVE BEEN REMOVED.
        </p>
        <div className="not-found-actions">
          <Button variant="solid" onClick={() => navigate('/')}>
            RETURN TO HOME
          </Button>
          <Button variant="outline" onClick={() => navigate('/collections')}>
            BROWSE COLLECTIONS
          </Button>
        </div>
      </div>
    </div>
  );
}
