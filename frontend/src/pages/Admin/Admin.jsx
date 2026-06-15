import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/contexts/ToastContext';
import { ALL_PRODUCTS, FILTER_SIZES } from '@/data/mockData';
import Input from '@/components/common/Form/Input';
import Select from '@/components/common/Form/Select';
import Radio from '@/components/common/Form/Radio';
import Textarea from '@/components/common/Form/Textarea';
import FileUpload from '@/components/common/Form/FileUpload';
import Button from '@/components/common/Button/Button';
import './Admin.css';

export default function Admin() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [view, setView] = useState('list'); // 'list' or 'form'
  const [editingProduct, setEditingProduct] = useState(null);

  // Form states pre-filled with premium dummy data by default
  const [productData, setProductData] = useState({
    name: 'CLASSIC WOOL OVERCOAT',
    price: '299',
    category: 'COATS',
    gender: 'men',
    description: 'Tailored double-breasted overcoat crafted from a premium wool blend. Features structured shoulders, notched lapels, and a back vent for ease of movement.',
    status: 'NEW',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop',
    selectedSize: 'L',
    colorsList: [
      { name: 'Charcoal', hex: '#363636' },
      { name: 'Camel', hex: '#c19a6b' }
    ]
  });

  // Color inputs
  const [colorInput, setColorInput] = useState({ name: '', hex: '#000000' });

  // List products state logic
  const getInventoryProducts = () => {
    return ALL_PRODUCTS;
  };

  const [products, setProducts] = useState(getInventoryProducts());

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleColorAdd = () => {
    if (!colorInput.name.trim()) {
      showToast('warning', 'PLEASE ENTER A COLOR NAME.');
      return;
    }
    const alreadyExists = productData.colorsList.some(
      c => c.name.toLowerCase() === colorInput.name.trim().toLowerCase()
    );
    if (alreadyExists) {
      showToast('warning', 'COLOR NAME ALREADY ADDED.');
      return;
    }
    setProductData(prev => ({
      ...prev,
      colorsList: [...prev.colorsList, { name: colorInput.name.toLowerCase(), hex: colorInput.hex }]
    }));
    setColorInput({ name: '', hex: '#000000' });
  };

  const handleColorRemove = (colorName) => {
    setProductData(prev => ({
      ...prev,
      colorsList: prev.colorsList.filter(c => c.name !== colorName)
    }));
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setProductData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      gender: product.gender,
      description: product.description || '',
      status: product.status || 'NEW',
      rating: product.rating || 5,
      image: product.image || '',
      selectedSize: product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'M',
      colorsList: product.colors || []
    });
    setView('form');
  };

  const handleDeleteClick = (id) => {
    showToast('success', 'PRODUCT REMOVED FROM INVENTORY.');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productData.name.trim() || !productData.price) {
      showToast('warning', 'PLEASE FILL IN ALL REQUIRED DETAILS.');
      return;
    }

    if (editingProduct) {
      showToast('success', 'PRODUCT UPDATED SUCCESSFULLY.');
    } else {
      showToast('success', 'PRODUCT CREATED SUCCESSFULLY.');
    }

    // Reset editing states & toggle view
    setEditingProduct(null);
    setProductData({
      name: 'CLASSIC WOOL OVERCOAT',
      price: '299',
      category: 'COATS',
      gender: 'men',
      description: 'Tailored double-breasted overcoat crafted from a premium wool blend. Features structured shoulders, notched lapels, and a back vent for ease of movement.',
      status: 'NEW',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop',
      selectedSize: 'L',
      colorsList: [
        { name: 'Charcoal', hex: '#363636' },
        { name: 'Camel', hex: '#c19a6b' }
      ]
    });
    setView('list');
  };

  const handleAddNewClick = () => {
    setEditingProduct(null);
    setProductData({
      name: 'CLASSIC WOOL OVERCOAT',
      price: '299',
      category: 'COATS',
      gender: 'men',
      description: 'Tailored double-breasted overcoat crafted from a premium wool blend. Features structured shoulders, notched lapels, and a back vent for ease of movement.',
      status: 'NEW',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop',
      selectedSize: 'L',
      colorsList: [
        { name: 'Charcoal', hex: '#363636' },
        { name: 'Camel', hex: '#c19a6b' }
      ]
    });
    setView('form');
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

      {/* Tabs Header with Add Button on Right */}
      <div className="admin-tabs-wrapper">
        <div className="admin-tabs-left">
          <button 
            className="admin-tab-btn active"
            onClick={() => setView('list')}
          >
            PRODUCT INVENTORY
          </button>
        </div>

        <div className="admin-tabs-right">
          {view === 'list' ? (
            <button onClick={handleAddNewClick} className="admin-tab-action-btn">
              ADD PRODUCT
            </button>
          ) : (
            <button onClick={() => setView('list')} className="admin-tab-back-link">
              BACK TO LIST
            </button>
          )}
        </div>
      </div>

      <div className="admin-content-area">
        {view === 'list' ? (
          /* List View (Table) */
          <div className="admin-table-container">
            {products.length === 0 ? (
              <div className="admin-empty-state">NO PRODUCTS FOUND IN THE SYSTEM.</div>
            ) : (
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
                  {products.map(p => (
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
                          <button onClick={() => handleEditClick(p)} className="inventory-edit-btn">
                            EDIT
                          </button>
                          <button onClick={() => handleDeleteClick(p.id)} className="inventory-delete-btn">
                            DELETE
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ) : (
          /* Form View with Side-by-Side live product preview */
          <div className="admin-form-with-preview-layout">
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

              {/* Radio buttons for single size select */}
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
                      placeholder="e.g. Charcoal"
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

                {/* Preview added colors list */}
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
                  <span>{editingProduct ? 'UPDATE PRODUCT' : 'ADD PRODUCT'}</span>
                  <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 6H39M39 6L33 1M39 6L33 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Button>
              </div>
            </form>

            {/* Live product preview sidebar */}
            <div className="admin-product-preview-sidebar">
              <span className="input-label-custom">LIVE PRODUCT PREVIEW</span>
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
        )}
      </div>
    </div>
  );
}
