import React from 'react';
import './Form.css';

export default function Checkbox({
  label,
  name,
  checked,
  onChange,
  disabled = false,
  className = ''
}) {
  return (
    <label className={`checkbox-container ${disabled ? 'disabled' : ''} ${className}`}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span className="checkbox-custom"></span>
      {label && <span className="checkbox-label">{label}</span>}
    </label>
  );
}
