import React, { useState, useRef, useEffect } from 'react';
import './Form.css';

export default function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  disabled = false,
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectOption = (val) => {
    if (disabled) return;
    onChange({
      target: {
        name,
        value: val
      }
    });
    setIsOpen(false);
  };

  return (
    <div className={`form-input-group-custom ${className}`} ref={selectRef}>
      {label && <label className="input-label-custom">{label}</label>}
      <div className={`select-wrapper-custom ${disabled ? 'disabled' : ''}`}>
        <button
          type="button"
          className="custom-select-trigger"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <span>{selectedOption ? selectedOption.label : ''}</span>
          <span className={`select-caret-custom ${isOpen ? 'open' : ''}`}></span>
        </button>

        {isOpen && (
          <div className="custom-select-options-menu">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`custom-select-option-item ${opt.value === value ? 'selected' : ''}`}
                onClick={() => handleSelectOption(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
