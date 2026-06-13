import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ALL_PRODUCTS } from '@/data/products';
import './ProductDetailPage.css';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = ALL_PRODUCTS.find((p) => p.id === parseInt(id));

  // If product not found
  if (!product) {
    return (
      <div className="product-not-found">
        <h2>PRODUCT NOT FOUND</h2>
        <p>The product you are looking for does not exist or has been removed.</p>
        <Link to="/collections" className="back-btn">
          BACK TO COLLECTIONS
        </Link>
      </div>
    );
  }

  // State
  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product.color);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Update active image if product changes
  useEffect(() => {
    setActiveImage(product.image);
    setSelectedSize('');
    setSelectedColor(product.color);
    setIsAdded(false);
    setIsAdding(false);
  }, [product]);

  const handleAddToBag = () => {
    if (!selectedSize) {
      alert('PLEASE SELECT A SIZE BEFORE ADDING TO BAG.');
      return;
    }
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }, 800);
  };

  return (
    <div className="product-detail-container">
      {/* Breadcrumb Navigation */}
      <div className="detail-breadcrumb">
        <Link to="/" className="breadcrumb-link">HOME</Link>
        <span className="breadcrumb-separator">/</span>
        <Link to="/collections" className="breadcrumb-link">COLLECTIONS</Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">{product.name}</span>
      </div>

      {/* Main Content Layout */}
      <div className="product-detail-layout">
        {/* Left Column: Gallery & Active Image */}
        <div className="product-gallery-section">
          {/* Main Visual Display */}
          <div className="main-image-display">
            <img src={activeImage} alt={product.name} className="active-display-img" />
          </div>

          {/* Thumbnail Stack */}
          <div className="gallery-thumbnails-stack">
            {product.images && product.images.map((img, idx) => (
              <button
                key={idx}
                className={`thumbnail-btn ${activeImage === img ? 'active' : ''}`}
                onClick={() => setActiveImage(img)}
                onMouseEnter={() => setActiveImage(img)}
              >
                <img src={img} alt={`${product.name} view ${idx + 1}`} className="thumbnail-img" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Specification & Action Panel */}
        <div className="product-spec-panel">
          <div className="spec-header">
            <span className="spec-tag">{product.tag}</span>
            <h1 className="spec-title">{product.name}</h1>
            <div className="spec-price">${product.price}.00</div>
            <div className="spec-tax-note">MRP incl. of all taxes</div>
          </div>

          <div className="spec-divider"></div>

          <div className="spec-description">
            <p>{product.description}</p>
          </div>

          {/* Color Selector */}
          {product.colors && (
            <div className="spec-options-section">
              <h3 className="options-title">
                COLOR: <span className="options-selected-label">{selectedColor.toUpperCase()}</span>
              </h3>
              <div className="color-swatches-grid">
                {product.colors.map((col, idx) => (
                  <button
                    key={idx}
                    className={`color-swatch-btn ${selectedColor === col.name ? 'active' : ''}`}
                    style={{ backgroundColor: col.hex }}
                    onClick={() => setSelectedColor(col.name)}
                    title={col.name}
                  >
                    <span className="swatch-indicator"></span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          <div className="spec-options-section">
            <h3 className="options-title">
              SIZE:{' '}
              {selectedSize && (
                <span className="options-selected-label">{selectedSize}</span>
              )}
            </h3>
            <div className="sizes-selection-grid">
              {product.sizes.map((sz, idx) => (
                <button
                  key={idx}
                  className={`size-select-btn ${selectedSize === sz ? 'active' : ''}`}
                  onClick={() => setSelectedSize(sz)}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Size Guide Toggle */}
          <button
            className="size-guide-toggle-btn"
            onClick={() => setShowSizeGuide(true)}
          >
            FIND YOUR SIZE / MEASUREMENT GUIDE
          </button>

          {/* Action Button */}
          <button
            className={`add-to-bag-action-btn ${isAdded ? 'added' : ''} ${
              isAdding ? 'adding' : ''
            }`}
            onClick={handleAddToBag}
            disabled={isAdding}
          >
            {isAdding ? 'ADDING...' : isAdded ? 'ADDED TO BAG' : 'ADD'}
          </button>
        </div>
      </div>

      {/* Measurement Size Guide Modal Overlay */}
      {showSizeGuide && (
        <div className="size-guide-modal-overlay" onClick={() => setShowSizeGuide(false)}>
          <div className="size-guide-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">MEASUREMENT GUIDE</h3>
              <button
                className="modal-close-btn"
                onClick={() => setShowSizeGuide(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-intro">
                All measurements are in inches. Standard body size measurements:
              </p>
              <table className="size-guide-table">
                <thead>
                  <tr>
                    <th>SIZE</th>
                    <th>CHEST (IN)</th>
                    <th>WAIST (IN)</th>
                    <th>SLEEVE (IN)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>XS</td>
                    <td>32 - 34</td>
                    <td>26 - 28</td>
                    <td>31.5</td>
                  </tr>
                  <tr>
                    <td>S</td>
                    <td>35 - 37</td>
                    <td>29 - 31</td>
                    <td>32.5</td>
                  </tr>
                  <tr>
                    <td>M</td>
                    <td>38 - 40</td>
                    <td>32 - 34</td>
                    <td>33.5</td>
                  </tr>
                  <tr>
                    <td>L</td>
                    <td>41 - 43</td>
                    <td>35 - 37</td>
                    <td>34.5</td>
                  </tr>
                  <tr>
                    <td>XL</td>
                    <td>44 - 46</td>
                    <td>38 - 40</td>
                    <td>35.5</td>
                  </tr>
                  <tr>
                    <td>2XL</td>
                    <td>47 - 49</td>
                    <td>41 - 43</td>
                    <td>36.5</td>
                  </tr>
                </tbody>
              </table>
              <div className="modal-tips">
                <h4>HOW TO MEASURE</h4>
                <ul>
                  <li><strong>CHEST:</strong> Measure around the fullest part of your chest, keeping the tape horizontal.</li>
                  <li><strong>WAIST:</strong> Measure around the narrowest part of your waistline, keeping tape horizontal.</li>
                  <li><strong>SLEEVES:</strong> Measure from the center back of your neck, down the shoulder and arm to the wrist.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
