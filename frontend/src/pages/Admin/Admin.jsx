import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '@/components/common/Form/Input';
import Select from '@/components/common/Form/Select';
import Radio from '@/components/common/Form/Radio';
import Textarea from '@/components/common/Form/Textarea';
import FileUpload from '@/components/common/Form/FileUpload';
import Button from '@/components/common/Button/Button';
import './Admin.css';

const DUMMY_PRODUCTS = [
  {
    id: 1,
    name: 'CLASSIC WOOL OVERCOAT',
    price: '299',
    category: 'COATS',
    gender: 'men',
    status: 'NEW',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Charcoal', hex: '#363636' },
      { name: 'Camel', hex: '#c19a6b' }
    ],
    description: 'TAILORED DOUBLE-BREASTED OVERCOAT CRAFTED FROM A PREMIUM WOOL BLEND. FEATURES STRUCTURED SHOULDERS, NOTCHED LAPELS, AND A BACK VENT FOR EASE OF MOVEMENT.'
  },
  {
    id: 2,
    name: 'SUEDE BOMBER JACKET',
    price: '189',
    category: 'JACKETS',
    gender: 'men',
    status: 'BEST SELLER',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Brown', hex: '#8b5a2b' }
    ],
    description: 'PREMIUM SUEDE JACKET WITH RIBBED TRIM AND METALLIC HARDWARE.'
  }
];

