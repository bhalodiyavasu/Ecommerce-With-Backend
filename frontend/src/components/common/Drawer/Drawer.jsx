import React from 'react';
import './Drawer.css';

export default function Drawer({
  isOpen,
  onClose,
  title,
  position = 'left',
  children,
  className = ''
}) {
  return (
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
    </>
  );
}
