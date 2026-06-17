import React from 'react';
import './Form.css';

export default function Input({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  className = ''
}) {
  return (
    <div className={`form-input-group-custom ${className}`}>
      {label && (
        <label className="input-label-custom">
          {label} {required && <span className="label-required-star">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
    </div>
  );
}
