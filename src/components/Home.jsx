// Import React library for component creation
import React from 'react';
// Import CSS styles specific to Home component
import './Home.css';

// Home component - landing page that receives onGetStarted function as prop
const Home = ({ onGetStarted }) => {
  // Function to smoothly scroll to features section when "Learn More" is clicked
  const scrollToFeatures = () => {
    // Find features section element and scroll to it with smooth animation
    document.querySelector('.features-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="home-container"> {/* Main container for entire home page */}
      {/* Fixed navigation bar at top of page */}
      <nav className="navbar">
        <div className="nav-content"> {/* Container for nav content with max-width */}
          <div className="nav-brand"> {/* Left side - logo and brand name */}
            <span className="nav-logo">🌱</span> {/* Plant emoji as logo */}
            <h1 className="nav-title">FoodConnect</h1> {/* App name/title */}
          </div>
          <div className="nav-actions"> {/* Right side - action buttons */}
            {/* Get Started button that calls parent's onGetStarted function */}
            <button className="btn btn-outline nav-btn" onClick={onGetStarted}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Main hero section with primary call-to-action */}
      <section className="hero-section">
        <div className="hero-content"> {/* Grid container for hero text and visual */}
          <div className="hero-text"> {/* Left side - main content and text */}
            {/* Main headline with highlighted text */}
            <h1 className="hero-title">
              Reduce Food Waste,<br /> {/* Line break for better formatting */}
              <span className="hero-highlight">Feed Hope</span> {/* Highlighted portion in green */}
            </h1>
            {/* Descriptive paragraph explaining the platform's purpose */}
            <p className="hero-description">
              Connect food donors with seekers to build a sustainable future. 
              Our platform helps reduce food wastage while improving food security 
              in communities worldwide.
            </p>
            <div className="hero-actions"> {/* Container for action buttons */}
              {/* Primary CTA button - navigates to login/signup */}
              <button className="btn btn-primary btn-large" onClick={onGetStarted}>
                Join the Movement
              </button>
              {/* Secondary button - scrolls to learn more about features */}
              <button className="btn btn-outline btn-large learn-more-btn" onClick={scrollToFeatures}>
                Learn More
              </button>
            </div>
            <div className="hero-stats"> {/* Statistics row to show platform impact */}
              <div className="stat-item"> {/* Individual stat display */}
                <span className="stat-number">10,000+</span> {/* Large number for impact */}
                <span className="stat-label">Meals Saved</span> {/* Description of stat */}
              </div>
              <div className="stat-item"> {/* User engagement metric */}
                <span className="stat-number">500+</span>
                <span className="stat-label">Active Users</span>
              </div>
              <div className="stat-item"> {/* Geographic reach metric */}
                <span className="stat-number">50+</span>
                <span className="stat-label">Cities</span>
              </div>
            </div>
          </div>
          <div className="hero-image"> {/* Right side - visual representation */}
            <div className="hero-visual"> {/* Card container for visual elements */}
              <div className="food-icons"> {/* Top section - food items being donated */}
                <span className="food-icon">🥕</span> {/* Carrot emoji - fresh vegetables */}
                <span className="food-icon">🍞</span> {/* Bread emoji - baked goods */}
                <span className="food-icon">🥗</span> {/* Salad emoji - prepared foods */}
                <span className="food-icon">🍎</span> {/* Apple emoji - fruits */}
                <span className="food-icon">🥛</span> {/* Milk emoji - dairy products */}
              </div>
              {/* Visual connector showing flow from food to community */}
              <div className="connection-line"></div>
              <div className="community-icons"> {/* Bottom section - recipients/community */}
                <span className="community-icon">👨‍👩‍👧‍👦</span> {/* Family emoji - families in need */}
                <span className="community-icon">🏠</span> {/* House emoji - shelter homes */}
                <span className="community-icon">🏦</span> {/* School emoji - educational institutions */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section explaining how the platform works */}
      <section className="features-section">
        <div className="container"> {/* Centered container with max-width */}
          <div className="section-header"> {/* Section title and subtitle */}
            <h2 className="section-title">How FoodConnect Works</h2> {/* Main section heading */}
            {/* Subtitle explaining the simplicity of the process */}
            <p className="section-subtitle">
              Three simple steps to make a meaningful impact in your community
            </p>
          </div>
          
          <div className="features-grid"> {/* Grid layout for feature cards */}
            {/* First feature card - Impact tracking */}
            <div className="feature-card">
              <div className="feature-icon">📊</div> {/* Chart emoji for analytics */}
              <h3 className="feature-title">Track Impact</h3> {/* Feature name */}
              {/* Description of impact tracking functionality */}
              <p className="feature-description">
                Monitor food donations and their impact on reducing waste. 
                See real-time statistics on meals saved and people helped.
              </p>
              <ul className="feature-list"> {/* List of specific capabilities */}
                <li>Real-time donation tracking</li> {/* Live monitoring of donations */}
                <li>Environmental impact metrics</li> {/* CO2 saved, waste reduced */}
                <li>Community impact reports</li> {/* People helped, meals provided */}
              </ul>
            </div>

            {/* Second feature card - Connection (marked as featured/most popular) */}
            <div className="feature-card featured">
              <div className="feature-icon">🤝</div> {/* Handshake emoji for connection */}
              <h3 className="feature-title">Connect</h3> {/* Core feature - connecting users */}
              {/* Description of matching and connection functionality */}
              <p className="feature-description">
                Link donors with seekers to distribute surplus food efficiently. 
                Build lasting partnerships within your community.
              </p>
              <ul className="feature-list"> {/* Connection-specific features */}
                <li>Smart matching system</li> {/* Algorithm-based user matching */}
                <li>Direct communication tools</li> {/* In-app messaging */}
                <li>Location-based connections</li> {/* Geographic proximity matching */}
              </ul>
            </div>

            {/* Third feature card - Social and environmental impact */}
            <div className="feature-card">
              <div className="feature-icon">🌍</div> {/* Earth emoji for global impact */}
              <h3 className="feature-title">Make a Difference</h3> {/* Impact-focused feature */}
              {/* Description of broader social and environmental benefits */}
              <p className="feature-description">
                Contribute to food security and environmental sustainability. 
                Every donation helps create a better world.
              </p>
              <ul className="feature-list"> {/* List of impact areas */}
                <li>Reduce carbon footprint</li> {/* Environmental benefit */}
                <li>Support local communities</li> {/* Social benefit */}
                <li>Build sustainable practices</li> {/* Long-term change */}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-step process explanation section */}
      <section className="process-section">
        <div className="container"> {/* Centered container */}
          <div className="section-header"> {/* Section title area */}
            <h2 className="section-title">Simple Process, Maximum Impact</h2> {/* Emphasizes ease of use */}
            <p className="section-subtitle">Get started in just a few clicks</p> {/* Reinforces simplicity */}
          </div>
          
          <div className="process-steps"> {/* Container for step flow */}
            {/* Step 1: Account creation */}
            <div className="process-step">
              <div className="step-number">1</div> {/* Numbered circle for step */}
              <div className="step-content"> {/* Step description */}
                <h3>Sign Up</h3> {/* Step title */}
                <p>Choose your role as a food donor or seeker and create your account</p> {/* Step explanation */}
              </div>
            </div>
            
            <div className="process-arrow">→</div> {/* Visual flow indicator */}
            
            {/* Step 2: Listing/requesting food */}
            <div className="process-step">
              <div className="step-number">2</div> {/* Step number */}
              <div className="step-content">
                <h3>List or Request</h3> {/* Action based on user type */}
                <p>Donors list surplus food, seekers request needed items</p> {/* Different actions for different users */}
              </div>
            </div>
            
            <div className="process-arrow">→</div> {/* Flow continues */}
            
            {/* Step 3: Connection and distribution */}
            <div className="process-step">
              <div className="step-number">3</div> {/* Final step */}
              <div className="step-content">
                <h3>Connect & Share</h3> {/* The actual food sharing */}
                <p>Get matched automatically and coordinate food distribution</p> {/* Platform facilitates the connection */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section explaining different user types and their benefits */}
      <section className="user-types-section">
        <div className="container"> {/* Centered content container */}
          <div className="section-header"> {/* Section introduction */}
            <h2 className="section-title">Join as a Donor or Seeker</h2> {/* Clear role options */}
            <p className="section-subtitle">Choose your role and start making an impact today</p> {/* Call to action */}
          </div>
          
          <div className="user-types-grid"> {/* Grid layout for user type cards */}
            {/* Food Donor card - for organizations and individuals with surplus food */}
            <div className="user-type-card">
              <div className="user-type-icon">🍽️</div> {/* Plate/utensils emoji for food service */}
              <h3>Food Donors</h3> {/* User type title */}
              {/* Description of who can be donors */}
              <p>Restaurants, grocery stores, cafeterias, and individuals with surplus food</p>
              <ul className="user-type-benefits"> {/* List of benefits for donors */}
                <li>Reduce food waste costs</li> {/* Financial benefit - less waste disposal */}
                <li>Get tax deduction benefits</li> {/* Tax incentive for donations */}
                <li>Build community reputation</li> {/* Social/PR benefit */}
                <li>Environmental impact tracking</li> {/* See positive environmental impact */}
              </ul>
              {/* CTA button to start as donor */}
              <button className="btn btn-primary user-type-btn" onClick={onGetStarted}>
                Become a Donor
              </button>
            </div>
            
            {/* Food Seeker card - for organizations that help distribute food */}
            <div className="user-type-card">
              <div className="user-type-icon">🤝</div> {/* Handshake emoji for helping/receiving */}
              <h3>Food Seekers</h3> {/* User type title */}
              {/* Description of organizations that can seek food */}
              <p>Food banks, shelters, community kitchens, and charitable organizations</p>
              <ul className="user-type-benefits"> {/* List of benefits for seekers */}
                <li>Access fresh, quality food</li> {/* Get good quality donated food */}
                <li>Coordinate efficient pickups</li> {/* Streamlined logistics */}
                <li>Serve more people in need</li> {/* Expand reach to help more people */}
                <li>Build donor relationships</li> {/* Create ongoing partnerships */}
              </ul>
              {/* CTA button to start as seeker */}
              <button className="btn btn-primary user-type-btn" onClick={onGetStarted}>
                Become a Seeker
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

// Export Home component as default for importing in other files
export default Home;