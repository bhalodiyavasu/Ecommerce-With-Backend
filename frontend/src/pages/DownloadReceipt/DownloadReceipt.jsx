import { useState, useEffect } from 'react';
import { useSearchParams, Link, Navigate } from 'react-router-dom';
import { useVerifySessionQuery } from '@/store/actions/paymentActions';
import Button from '@/components/common/Button/Button';
import './DownloadReceipt.css';

export default function DownloadReceipt() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [downloadState, setDownloadState] = useState('idle'); // 'idle' | 'downloading' | 'success' | 'failed'
  const [downloadError, setDownloadError] = useState('');
  const [autoDownloadTriggered, setAutoDownloadTriggered] = useState(false);

  const { data, isLoading, isError } = useVerifySessionQuery(sessionId, { skip: !sessionId });

  const handleDownloadReceipt = async () => {
    if (!data?.order) return;
    setDownloadState('downloading');
    setDownloadError('');
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/orders/receipt-by-session/${sessionId}`,
        { credentials: 'include' }
      );
      if (!response.ok) throw new Error('Failed to download PDF');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Eternix_Receipt_${(data.order.orderNumber || data.order._id).toUpperCase()}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      setDownloadState('success');
    } catch (err) {
      console.error(err);
      setDownloadState('failed');
      setDownloadError('Download failed. Please try again.');
    }
  };

  useEffect(() => {
    if (data?.order && !autoDownloadTriggered) {
      setAutoDownloadTriggered(true);
      handleDownloadReceipt();
    }
  }, [data, autoDownloadTriggered]);

  if (!sessionId || isError) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="download-receipt-page">
      <div className="download-noise"></div>
      
      <div className="download-receipt-card">
        <div className="brand-logo-header">
          ETERNIX
        </div>

        <div className={`receipt-icon-container ${downloadState} ${isLoading ? 'loading' : ''}`}>
          {isLoading || downloadState === 'downloading' ? (
            <>
              <svg className="pdf-icon spinning" width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 18V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 15L12 18L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="pulse-ripple"></div>
            </>
          ) : downloadState === 'success' ? (
            <svg className="success-check-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg className="pdf-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>

        <h2 className="download-receipt-heading">
          {isLoading && 'Verifying Session...'}
          {!isLoading && downloadState === 'downloading' && 'Generating Receipt...'}
          {!isLoading && downloadState === 'success' && 'Receipt Downloaded!'}
          {!isLoading && downloadState === 'failed' && 'Download Interrupted'}
          {!isLoading && downloadState === 'idle' && 'Download Receipt'}
        </h2>

        <p className="download-receipt-text">
          {isLoading && 'Verifying payment status, please wait...'}
          {!isLoading && downloadState === 'downloading' && 'Preparing your secure PDF invoice. This will download automatically.'}
          {!isLoading && downloadState === 'success' && 'Your PDF has been saved. If your download did not start, use the button below.'}
          {!isLoading && downloadState === 'failed' && (downloadError || 'Something went wrong. Please click below to download manually.')}
          {!isLoading && downloadState === 'idle' && 'Your secure PDF invoice is ready for download.'}
        </p>

        {data?.order && (
          <div className="download-receipt-details">
            <div className="download-receipt-detail-item">
              <span className="lbl">ORDER ID</span>
              <span className="val">{(data.order.orderNumber || data.order._id).toUpperCase()}</span>
            </div>
            <div className="download-receipt-detail-item">
              <span className="lbl">BILL TO</span>
              <span className="val">{data.order.contactInfo?.email}</span>
            </div>
            <div className="download-receipt-detail-item">
              <span className="lbl">TOTAL AMOUNT</span>
              <span className="val">₹{data.order.totalAmount?.toFixed(2)}</span>
            </div>
          </div>
        )}

        <div className="download-receipt-actions">
          <Button 
            type="button" 
            variant="solid" 
            className="download-receipt-main-btn"
            disabled={isLoading || downloadState === 'downloading'}
            onClick={handleDownloadReceipt}
          >
            {downloadState === 'downloading' ? 'DOWNLOADING...' : 'DOWNLOAD RECEIPT'}
          </Button>
          <Link to="/" className="download-receipt-back-link">
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    </div>
  );
}
