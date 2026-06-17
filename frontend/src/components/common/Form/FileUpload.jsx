import React, { useRef } from 'react';
import { Trash2 } from 'lucide-react';
import './Form.css';

export default function FileUpload({
  label,
  onChange,
  className = '',
  previewUrl = '',
  required = false,
  disabled = false
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange(file);
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
      {label && (
        <label className="input-label-custom">
          {label} {required && <span className="label-required-star">*</span>}
        </label>
      )}
      <div className="custom-file-upload-wrapper">
        <button
          type="button"
          onClick={() => !disabled && fileInputRef.current && fileInputRef.current.click()}
          className="custom-file-upload-btn"
          disabled={disabled}
        >
          {previewUrl ? 'CHANGE IMAGE' : 'CHOOSE IMAGE FILE'}
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden-file-input"
          required={required && !previewUrl}
          disabled={disabled}
        />
        {previewUrl && (
          <div className="custom-file-preview-container">
            <div className="custom-file-preview-mini">
              <img src={previewUrl} alt="Preview" />
            </div>
            <button
              type="button"
              className="file-remove-btn"
              onClick={() => !disabled && handleRemoveImage()}
              aria-label="Remove image"
              disabled={disabled}
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
