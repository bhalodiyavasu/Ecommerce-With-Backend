import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/contexts/ToastContext';
import Button from '@/components/common/Button/Button';
import './ProductQuickView.css';

export default function ProductQuickView({ product, onClose }) {
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const [selectedColor, setSelectedColor] = useState(
    product ? (product.color || (product.colors && product.colors.length > 0 ? product.colors[0].name : '')) : ''
  );
  const [selectedSize, setSelectedSize] = useState('');

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      showToast('warning', 'PLEASE SELECT A SIZE BEFORE ADDING TO BAG.');
      return;
    }
    showToast('success', 'PRODUCT ADDED TO CART');
    onClose();
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      showToast('warning', 'PLEASE SELECT A SIZE BEFORE BUYING.');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="quick-view-overlay" onClick={onClose}>
      <div className="quick-view-box" onClick={(e) => e.stopPropagation()}>
        <button className="quick-view-close-btn" onClick={onClose}>✕</button>
        
        <div className="quick-view-content">
          <div className="quick-view-header">
            <img src={product.image} alt={product.name} className="quick-view-image" />
            <div className="quick-view-product-info">
              <h4>{product.name}</h4>
              <p className="quick-view-price">${product.price}.00</p>
            </div>
          </div>

          <div className="quick-view-options">
            {product.colors && product.colors.length > 0 && (
              <div className="premium-selector-group">
                <span className="premium-selector-label">COLOR: {selectedColor.toUpperCase()}</span>
                <div className="premium-color-list">
                  {product.colors.map((col, idx) => (
                    <button
                      key={idx}
                      className={`premium-color-btn ${selectedColor === col.name ? 'selected' : ''}`}
                      style={{ backgroundColor: col.hex }}
                      onClick={() => setSelectedColor(col.name)}
                      title={col.name}
                    ></button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="premium-selector-group">
                <span className="premium-selector-label">SIZE: {selectedSize}</span>
                <div className="premium-size-list">
                  {product.sizes.map((sz, idx) => (
                    <button
                      key={idx}
                      className={`premium-size-btn ${selectedSize === sz ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="quick-view-summary">
            <h5>ORDER SUMMARY</h5>
            <div className="summary-row">
              <span>1x {product.name}</span>
              <span>${product.price}.00</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>TOTAL</span>
              <span>${product.price}.00</span>
            </div>
          </div>
        </div>

        <div className="quick-view-actions">
          <Button variant="outline" onClick={handleAddToCart}>
            ADD TO CART
          </Button>
          <Button variant="solid" onClick={handleBuyNow}>
            BUY NOW
          </Button>
        </div>
      </div>
    </div>
  );
}
