import './Modal.css';

export default function Modal({ title, onClose, children }) {
  return (
    <div className="size-guide-modal-overlay" onClick={onClose}>
      <div className="size-guide-modal-box" onClick={(e) => e.stopPropagation()}>
        {title && (
          <div className="modal-header">
            <h3 className="modal-title">{title}</h3>
            <button className="modal-close-btn" onClick={onClose}>
              ✕
            </button>
          </div>
        )}
        {!title && (
          <button className="modal-close-btn absolute-close" onClick={onClose}>
            ✕
          </button>
        )}
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

