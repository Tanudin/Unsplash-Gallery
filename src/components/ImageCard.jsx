import '../css/ImageCard.css';

/**
 * Individual image card component with hover overlay
 * @param {Object} image - Image object with urls and metadata
 * @param {Function} onClick - Callback when card is clicked
 */
const ImageCard = ({ image, onClick }) => {
  if (!image) return null;

  const { urls, alt_description, user } = image;

  const handleClick = () => {
    if (onClick) {
      onClick(image);
    }
  };

  return (
    <div className="image-card" onClick={handleClick}>
      <img
        src={urls.small}
        alt={alt_description || 'Unsplash image'}
        className="image"
        loading="lazy"
      />
      <div className="image-overlay">
        <div className="image-info">
          <p className="photographer">
            Photo by <span className="photographer-name">{user.name}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
