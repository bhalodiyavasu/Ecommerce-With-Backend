import React, { useState, useRef, useEffect } from 'react';
import './Form.css';

export default function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  disabled = false,
  className = '',
  placeholder = 'SELECT OPTION',
  required = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const selectedOption = options.find(opt => opt.value === value);

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
      {label && (
        <label className="input-label-custom">
          {label} {required && <span className="label-required-star">*</span>}
        </label>
      )}
      <div className={`select-wrapper-custom ${disabled ? 'disabled' : ''}`}>
        <select
          name={name}
          value={value}
          required={required}
          onChange={onChange}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0,
            pointerEvents: 'none',
            zIndex: -1
          }}
          tabIndex={-1}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div
          className={`custom-select-trigger ${!selectedOption ? 'placeholder-active' : ''}`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={(e) => {
            if (disabled) return;
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsOpen(!isOpen);
            }
          }}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          style={{ cursor: disabled ? 'not-allowed' : 'pointer', position: 'relative' }}
        >
          <span>{selectedOption ? selectedOption.label : placeholder}</span>
          {selectedOption && !disabled && (
            <span
              role="button"
              className="select-clear-btn"
              onClick={(e) => {
                e.stopPropagation();
                onChange({
                  target: {
                    name,
                    value: ''
                  }
                });
              }}
              aria-label="Clear selection"
            >
              ✕
            </span>
          )}
          <span className={`select-caret-custom ${isOpen ? 'open' : ''}`}></span>
        </div>

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
