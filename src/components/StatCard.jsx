// Import React for component creation
import React from 'react';

// StatCard - Reusable component for displaying statistics with icon and label
// Props: icon (emoji/symbol), value (number/text), label (description), className (optional styling)
const StatCard = ({ icon, value, label, className = '' }) => {
  return (
    // Article element for semantic HTML - represents a self-contained statistic
    <article className={`stat-card card ${className}`}>
      <div className="stat-icon">{icon}</div> {/* Display icon/emoji */}
      <div className="stat-content"> {/* Container for text content */}
        <h3 className="stat-value">{value}</h3> {/* Large number/value */}
        <p className="stat-label">{label}</p>   {/* Description of what the stat represents */}
      </div>
    </article>
  );
};

// Export component for use in dashboard components
export default StatCard;
