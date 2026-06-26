import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useToast } from '@/contexts/ToastContext';
import { useGoogleAuthMutation } from '@/store/actions/authActions';
import { useAddToCartMutation } from '@/store/actions/cartActions';
import { resetAllApiStates } from '@/store';
import { getItems, clearItems } from '@/utils/guestCart';
import { auth, googleProvider } from '@/config/firebase';
import { signInWithPopup } from 'firebase/auth';
import Loader from '@/components/common/Loader/Loader';
import modelImg from '@/assets/extracted/authImage.png';
import logoIcon from '@/assets/icons/logo.svg';
import './Auth.css';

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [googleAuth] = useGoogleAuthMutation();
  const [addToCart] = useAddToCartMutation();
  const [isLoading, setIsLoading] = useState(false);

  const mergeGuestCart = async () => {
    for (const item of getItems()) {
      try { await addToCart({ productId: item.product._id, quantity: item.quantity, size: item.size, color: item.color }).unwrap(); } catch { }
    }
    clearItems();
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      const res = await googleAuth(idToken).unwrap();
      if (res.status === 'SUCCESS') {
        localStorage.setItem('userToken', res.token);
        dispatch(resetAllApiStates());
        await mergeGuestCart();
        showToast('success', res.message || 'WELCOME!');
        navigate(location.state?.from || '/', { replace: true, state: { justLoggedIn: true } });
      } else {
        showToast('error', 'AUTHENTICATION FAILED.');
        setIsLoading(false);
      }
    } catch (err) {
      if (err?.code !== 'auth/popup-closed-by-user') {
        showToast('error', 'SIGN-IN FAILED. PLEASE TRY AGAIN.');
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-split-layout">

        <div className="login-media-side">
          <img src={modelImg} alt="Editorial Fashion Cover" className="login-cover-img" />
          <div className="login-media-overlay">
            <span className="media-season-pill">EST. 2026 / VOL. 1</span>
            <h3 className="media-slogan">ELEVATING WORKSPACE SILHOUETTE</h3>
          </div>
        </div>

        <div className="login-form-side">
          {isLoading ? (
            <div className="auth-form-loader-container">
              <Loader />
              <span className="auth-loader-text">AUTHENTICATING...</span>
            </div>
          ) : (
            <div className="login-form-wrapper">
              <div className="login-logo-container" onClick={() => navigate('/')}>
                <img src={logoIcon} alt="Eternix Logo" className="login-logo-img" />
              </div>

              <div className="login-form-block animate-fade-in">
                <h2 className="form-action-title">WELCOME</h2>
                <p className="form-action-subtitle">Sign in with your Google account to access your profile and orders.</p>

                <button className="google-signin-btn" onClick={handleGoogleSignIn}>
                  <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                  <span>CONTINUE WITH GOOGLE</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
