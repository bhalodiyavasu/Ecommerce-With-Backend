import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Drawer.css';

export default function Drawer({
  isOpen,
  onClose,
  title,
  position = 'left',
  children,
  className = ''
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return createPortal(
    <>
      <div className={`common-drawer ${position} ${isOpen ? 'open' : ''} ${className}`}>
        <div className="drawer-header-row">
          <span className="drawer-title-text">{title || ''}</span>
          <button 
            className="drawer-close-btn-common" 
            onClick={onClose} 
            aria-label="Close Menu"
          >
            ✕
          </button>
        </div>
        <div className="drawer-content-common">
          {children}
        </div>
      </div>
      {isOpen && <div className="drawer-overlay-common" onClick={onClose}></div>}
    </>,
    document.body
  );
}
