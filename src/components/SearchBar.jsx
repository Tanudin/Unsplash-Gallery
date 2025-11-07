import '../css/SearchBar.css';

/**
 * Search bar component with input field and preset buttons
 * @param {Function} onSearch - Callback when search is submitted
 * @param {Array} presetButtons - Array of preset search terms
 * @param {string} value - Current search input value
 * @param {Function} onChange - Callback when input value changes
 */
const SearchBar = ({ onSearch, presetButtons, value, onChange }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value && value.trim()) {
      onSearch(value.trim());
    }
  };

  const handleClear = () => {
    onChange('');
    onSearch('');
  };

  const handlePresetClick = (term) => {
    onChange(term);
    onSearch(term);
  };

  return (
    <div className="search-bar">
      <div className="search-container">
        <form onSubmit={handleSubmit} className="search-form">
          <div className="search-input-wrapper">
            <svg
              className="search-icon"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            
            <input
              type="text"
              className="search-input"
              placeholder="Search for images..."
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
            />
            
            {value && (
              <button
                type="button"
                className="clear-button"
                onClick={handleClear}
              >
                ✕
              </button>
            )}
          </div>
          
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
        
        {presetButtons && presetButtons.length > 0 && (
          <div className="preset-buttons">
            {presetButtons.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => handlePresetClick(term)}
                className="preset-btn"
              >
                {term}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
