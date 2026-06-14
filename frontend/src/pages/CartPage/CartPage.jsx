import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCartItemsWithProducts } from '@/data/mockData';
import minusIcon from '@/assets/icons/minus.svg';
import plusIcon from '@/assets/icons/plus.svg';
import './CartPage.css';

export default function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(getCartItemsWithProducts);

  const removeFromCart = (productId, size, color) => {
    setCartItems(prev =>
      prev.filter(item =>
        !(item.product.id === productId && item.size === size && item.color === color)
      )
    );
  };

  const updateQuantity = (productId, size, color, delta) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.product.id === productId && item.size === size && item.color === color) {
          const newQty = item.quantity + delta;
          if (newQty < 1) return item;
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <div className="cart-page-container">
      {/* Breadcrumb navigation */}
      <div className="breadcrumb">
        <Link to="/" className="breadcrumb-link">HOME</Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">BAG</span>
      </div>

      <h1 className="cart-page-title">
        BAG <span className="cart-page-count">({cartCount})</span>
      </h1>

      <div className="cart-layout">
        {cartItems.length === 0 ? (
          <div className="empty-cart-view">
            <h2 className="empty-cart-message">YOUR BAG IS CURRENTLY EMPTY.</h2>
            <p className="empty-cart-desc">Add items from our collections to get started.</p>
            <Link to="/collections" className="continue-shopping-action">
              CONTINUE SHOPPING
            </Link>
          </div>
        ) : (
          <>
            {/* Left Scrollable Product List */}
            <div className="cart-products-list">
              <div className="cart-table-header">
                <span className="header-product">PRODUCT</span>
                <span className="header-quantity">QUANTITY</span>
                <span className="header-total">TOTAL</span>
              </div>

              {cartItems.map((item, idx) => {
                const itemTotal = item.product.price * item.quantity;
                return (
                  <div key={`${item.product.id}-${item.size}-${item.color}-${idx}`} className="cart-item-row">
                    {/* Product Image and Details */}
                    <div className="cart-item-details-col">
                      <div className="cart-item-image-wrapper">
                        <img src={item.product.image} alt={item.product.name} className="cart-item-image" />
                      </div>
                      <div className="cart-item-info">
                        <span className="cart-item-category">{item.product.tag}</span>
                        <h3 className="cart-item-name">{item.product.name}</h3>
                        <div className="cart-item-specs-display">
                          <div className="spec-item">
                            <span className="spec-label">SIZE:</span>
                            <span className="spec-box">{item.size}</span>
                          </div>
                          <div className="spec-item">
                            <span className="spec-label">COLOR:</span>
                            <span 
                              className="spec-color-swatch" 
                              style={{ 
                                backgroundColor: item.product.colors?.find(c => c.name.toLowerCase() === item.color.toLowerCase())?.hex || item.color 
                              }}
                              title={item.color}
                            ></span>
                          </div>
                        </div>
                        <button
                          className="cart-item-remove-btn"
                          onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                          aria-label="Remove item"
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>

                    {/* Quantity Control */}
                    <div className="cart-item-qty-col">
                      <div className="cart-qty-selector">
                        <button
                          className={`qty-selector-btn ${item.quantity <= 1 ? 'disabled' : ''}`}
                          onClick={() => updateQuantity(item.product.id, item.size, item.color, -1)}
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <img src={minusIcon} alt="Decrease" className="qty-btn-icon" />
                        </button>
                        <span className="qty-selector-value">{item.quantity}</span>
                        <button
                          className="qty-selector-btn"
                          onClick={() => updateQuantity(item.product.id, item.size, item.color, 1)}
                          aria-label="Increase quantity"
                        >
                          <img src={plusIcon} alt="Increase" className="qty-btn-icon" />
                        </button>
                      </div>
                    </div>

                    {/* Total Price for this Item */}
                    <div className="cart-item-total-col">
                      <span className="cart-item-price">${itemTotal}.00</span>
                      {item.quantity > 1 && (
                        <span className="cart-item-unit-price">(${item.product.price}.00 EACH)</span>
                      )}
                    </div>
                  </div>
                );
              })}

              <div className="cart-actions-footer">
                <Link to="/collections" className="back-to-shop-btn">
                  CONTINUE SHOPPING
                </Link>
              </div>
            </div>

            {/* Right Sticky Order Summary */}
            <aside className="cart-summary-sidebar">
              <div className="cart-summary-card">
                <h2 className="summary-card-title">ORDER SUMMARY</h2>
                
                <div className="summary-row-item">
                  <span className="summary-row-label">SUBTOTAL</span>
                  <span className="summary-row-value">${cartTotal}.00</span>
                </div>
                
                <div className="summary-row-item">
                  <span className="summary-row-label">SHIPPING</span>
                  <span className="summary-row-value free-shipping">FREE</span>
                </div>

                <div className="summary-row-item text-muted">
                  <span className="summary-row-label">ESTIMATED TAXES</span>
                  <span className="summary-row-value">--</span>
                </div>

                <div className="summary-divider-line"></div>

                <div className="summary-row-item summary-total-row">
                  <span className="summary-row-label">TOTAL</span>
                  <span className="summary-row-value">${cartTotal}.00</span>
                </div>

                <button
                  className="cart-checkout-continue-btn"
                  onClick={() => navigate('/checkout')}
                >
                  CONTINUE
                </button>
              </div>
            </aside>
          </>
        )}
      </div>
    </div>
  );
}
