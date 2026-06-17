import React, { useRef } from 'react';
import { Trash2 } from 'lucide-react';
import './Form.css';

export default function FileUpload({
  label,
  onChange,
  className = '',
  previewUrl = ''
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result); // Puts base64 data URL back to parent
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`form-input-group-custom ${className}`}>
      {label && <label className="input-label-custom">{label}</label>}
      <div className="custom-file-upload-wrapper">
        <button
          type="button"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          className="custom-file-upload-btn"
        >
          {previewUrl ? 'CHANGE IMAGE' : 'CHOOSE IMAGE FILE'}
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden-file-input"
        />
        {previewUrl && (
          <div className="custom-file-preview-container">
            <div className="custom-file-preview-mini">
              <img src={previewUrl} alt="Preview" />
            </div>
            <button
              type="button"
              className="file-remove-btn"
              onClick={handleRemoveImage}
              aria-label="Remove image"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
