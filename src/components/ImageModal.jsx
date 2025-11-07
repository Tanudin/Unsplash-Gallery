import '../css/ImageModal.css';

/**
 * Modal component for displaying full-size image with details
 * @param {Object} image - Image object with full details
 * @param {Function} onClose - Callback to close the modal
 */
const ImageModal = ({ image, onClose }) => {
  if (!image) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div 
      className="modal-backdrop" 
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="modal-content">
        <button 
          className="modal-close" 
          onClick={onClose}
        >
          ×
        </button>
        
        <div className="modal-body">
          <div className="modal-image-section">
            <img 
              src={image.urls.regular} 
              alt={image.alt_description || 'Unsplash image'} 
              className="modal-image"
            />
          </div>

          <div className="modal-info-section">
            <h2 className="modal-title">
              {image.alt_description || 'Untitled'}
            </h2>

            <div className="modal-photographer">
              {image.user?.profile_image?.medium && (
                <img 
                  src={image.user.profile_image.medium} 
                  alt={image.user.name}
                  className="photographer-avatar"
                />
              )}
              <div className="photographer-details">
                <p className="photographer-name">{image.user?.name || 'Unknown'}</p>
                {image.user?.username && (
                  <a 
                    href={`https://unsplash.com/@${image.user.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="photographer-link"
                  >
                    @{image.user.username}
                  </a>
                )}
              </div>
            </div>

            <div className="modal-details">
              <div className="detail-row">
                <span className="detail-label">Dimensions:</span>
                <span className="detail-value">{image.width} × {image.height}</span>
              </div>
              {image.created_at && (
                <div className="detail-row">
                  <span className="detail-label">Published:</span>
                  <span className="detail-value">
                    {new Date(image.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              )}
            </div>

            <div className="modal-actions">
              <a 
                href={image.links.html}
                target="_blank"
                rel="noopener noreferrer"
                className="action-button primary"
              >
                View on Unsplash
              </a>
            </div>

            <div className="modal-credit">
              <p>
                Photo by <a href={`https://unsplash.com/@${image.user?.username || ''}`} target="_blank" rel="noopener noreferrer">{image.user?.name || 'Unknown'}</a> on <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