export default function Admin() {
  const navigate = useNavigate();

  // Form states pre-filled with the exact premium dummy data from the screenshot
  const [productData, setProductData] = useState({
    name: 'CLASSIC WOOL OVERCOAT',
    price: '299',
    category: 'COATS',
    gender: 'men',
    description: 'TAILORED DOUBLE-BREASTED OVERCOAT CRAFTED FROM A PREMIUM WOOL BLEND. FEATURES STRUCTURED SHOULDERS, NOTCHED LAPELS, AND A BACK VENT FOR EASE OF MOVEMENT.',
    status: 'NEW',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop',
    selectedSize: 'L',
    colorsList: [
      { name: 'CHARCOAL', hex: '#363636' },
      { name: 'CAMEL', hex: '#c19a6b' }
    ]
  });

  const [colorInput, setColorInput] = useState({ name: '', hex: '#363636' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleColorAdd = () => {
    if (!colorInput.name.trim()) return;
    setProductData(prev => ({
      ...prev,
      colorsList: [...prev.colorsList, { name: colorInput.name.toUpperCase(), hex: colorInput.hex }]
    }));
    setColorInput({ name: '', hex: '#363636' });
  };

  const handleColorRemove = (colorName) => {
    setProductData(prev => ({
      ...prev,
      colorsList: prev.colorsList.filter(c => c.name !== colorName)
    }));
  };

  const CATEGORY_OPTIONS = [
    { label: 'COATS', value: 'COATS' },
    { label: 'SUITS', value: 'SUITS' },
    { label: 'JACKETS', value: 'JACKETS' },
    { label: 'SHIRTS', value: 'SHIRTS' },
    { label: 'JEANS', value: 'JEANS' },
    { label: 'SHORTS', value: 'SHORTS' },
    { label: 'POLOS', value: 'POLOS' }
  ];

  const GENDER_OPTIONS = [
    { label: 'MAN', value: 'men' },
    { label: 'WOMAN', value: 'women' },
    { label: 'KIDS', value: 'kids' }
  ];

  const STATUS_OPTIONS = [
    { label: 'NEW IN', value: 'NEW' },
    { label: 'BEST SELLER', value: 'BEST SELLER' },
    { label: 'REGULAR', value: '' }
  ];

  const FILTER_SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="admin-page-container">
      {/* 50x50 Home Button */}
      <div className="admin-header-row">
        <button onClick={() => navigate('/')} className="admin-home-btn" aria-label="Go Home">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
        </button>
        <span className="admin-header-title">ADMIN PANEL</span>
      </div>

      {/* Tabs Header - Single Tab styled consistently like Checkout */}
      <div className="admin-tabs-wrapper">
        <div className="admin-tabs-left">
          <button className="admin-tab-btn active">
            ADD PRODUCT
          </button>
        </div>
      </div>

      <div className="admin-content-area">
        {/* Form & Sidebar Preview Side-by-Side Layout */}
        <div className="admin-form-with-preview-layout" style={{ marginBottom: '60px' }}>
          <form onSubmit={handleSubmit} className="admin-form-transparent">
            <div className="form-row-custom">
              <Input
                label="Product Name"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
                placeholder="e.g. LINEN CASUAL BLAZER"
                required
              />
              <Input
                label="Price ($)"
                type="number"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                placeholder="e.g. 149"
                required
              />
            </div>

            <div className="form-row-custom">
              <Select
                label="Category"
                name="category"
                value={productData.category}
                onChange={handleInputChange}
                options={CATEGORY_OPTIONS}
              />
              <Select
                label="Gender"
                name="gender"
                value={productData.gender}
                onChange={handleInputChange}
                options={GENDER_OPTIONS}
              />
            </div>

            <div className="form-row-custom">
              <Select
                label="Product Status"
                name="status"
                value={productData.status}
                onChange={handleInputChange}
                options={STATUS_OPTIONS}
              />
              <FileUpload
                label="Product Image"
                onChange={(base64) => setProductData(prev => ({ ...prev, image: base64 }))}
                previewUrl={productData.image}
              />
            </div>

            <Textarea
              label="Description"
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              placeholder="Describe the product material, fit details..."
            />

            {/* Radio buttons for size selection */}
            <div className="admin-form-group">
              <span className="input-label-custom">SELECT SIZE</span>
              <div className="radio-buttons-grid">
                {FILTER_SIZES.map(size => (
                  <Radio
                    key={size}
                    label={size}
                    name="size-radio"
                    value={size}
                    checked={productData.selectedSize === size}
                    onChange={() => setProductData(prev => ({ ...prev, selectedSize: size }))}
                  />
                ))}
              </div>
            </div>

            {/* Add Colors with Color Hex and Name */}
            <div className="admin-form-group">
              <div className="colors-adder-row">
                <div className="color-field-name">
                  <Input
                    label="Color Name"
                    name="colorName"
                    value={colorInput.name}
                    onChange={(e) => setColorInput(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. CHARCOAL"
                  />
                </div>
                <div className="color-field-hex">
                  <Input
                    label="Color Hex"
                    type="color"
                    name="colorHex"
                    value={colorInput.hex}
                    onChange={(e) => setColorInput(prev => ({ ...prev, hex: e.target.value }))}
                  />
                </div>
                <button type="button" onClick={handleColorAdd} className="add-color-action-btn">
                  ADD COLOR
                </button>
              </div>

              {/* Added Colors Tags */}
              {productData.colorsList.length > 0 && (
                <div className="colors-preview-tags">
                  {productData.colorsList.map(c => (
                    <span className="color-preview-tag" key={c.name}>
                      <span className="tag-color-swatch" style={{ backgroundColor: c.hex }} />
                      <span className="tag-color-name">{c.name}</span>
                      <button 
                        type="button" 
                        onClick={() => handleColorRemove(c.name)}
                        className="color-tag-close-btn"
                        aria-label={`Remove color ${c.name}`}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="admin-submit-btn-row">
              <Button type="submit" variant="solid" layout="split">
                <span>CREATE PRODUCT</span>
                <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 6H39M39 6L33 1M39 6L33 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Button>
            </div>
          </form>

          {/* Product Live Preview sidebar */}
          <div className="admin-product-preview-sidebar">
            <span className="input-label-custom">PRODUCT PREVIEW</span>
            <div className="collections-card-link">
              <div className="collections-card">
                <div className="card-image-wrapper">
                  <img 
                    src={productData.image || 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop'} 
                    alt={productData.name || 'Product Image'} 
                    className="card-product-image" 
                  />
                </div>
                <div className="card-details">
                  <div className="card-category">
                    {`${productData.gender === 'men' ? 'MAN' : 'WOMAN'} / ${productData.category}`.toUpperCase()}
                  </div>
                  <h3 className="card-title">{productData.name || 'PRODUCT NAME'}</h3>
                  <div className="card-price">${productData.price || '0'}</div>

                  {/* Size preview */}
                  <div className="preview-spec-section">
                    <span className="preview-spec-label">SIZE:</span>
                    <span className="preview-spec-val">{productData.selectedSize}</span>
                  </div>

                  {/* Colors preview */}
                  {productData.colorsList.length > 0 && (
                    <div className="preview-spec-section">
                      <span className="preview-spec-label">COLORS:</span>
                      <div className="preview-colors-row">
                        {productData.colorsList.map(c => (
                          <span 
                            key={c.name} 
                            className="preview-color-dot" 
                            style={{ backgroundColor: c.hex }} 
                            title={c.name}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Description preview */}
                  {productData.description && (
                    <div className="preview-spec-section preview-desc-block">
                      <span className="preview-spec-label">DESCRIPTION:</span>
                      <p className="preview-desc-text">{productData.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dummy Inventory Table */}
        <div className="admin-tabs-wrapper" style={{ marginTop: '50px', marginBottom: '25px' }}>
          <div className="admin-tabs-left">
            <button className="admin-tab-btn active">
              PRODUCT INVENTORY
            </button>
          </div>
        </div>

        <div className="admin-table-container">
          <table className="admin-inventory-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>IMAGE</th>
                <th>PRODUCT</th>
                <th>SPECS &amp; CATEGORY</th>
                <th>GENDER</th>
                <th style={{ width: '120px', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {DUMMY_PRODUCTS.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="inventory-image-thumb">
                      <img src={p.image} alt="" />
                    </div>
                  </td>
                  <td>
                    <div className="inventory-name-col">
                      <div className="inventory-product-name">{p.name}</div>
                      <div className="inventory-product-desc">{p.description}</div>
                      <div className="inventory-product-price">${p.price}</div>
                    </div>
                  </td>
                  <td>
                    <div className="inventory-specs-col">
                      <div>
                        <span className="specs-label">SIZES:</span>{' '}
                        <span className="specs-val">
                          {p.sizes && p.sizes.length > 0 ? p.sizes.join(', ') : '—'}
                        </span>
                      </div>
                      <div>
                        <span className="specs-label">COLORS:</span>{' '}
                        <div className="specs-colors-row">
                          {p.colors && p.colors.map(c => (
                            <span 
                              key={c.name} 
                              className="specs-color-dot" 
                              style={{ backgroundColor: c.hex }} 
                              title={c.name}
                            />
                          ))}
                          {(!p.colors || p.colors.length === 0) && <span className="specs-val">—</span>}
                        </div>
                      </div>
                      <div className="specs-category-badge">{p.category}</div>
                    </div>
                  </td>
                  <td>
                    <span className="inventory-gender-val">
                      {p.gender === 'men' ? 'MAN' : p.gender === 'women' ? 'WOMAN' : 'KIDS'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="inventory-actions-row">
                      <button className="inventory-edit-btn" style={{ opacity: 0.5, cursor: 'default' }}>
                        EDIT
                      </button>
                      <button className="inventory-delete-btn" style={{ opacity: 0.5, cursor: 'default' }}>
                        DELETE
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
