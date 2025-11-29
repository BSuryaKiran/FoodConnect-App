// Import React hooks: useState for state management, useEffect for side effects
import React, { useState, useEffect } from 'react';
// Import React Router components for navigation and routing
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
// Import all page components
import Home from './components/Home.jsx';           // Landing page component
import Login from './components/Login.jsx';         // Authentication page component
import DonorDashboard from './components/DonorDashboard.jsx';   // Dashboard for food donors
import SeekerDashboard from './components/SeekerDashboard.jsx'; // Dashboard for food seekers
import Footer from './components/Footer.jsx';       // Footer component
// Import main app styles
import './App.css';

function AppContent() {
  // State to store current logged-in user data (null if not logged in)
  const [user, setUser] = useState(null);
  // State to track if app is still loading/initializing
  const [loading, setLoading] = useState(true);
  // Hook to programmatically navigate between routes
  const navigate = useNavigate();

  // Effect hook to check for existing user session when component mounts
  useEffect(() => {
    // Try to get stored user data from browser's localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        // Parse JSON string back to user object and set in state
        setUser(JSON.parse(storedUser));
      } catch (error) {
        // If JSON parsing fails, log error and clean up invalid data
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('currentUser');
      }
    }
    // Set loading to false once initialization is complete
    setLoading(false);
  }, []); // Empty dependency array means this runs once on mount

  // Function called when user successfully logs in
  const handleLogin = (userData) => {
    // Update user state with logged-in user data
    setUser(userData);
    // Store user data in localStorage to persist session across browser refreshes
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  // Function called when user clicks logout
  const handleLogout = () => {
    // Clear user state (sets to null = logged out)
    setUser(null);
    // Remove user data from localStorage to clear persisted session
    localStorage.removeItem('currentUser');
    // Navigate back to home page after logout
    navigate('/');
  };

  // Function to navigate to login page when user clicks "Get Started"
  const handleGetStarted = () => {
    navigate('/login');
  };

  // Show loading spinner while app initializes (checking for existing user session)
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div> {/* Animated loading spinner */}
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="App"> {/* Main app container */}
      <div className="app-content"> {/* Content area that grows to fill space */}
        <Routes> {/* React Router Routes container */}
          {/* Home route - shows different content based on login status */}
          <Route 
            path="/" 
            element={
              user ? (
                // If user is logged in, redirect to their dashboard based on user type
                <Navigate to={`/${user.type}-dashboard`} replace />
              ) : (
                // If not logged in, show home page with "Get Started" button
                <Home onGetStarted={handleGetStarted} />
              )
            } 
          />
          {/* Login route - redirects to dashboard if already logged in */}
          <Route 
            path="/login" 
            element={
              user ? (
                // If already logged in, redirect to appropriate dashboard
                <Navigate to={`/${user.type}-dashboard`} replace />
              ) : (
                // If not logged in, show login form with login handler
                <Login onLogin={handleLogin} />
              )
            } 
          />
          {/* Donor dashboard route - only accessible to logged-in donors */}
          <Route 
            path="/donor-dashboard" 
            element={
              user && user.type === 'donor' ? (
                // User is logged in AND is a donor - show donor dashboard
                <DonorDashboard user={user} onLogout={handleLogout} />
              ) : (
                // User not logged in or not a donor - redirect to home
                <Navigate to="/" replace />
              )
            } 
          />
          {/* Seeker dashboard route - only accessible to logged-in seekers */}
          <Route 
            path="/seeker-dashboard" 
            element={
              user && user.type === 'seeker' ? (
                // User is logged in AND is a seeker - show seeker dashboard
                <SeekerDashboard user={user} onLogout={handleLogout} />
              ) : (
                // User not logged in or not a seeker - redirect to home
                <Navigate to="/" replace />
              )
            } 
          />
          {/* Catch-all route for invalid URLs - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      {/* Footer component always visible at bottom with Get Started handler */}
      <Footer onGetStarted={handleGetStarted} />
    </div>
  );
}

// Main App component that wraps everything in React Router
function App() {
  return (
    // BrowserRouter provides routing context to all child components
    <Router>
      {/* AppContent contains all the routing logic and state management */}
      <AppContent />
    </Router>
  );
}

// Export App component as default export for use in main.jsx
export default App;
