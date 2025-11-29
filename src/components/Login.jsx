// Import React and useState hook for component state management
import React, { useState } from 'react';
// Import CSS styles specific to Login component
import './Login.css';

// Login component - handles user authentication, receives onLogin function as prop
const Login = ({ onLogin }) => {
  // State to track selected user type (donor or seeker) - defaults to 'donor'
  const [userType, setUserType] = useState('donor');
  // State to toggle between login and registration forms
  const [isRegistering, setIsRegistering] = useState(false);
  // State object to store all form input values
  const [formData, setFormData] = useState({
    email: '',        // Required for both login/register
    password: '',     // Required for both login/register
    name: '',         // Required only for registration
    phone: '',        // Required only for registration
    address: '',      // Required only for registration
    organization: ''  // Required only for donor registration
  });
  // State to store form validation errors
  const [errors, setErrors] = useState({});
  // State to show loading spinner during form submission
  const [isLoading, setIsLoading] = useState(false);
  // State to control success dialog visibility
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  // State to store success message text
  const [successMessage, setSuccessMessage] = useState('');

  // Function to handle changes in form input fields
  const handleInputChange = (e) => {
    // Extract name and value from the input element that triggered the change
    const { name, value } = e.target;
    // Update formData state with the new value, preserving other fields
    setFormData(prev => ({
      ...prev,      // Spread existing form data
      [name]: value // Update only the changed field
    }));
    // Clear any existing error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,      // Keep other errors
        [name]: ''    // Clear error for this specific field
      }));
    }
  };

  // Function to validate form data before submission
  const validateForm = () => {
    const newErrors = {}; // Object to collect validation errors
    
    // Email validation - check if present and valid format
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      // Regex pattern to validate email format
      newErrors.email = 'Please enter a valid email';
    }
    
    // Password validation - check if present and meets minimum length
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      // Enforce minimum password length for security
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Additional validation rules that only apply during registration
    if (isRegistering) {
      // Name is required for new account creation
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      
      // Phone number validation for contact purposes
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
        // Check for exactly 10 digits (removes non-digit characters first)
        newErrors.phone = 'Please enter a valid 10-digit phone number';
      }
      
      // Address is required for pickup/delivery coordination
      if (!formData.address) {
        newErrors.address = 'Address is required';
      }
      
      // Organization name is required specifically for donors (not seekers)
      if (userType === 'donor' && !formData.organization) {
        newErrors.organization = 'Organization/Restaurant name is required';
      }
    }
    
    // Update errors state with collected validation errors
    setErrors(newErrors);
    // Return true if no errors found (form is valid)
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle form submission (login or registration)
  const handleSubmit = async (e) => {
    // Prevent default form submission behavior (page refresh)
    e.preventDefault();
    
    // Validate form data before proceeding
    if (!validateForm()) {
      return; // Stop if validation fails
    }

    // Show loading state during submission
    setIsLoading(true);

    // Simulate API call with setTimeout (in real app, this would be actual API call)
    setTimeout(() => {
      if (isRegistering) {
        // Handle successful registration
        setSuccessMessage('Account registered successfully');
        setShowSuccessDialog(true);
        // Reset form fields to empty state after successful registration
        setFormData({
          email: '',
          password: '',
          name: '',
          phone: '',
          address: '',
          organization: ''
        });
        // Switch back to login mode after registration
        setIsRegistering(false);
      } else {
        // Handle successful sign in (accepts any credentials for demo)
        const userData = {
          type: userType,                    // 'donor' or 'seeker'
          email: formData.email,             // User's email
          // Use provided name or default based on user type
          name: formData.name || (userType === 'donor' ? 'Food Donor' : 'Food Seeker'),
          id: Date.now()                     // Simple unique ID using timestamp
        };
        setSuccessMessage('Signed in successfully');
        setShowSuccessDialog(true);
        // After showing success dialog, proceed to call parent's onLogin function
        setTimeout(() => {
          setShowSuccessDialog(false);
          onLogin(userData); // Call parent function to set user state in App.jsx
        }, 1500);
      }
      
      // Hide loading state
      setIsLoading(false);
    }, 800); // 800ms delay to simulate network request
  };

  // Function to switch between login and registration modes
  const toggleMode = () => {
    // Toggle the registration state (true becomes false, false becomes true)
    setIsRegistering(!isRegistering);
    // Clear all form data when switching modes
    setFormData({
      email: '',
      password: '',
      name: '',
      phone: '',
      address: '',
      organization: ''
    });
    // Clear any existing validation errors
    setErrors({});
  };

  // Function to close the success dialog
  const closeSuccessDialog = () => {
    // Hide the success dialog
    setShowSuccessDialog(false);
    // Clear the success message
    setSuccessMessage('');
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <div className="header-nav">
          <button 
            className="back-home-btn"
            onClick={() => window.location.href = '/food-management/'}
            type="button"
          >
            ← Back to Home
          </button>
        </div>
        <div className="logo">
          <span className="logo-icon">🌱</span>
          <h1>FoodConnect</h1>
        </div>
        <p className="tagline">Reduce food wastage, improve food security</p>
      </header>

      <main className="login-main">
        <section className="login-card card fade-in">
          <h2 className="login-title">{isRegistering ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="login-subtitle">{isRegistering ? 'Register to get started' : 'Sign in to continue'}</p>

          {/* User Type Selection */}
          <div className="user-type-selector">
            <button
              type="button"
              className={`type-btn ${userType === 'donor' ? 'active' : ''}`}
              onClick={() => {
                setUserType('donor');
                setFormData({
                  email: '',
                  password: '',
                  name: '',
                  phone: '',
                  address: '',
                  organization: ''
                });
                setErrors({});
              }}
            >
              <span className="type-icon">🍽️</span>
              <span>Food Donor</span>
            </button>
            <button
              type="button"
              className={`type-btn ${userType === 'seeker' ? 'active' : ''}`}
              onClick={() => {
                setUserType('seeker');
                setFormData({
                  email: '',
                  password: '',
                  name: '',
                  phone: '',
                  address: '',
                  organization: ''
                });
                setErrors({});
              }}
            >
              <span className="type-icon">🤝</span>
              <span>Food Seeker</span>
            </button>
          </div>

          {/* Login/Register Form */}
          <form onSubmit={handleSubmit} className="login-form" noValidate>
            {errors.general && (
              <div className="alert alert-error">
                {errors.general}
              </div>
            )}

            {/* Registration fields */}
            {isRegistering && (
              <>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    autoFocus
                  />
                  {errors.name && (
                    <span className="form-error">{errors.name}</span>
                  )}
                </div>

                {userType === 'donor' && (
                  <div className="form-group">
                    <label htmlFor="organization" className="form-label">
                      Organization/Restaurant Name
                    </label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      className="form-input"
                      placeholder="Enter organization or restaurant name"
                      value={formData.organization}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.organization && (
                      <span className="form-error">{errors.organization}</span>
                    )}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.phone && (
                    <span className="form-error">{errors.phone}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    className="form-input form-textarea"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows="3"
                  />
                  {errors.address && (
                    <span className="form-error">{errors.address}</span>
                  )}
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
                autoFocus={!isRegistering}
                autoComplete="email"
              />
              {errors.email && (
                <span className="form-error">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
                autoComplete={isRegistering ? "new-password" : "current-password"}
              />
              {errors.password && (
                <span className="form-error">{errors.password}</span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary login-btn"
              disabled={isLoading}
            >
              {isLoading ? (isRegistering ? 'Creating Account...' : 'Signing in...') : (isRegistering ? 'Register' : 'Sign In')}
            </button>

            <button
              type="button"
              className="btn btn-outline toggle-btn"
              onClick={toggleMode}
            >
              {isRegistering ? 'Already have an account? Sign In' : 'Don\'t have an account? Register'}
            </button>
          </form>

        </section>

        {/* Success Dialog */}
        {showSuccessDialog && (
          <div className="dialog-overlay" onClick={closeSuccessDialog}>
            <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
              <div className="success-icon">✅</div>
              <h3>{successMessage}</h3>
              <button className="btn btn-primary" onClick={closeSuccessDialog}>
                OK
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Login;
