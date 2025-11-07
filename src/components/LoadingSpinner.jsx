import '../css/LoadingSpinner.css';

/**
 * Loading spinner component with text
 */
const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
