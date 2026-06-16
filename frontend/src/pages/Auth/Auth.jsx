import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/contexts/ToastContext';
import { useRegisterMutation, useLoginMutation } from '@/store/actions/authActions';
import Button from '@/components/common/Button/Button';
import Loader from '@/components/common/Loader/Loader';
import modelImg from '@/assets/extracted/authImage.png';
import logoIcon from '@/assets/icons/logo.svg';
import { Eye, EyeOff } from 'lucide-react';
import './Auth.css';

export default function Auth() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [registerUser, { isLoading: registerLoading }] = useRegisterMutation();
  const [loginUser, { isLoading: loginLoading }] = useLoginMutation();

  const [activeTab, setActiveTab] = useState('login');
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  // Login Form States
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Signup Form States
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Check if state is initialized
    if (setLoginData && setSignupData) {
      setLoginData({ email: '', password: '' });
      setSignupData({ username: '', email: '', password: '' });
    }
    setShowPassword(false);
  }, []);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setLoginData({ email: '', password: '' });
    setSignupData({ username: '', email: '', password: '' });
    setShowPassword(false);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({
        email: loginData.email,
        password: loginData.password
      }).unwrap();

      if (res && res.status === 'SUCCESS') {
        showToast('success', res.message || 'WELCOME BACK!');
        localStorage.setItem('userToken', res.token);
        setIsRedirecting(true);
        navigate('/', { state: { justLoggedIn: true } });
      } else {
        showToast('error', res?.message || 'Login failed.');
      }
    } catch (error) {
      showToast('error', error.data?.message || error.message || 'Login failed.');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser({
        username: signupData.username,
        email: signupData.email,
        password: signupData.password
      }).unwrap();

      if (res && res.status === 'SUCCESS') {
        showToast('success', res.message || 'ACCOUNT CREATED SUCCESSFULLY!');
        localStorage.setItem('userToken', res.token);
        setIsRedirecting(true);
        navigate('/', { state: { justLoggedIn: true } });
      } else {
        showToast('error', res?.message || 'Registration failed.');
      }
    } catch (error) {
      showToast('error', error.data?.message || error.message || 'Registration failed.');
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-split-layout">
        
        {/* Left Side: Editorial cover image */}
        <div className="login-media-side">
          <img src={modelImg} alt="Editorial Fashion Cover" className="login-cover-img" />
          <div className="login-media-overlay">
            <span className="media-season-pill">EST. 2026 / VOL. 1</span>
            <h3 className="media-slogan">ELEVATING WORKSPACE SILHOUETTE</h3>
          </div>
        </div>

        {/* Right Side: Auth forms */}
        <div className="login-form-side">
          {loginLoading || registerLoading || isRedirecting ? (
            <div className="auth-form-loader-container">
              <Loader />
              {isRedirecting && <span className="auth-loader-text">Redirecting...</span>}
            </div>
          ) : (
            <div className="login-form-wrapper">
              {/* Logo area */}
              <div className="login-logo-container" onClick={() => navigate('/')}>
                <img src={logoIcon} alt="Eternix Logo" className="login-logo-img" />
              </div>

              {activeTab === 'login' ? (
                <form onSubmit={handleLoginSubmit} className="login-form-block animate-fade-in" autoComplete="off">
                  {/* Dummy inputs to capture browser autofill */}
                  <input type="text" name="email" className="hidden-autofill-bypass" tabIndex={-1} autoComplete="off" />
                  <input type="password" name="password" className="hidden-autofill-bypass" tabIndex={-1} autoComplete="off" />

                  <h2 className="form-action-title">SIGN IN</h2>
                  <p className="form-action-subtitle">Enter your details to access your account.</p>

                  <div className="login-input-group">
                    <input
                      type="email"
                      name="email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      placeholder="Email Address"
                      required
                      autoComplete="off"
                    />
                  </div>

                  <div className="login-input-group">
                    <div className="password-input-wrapper">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="password-input-field"
                        name="password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        placeholder="Password"
                        required
                        autoComplete="current-password"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="password-toggle-btn"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <EyeOff size={16} className="password-toggle-icon" />
                        ) : (
                          <Eye size={16} className="password-toggle-icon" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="forgot-password-row">
                    <span className="forgot-lnk" onClick={() => showToast('success', 'PASSWORD RESET LINK SENT.')}>
                      Forgot Password?
                    </span>
                  </div>

                  <Button type="submit" variant="solid" fullWidth layout="split" disabled={loginLoading}>
                    <span>{loginLoading ? 'Signing In...' : 'Sign In'}</span>
                    <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 6H39M39 6L33 1M39 6L33 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Button>

                  <div className="auth-switch-row">
                    <span className="auth-switch-text">DON&apos;T HAVE AN ACCOUNT?</span>
                    <button
                      type="button"
                      className="auth-switch-btn"
                      onClick={() => handleTabSwitch('signup')}
                    >
                      SIGN UP
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSignupSubmit} className="login-form-block animate-fade-in" autoComplete="off">
                  {/* Dummy inputs to capture browser autofill */}
                  <input type="text" name="username" className="hidden-autofill-bypass" tabIndex={-1} autoComplete="off" />
                  <input type="text" name="email" className="hidden-autofill-bypass" tabIndex={-1} autoComplete="off" />
                  <input type="password" name="password" className="hidden-autofill-bypass" tabIndex={-1} autoComplete="off" />

                  <h2 className="form-action-title">SIGN UP</h2>
                  <p className="form-action-subtitle">Create an account to track orders and save details.</p>

                  <div className="login-input-group">
                    <input
                      type="text"
                      name="username"
                      value={signupData.username}
                      onChange={handleSignupChange}
                      placeholder="Username"
                      required
                      autoComplete="off"
                    />
                  </div>

                  <div className="login-input-group">
                    <input
                      type="email"
                      name="email"
                      value={signupData.email}
                      onChange={handleSignupChange}
                      placeholder="Email Address"
                      required
                      autoComplete="off"
                    />
                  </div>

                  <div className="login-input-group">
                    <div className="password-input-wrapper">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="password-input-field"
                        name="password"
                        value={signupData.password}
                        onChange={handleSignupChange}
                        placeholder="Password"
                        required
                        autoComplete="new-password"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="password-toggle-btn"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <EyeOff size={16} className="password-toggle-icon" />
                        ) : (
                          <Eye size={16} className="password-toggle-icon" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" variant="solid" fullWidth layout="split" disabled={registerLoading}>
                    <span>{registerLoading ? 'Creating Account...' : 'Create Account'}</span>
                    <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 6H39M39 6L33 1M39 6L33 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Button>

                  <div className="auth-switch-row">
                    <span className="auth-switch-text">ALREADY HAVE AN ACCOUNT?</span>
                    <button
                      type="button"
                      className="auth-switch-btn"
                      onClick={() => handleTabSwitch('login')}
                    >
                      LOG IN
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
