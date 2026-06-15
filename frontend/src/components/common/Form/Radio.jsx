import React from 'react';
import './Form.css';

export default function Radio({
  label,
  name,
  checked,
  onChange,
  value,
  disabled = false,
  className = ''
}) {
  return (
    <label className={`radio-container ${disabled ? 'disabled' : ''} ${className}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span className="radio-custom"></span>
      {label && <span className="radio-label">{label}</span>}
    </label>
  );
}
