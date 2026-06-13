import React, { useState, useMemo } from 'react';
import ProductQuickView from '@/components/common/ProductQuickView/ProductQuickView';
import { ALL_PRODUCTS } from '@/data/products';
import searchIcon from '@/assets/icons/search.svg';
import './CollectionsPage.css';
import { Link } from 'react-router-dom';
const CATEGORY_TAGS_ROW_1 = ['NEW', 'SHORTS', 'POLOS', 'SWEATER', 'SUITS'];
const CATEGORY_TAGS_ROW_2 = ['BEST SELLER', 'SHIRTS', 'JEANS', 'JACKETS', 'COATS'];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL'];
const COLORS = [
  { name: 'beige', hex: '#ebe7db' },
  { name: 'grey', hex: '#A9A9A9' },
  { name: 'charcoal', hex: '#1E1E1E' },
  { name: 'black', hex: '#000000' },
  { name: 'mint', hex: '#A6D6CA' },
  { name: 'white', hex: '#FFFFFF' },
  { name: 'lavender', hex: '#B9C1E8' }
];

export default function CollectionsPage() {
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState('newest'); // 'price-asc', 'price-desc', 'newest'
  const [priceRange, setPriceRange] = useState(300);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  // Accordion Expand/Collapse States
  const [expandGender, setExpandGender] = useState(true);
  const [expandColor, setExpandColor] = useState(true);
  const [expandSize, setExpandSize] = useState(true);
  const [expandSort, setExpandSort] = useState(true);
  const [expandPrice, setExpandPrice] = useState(true);
  const [expandStatus, setExpandStatus] = useState(true);
  const [expandRating, setExpandRating] = useState(true);

  // Quick View State
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Toggle handlers
  const handleGenderToggle = (gender) => {
    setSelectedGenders(prev =>
      prev.includes(gender) ? prev.filter(g => g !== gender) : [...prev, gender]
    );
  };

  const handleColorToggle = (color) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const handleSizeToggle = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleTagToggle = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleRatingToggle = (rating) => {
    setSelectedRatings(prev =>
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    );
  };

  const handleStatusToggle = (status) => {
    setSelectedStatuses(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...ALL_PRODUCTS];

    // Search query filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q)
      );
    }

    // Gender filter
    if (selectedGenders.length > 0) {
      result = result.filter(p => selectedGenders.includes(p.gender));
    }

    // Color filter
    if (selectedColors.length > 0) {
      result = result.filter(p => selectedColors.includes(p.color));
    }

    // Size filter
    if (selectedSizes.length > 0) {
      result = result.filter(p => selectedSizes.includes(p.size));
    }

    // Rating filter
    if (selectedRatings.length > 0) {
      result = result.filter(p => selectedRatings.includes(p.rating));
    }

    // Status filter (from Sidebar)
    if (selectedStatuses.length > 0) {
      result = result.filter(p => selectedStatuses.includes(p.status));
    }

    // Category Tag Pills Filter
    if (selectedTags.length > 0) {
      result = result.filter(p => {
        return selectedTags.some(t => {
          if (t === 'NEW') return p.status === 'NEW';
          if (t === 'BEST SELLER') return p.status === 'BEST SELLER';
          return p.category === t;
        });
      });
    }

    // Price range filter
    result = result.filter(p => p.price <= priceRange);

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      // Keep mock default or sort by status New first
      result.sort((a, b) => (b.status === 'NEW' ? 1 : 0) - (a.status === 'NEW' ? 1 : 0));
    }

    return result;
  }, [searchQuery, selectedGenders, selectedColors, selectedSizes, selectedTags, sortBy, priceRange, selectedRatings, selectedStatuses]);

  return (
    <div className="collections-container">
      {/* Sidebar Filter Panel */}
      <aside className="filter-sidebar">
        {/* Breadcrumbs */}
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">HOME</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">COLLECTIONS</span>
        </div>

        <h1 className="sidebar-title">COLLECTIONS</h1>

        {/* Gender Accordion */}
        <div className="filter-section">
          <div className="filter-header" onClick={() => setExpandGender(!expandGender)}>
            <span className="filter-label">GENDER</span>
            <span className="accordion-caret">{expandGender ? '▲' : '▼'}</span>
          </div>
          {expandGender && (
            <div className="filter-content">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={selectedGenders.includes('men')}
                  onChange={() => handleGenderToggle('men')}
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">MAN</span>
              </label>
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={selectedGenders.includes('women')}
                  onChange={() => handleGenderToggle('women')}
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">WOMAN</span>
              </label>
            </div>
          )}
        </div>

        {/* Color Accordion */}
        <div className="filter-section">
          <div className="filter-header" onClick={() => setExpandColor(!expandColor)}>
            <span className="filter-label">COLOR</span>
            <span className="accordion-caret">{expandColor ? '▲' : '▼'}</span>
          </div>
          {expandColor && (
            <div className="filter-content color-swatches">
              {COLORS.map(c => (
                <button
                  key={c.name}
                  className={`color-swatch-btn ${selectedColors.includes(c.name) ? 'active' : ''}`}
                  style={{ backgroundColor: c.hex }}
                  onClick={() => handleColorToggle(c.name)}
                  aria-label={`Filter ${c.name}`}
                ></button>
              ))}
            </div>
          )}
        </div>

        {/* Size Accordion */}
        <div className="filter-section">
          <div className="filter-header" onClick={() => setExpandSize(!expandSize)}>
            <span className="filter-label">SIZE</span>
            <span className="accordion-caret">{expandSize ? '▲' : '▼'}</span>
          </div>
          {expandSize && (
            <div className="filter-content size-grid">
              {SIZES.map(size => (
                <button
                  key={size}
                  className={`size-grid-btn ${selectedSizes.includes(size) ? 'active' : ''}`}
                  onClick={() => handleSizeToggle(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sort By Accordion */}
        <div className="filter-section">
          <div className="filter-header" onClick={() => setExpandSort(!expandSort)}>
            <span className="filter-label">SORT BY</span>
            <span className="accordion-caret">{expandSort ? '▲' : '▼'}</span>
          </div>
          {expandSort && (
            <div className="filter-content sort-options">
              <label className="radio-container">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === 'newest'}
                  onChange={() => setSortBy('newest')}
                />
                <span className="radio-custom"></span>
                <span className="radio-label">NEWEST</span>
              </label>
              <label className="radio-container">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === 'price-asc'}
                  onChange={() => setSortBy('price-asc')}
                />
                <span className="radio-custom"></span>
                <span className="radio-label">PRICE: LOW TO HIGH</span>
              </label>
              <label className="radio-container">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === 'price-desc'}
                  onChange={() => setSortBy('price-desc')}
                />
                <span className="radio-custom"></span>
                <span className="radio-label">PRICE: HIGH TO LOW</span>
              </label>
            </div>
          )}
        </div>

        {/* Price Accordion */}
        <div className="filter-section">
          <div className="filter-header" onClick={() => setExpandPrice(!expandPrice)}>
            <span className="filter-label">PRICE</span>
            <span className="accordion-caret">{expandPrice ? '▲' : '▼'}</span>
          </div>
          {expandPrice && (
            <div className="filter-content price-range-content">
              <input
                type="range"
                min="50"
                max="300"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="price-slider"
              />
              <div className="price-display">
                <span>MAX PRICE:</span>
                <span className="price-val">${priceRange}</span>
              </div>
            </div>
          )}
        </div>

        {/* Product Status Accordion */}
        <div className="filter-section">
          <div className="filter-header" onClick={() => setExpandStatus(!expandStatus)}>
            <span className="filter-label">PRODUCT STATUS</span>
            <span className="accordion-caret">{expandStatus ? '▲' : '▼'}</span>
          </div>
          {expandStatus && (
            <div className="filter-content">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={selectedStatuses.includes('NEW')}
                  onChange={() => handleStatusToggle('NEW')}
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">NEW IN</span>
              </label>
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={selectedStatuses.includes('BEST SELLER')}
                  onChange={() => handleStatusToggle('BEST SELLER')}
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">BEST SELLERS</span>
              </label>
            </div>
          )}
        </div>

        {/* Rating Accordion */}
        <div className="filter-section">
          <div className="filter-header" onClick={() => setExpandRating(!expandRating)}>
            <span className="filter-label">RATING</span>
            <span className="accordion-caret">{expandRating ? '▲' : '▼'}</span>
          </div>
          {expandRating && (
            <div className="filter-content">
              {[5, 4, 3].map(stars => (
                <label key={stars} className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={selectedRatings.includes(stars)}
                    onChange={() => handleRatingToggle(stars)}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">
                    {'★'.repeat(stars)}{'☆'.repeat(5 - stars)} &amp; UP
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Main Grid Area */}
      <main className="collections-main">
        {/* Top Control Bar (Search + Categories) */}
        <div className="top-control-bar">
          {/* Custom Search Bar matching SVG coordinates */}
          <div className="collections-search-bar">
            <img src={searchIcon} className="collections-search-icon" alt="" />
            <input
              type="text"
              placeholder="SEARCH PRODUCTS"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="collections-search-input"
              aria-label="Search Products"
            />
          </div>

        </div>



        {/* Product Grid */}
        <div className="collections-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div 
                className="collections-card-link" 
                key={product.id} 
                onClick={() => setQuickViewProduct(product)}
                style={{ cursor: 'pointer' }}
              >
                <div className="collections-card">
                  <div className="card-image-wrapper">
                    <img src={product.image} alt={product.name} className="card-product-image" />
                  </div>
                  <div className="card-details">
                    <div className="card-category">{product.tag}</div>
                    <h3 className="card-title">{product.name}</h3>
                    <div className="card-price">${product.price}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-products-message">
              <h3>NO PRODUCTS FOUND MATCHING YOUR CRITERIA.</h3>
              <p>Try resetting some filters or searching for another term.</p>
            </div>
          )}
        </div>
      </main>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductQuickView 
          product={quickViewProduct} 
          onClose={() => setQuickViewProduct(null)} 
        />
      )}
    </div>
  );
}
