import React from 'react';
import './Modal.css';

export default function Modal({ title, onClose, children }) {
  return (
    <div className="common-modal-overlay" onClick={onClose}>
      <div className="common-modal-box" onClick={(e) => e.stopPropagation()}>
        {title && (
          <div className="common-modal-header">
            <h3 className="common-modal-title">{title}</h3>
            <button className="common-modal-close-btn" onClick={onClose}>
              ✕
            </button>
          </div>
        )}
        {!title && (
          <button className="common-modal-close-btn absolute-close" onClick={onClose}>
            ✕
          </button>
        )}
        <div className="common-modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}
