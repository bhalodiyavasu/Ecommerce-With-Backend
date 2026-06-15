import React, { useRef, useEffect } from 'react';
import './Form.css';

export default function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  className = '',
  rows = 2
}) {
  const textareaRef = useRef(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      // Calculate max height for 6 rows
      // 13px font size with 1.5 line height = 19.5px per row.
      // Padding top + bottom = 20px.
      const rowHeight = 19.5;
      const padding = 20;
      const maxHeight = 6 * rowHeight + padding;

      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = `${newHeight}px`;

      if (textarea.scrollHeight > maxHeight) {
        textarea.style.overflowY = 'auto';
      } else {
        textarea.style.overflowY = 'hidden';
      }
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <div className={`form-input-group-custom ${className}`}>
      {label && <label className="input-label-custom">{label}</label>}
      <textarea
        ref={textareaRef}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className="form-textarea-custom"
        style={{
          resize: 'none',
          overflowY: 'hidden',
          lineHeight: '1.5',
          boxSizing: 'border-box'
        }}
      />
    </div>
  );
}
