import '../css/ErrorMessage.css';

/**
 * Error message display component
 * @param {string} message - Error message to display
 */
const ErrorMessage = ({ message }) => {
  return (
    <div className="error-container">
      <h2 className="error-title">Something went wrong</h2>
      <p className="error-message">
        {message || 'An error occurred'}
      </p>
    </div>
  );
};

export default ErrorMessage;
