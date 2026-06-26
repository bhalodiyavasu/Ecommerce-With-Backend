import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useVerifySessionQuery } from '@/store/actions/paymentActions';
import Button from '@/components/common/Button/Button';
import Loader from '@/components/common/Loader/Loader';
import './PaymentSuccess.css';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const { data, isLoading, isError } = useVerifySessionQuery(sessionId, { skip: !sessionId });

  const handlePrint = (e) => {
    e.preventDefault();
    window.print();
  };

  if (!sessionId || isError) {
    return (
      <div className="success-page-container success-error-view">
        <h2>Invalid or expired session.</h2>
        <Link to="/collections">GO TO COLLECTIONS</Link>
      </div>
    );
  }

  if (isLoading || !data || !data.order) {
    return (
      <div className="success-page-container success-loading-view">
        <Loader />
      </div>
    );
  }

  const order = data.order;
  const contactInfo = order.contactInfo;
  const shippingInfo = order.shippingInfo;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} - ${shippingInfo.postalCode}, ${shippingInfo.country}`;

  return (
    <div className="success-page-container">
      <div className="success-noise"></div>

      <div className="success-content-card">
        <div className="success-icon-wrapper">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="24" fill="#10b981" />
            <path d="M15 24.5L21 30.5L33 18" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <span className="success-badge">ORDER CONFIRMED</span>
        <h1 className="success-main-title">THANK YOU FOR YOUR PURCHASE</h1>

        <p className="success-main-desc">
          Your order has been received and is currently processing. A confirmation receipt with details has been sent to <strong>{contactInfo.email}</strong>.
        </p>

        <div className="success-details-grid">
          <div className="success-detail-box">
            <span className="detail-lbl">ORDER NUMBER</span>
            <span className="detail-val accent-order-id">{(order.orderNumber || order._id).toUpperCase()}</span>
          </div>
          {order.paymentId && (
            <div className="success-detail-box">
              <span className="detail-lbl">PAYMENT ID</span>
              <span className="detail-val" style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{order.paymentId}</span>
            </div>
          )}
          <div className="success-detail-box">
            <span className="detail-lbl">EMAIL ADDRESS</span>
            <span className="detail-val">{contactInfo.email}</span>
          </div>
          <div className="success-detail-box">
            <span className="detail-lbl">CONTACT PHONE</span>
            <span className="detail-val">{contactInfo.phone}</span>
          </div>
          <div className="success-detail-box">
            <span className="detail-lbl">DELIVERY ADDRESS</span>
            <span className="detail-val address-txt">{address}</span>
          </div>
        </div>

        <div className="success-divider-line"></div>

        <div className="success-mini-summary">
          <h3 className="summary-section-title">ORDER SUMMARY</h3>

          <div className="summary-items-list">
            {order.items.map((item, idx) => (
              <div key={`${item.product._id}-${idx}`} className="summary-item-row">
                <div className="summary-item-left">
                  <div className="summary-item-img-box">
                    <img src={item.product.image} alt="" />
                  </div>
                  <div className="summary-item-desc">
                    <span className="summary-item-name">{item.product.name}</span>
                    <div className="summary-item-meta">
                      <span className="meta-badge">{item.size}</span>
                      {item.color && (
                        <span 
                          className="meta-color-box" 
                          style={{ backgroundColor: item.color.hex || item.color }} 
                          title={item.color.name || item.color}
                        />
                      )}
                      <span className="meta-badge-qty">({item.quantity})</span>
                    </div>
                  </div>
                </div>
                <span className="summary-item-price">₹{(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="summary-total-footer">
            <div className="summary-footer-row">
              <span>SUBTOTAL</span>
              <span>₹{order.subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-footer-row">
              <span>SHIPPING</span>
              <span>{order.shippingCharge > 0 ? `₹${order.shippingCharge.toFixed(2)}` : 'FREE'}</span>
            </div>
            <div className="summary-footer-row total-row-highlight">
              <span>TOTAL</span>
              <span>₹{order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="success-divider-line"></div>

        <div className="success-action-buttons">
          <Button type="button" variant="outline" onClick={() => setShowReceiptModal(true)}>
            VIEW ORDER RECEIPT
          </Button>
          <Button type="button" variant="solid" className="success-download-receipt-btn" onClick={handlePrint}>
            DOWNLOAD RECEIPT
          </Button>
          <Button to="/collections" variant="solid">
            CONTINUE SHOPPING
          </Button>
        </div>
      </div>

      <div className={`receipt-modal-overlay ${showReceiptModal ? 'active' : ''}`} onClick={() => setShowReceiptModal(false)}>
        <div className="receipt-modal-box" onClick={(e) => e.stopPropagation()}>
          <div className="receipt-header-row">
            <div className="receipt-logo">ETERNIX</div>
            <button className="receipt-close-btn" onClick={() => setShowReceiptModal(false)}>✕</button>
          </div>

          <div className="receipt-info-section">
            <div className="receipt-bill-to-left">
              <span className="bill-to-label">BILL TO</span>
              <div className="bill-to-info">
                <p className="customer-name">{contactInfo.fullName}</p>
                <p className="customer-phone">{contactInfo.phone}</p>
                <p className="customer-address">{address}</p>
              </div>
            </div>
            <div className="receipt-meta-details-right">
              <div className="receipt-payment-card">
                <span className="payment-card-title">PAYMENT & ORDER INFO</span>
                <div className="payment-card-row">
                  <span className="card-row-label">ORDER ID</span>
                  <span className="card-row-value">{(order.orderNumber || order._id).toUpperCase()}</span>
                </div>
                <div className="payment-card-row">
                  <span className="card-row-label">DATE</span>
                  <span className="card-row-value">{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="payment-card-row">
                  <span className="card-row-label">METHOD</span>
                  <span className="card-row-value">STRIPE</span>
                </div>
                {order.paymentId && (
                  <div className="payment-card-row payment-id-row">
                    <span className="card-row-label">PAYMENT ID</span>
                    <span className="card-row-value-mono">{order.paymentId}</span>
                  </div>
                )}
                <div className="payment-card-row">
                  <span className="card-row-label">STATUS</span>
                  <span className="card-row-status-badge">PAID</span>
                </div>
              </div>
            </div>
          </div>

          <table className="receipt-table">
            <thead>
              <tr>
                <th>ITEM</th>
                <th>QTY</th>
                <th>PRICE</th>
                <th>AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <div>{item.product.name}</div>
                    <small className="receipt-item-meta">
                      SIZE: {item.size} / COLOR: {item.color?.name || item.color}
                      <span
                        className="receipt-item-color-box"
                        style={{ backgroundColor: item.color?.hex || item.color }}
                        title={item.color?.name || item.color}
                      />
                    </small>
                  </td>
                  <td>{item.quantity}</td>
                  <td>₹{item.product.price.toFixed(2)}</td>
                  <td>₹{(item.product.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="receipt-totals">
            <div className="receipt-total-row">
              <span>SUBTOTAL:</span>
              <span>₹{order.subtotal.toFixed(2)}</span>
            </div>
            <div className="receipt-total-row">
              <span>SHIPPING:</span>
              <span>{order.shippingCharge > 0 ? `₹${order.shippingCharge.toFixed(2)}` : 'FREE'}</span>
            </div>
            <div className="receipt-total-row final-amount">
              <span>TOTAL:</span>
              <span>₹{order.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="receipt-footer-msg">
            <p>THANK YOU FOR SHOPPING WITH ETERNIX</p>
            <p>If you have any questions, contact us at info@eternix.com</p>
          </div>

          <div className="receipt-modal-actions-bar">
            <Button variant="solid" onClick={handlePrint}>PRINT RECEIPT</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
