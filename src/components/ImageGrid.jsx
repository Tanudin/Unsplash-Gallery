import ImageCard from './ImageCard';
import '../css/ImageGrid.css';

/**
 * Grid component that displays images in a masonry layout
 * @param {Array} images - Array of image objects to display
 * @param {Function} onImageClick - Callback when an image is clicked
 */
const ImageGrid = ({ images, onImageClick }) => {
  if (!images || images.length === 0) {
    return (
      <div className="no-results">
        <p>No results found</p>
      </div>
    );
  }

  const numColumns = 3;
  const imageColumns = Array.from({ length: numColumns }, () => []);
  const columnHeights = new Array(numColumns).fill(0);

  for (const image of images) {
    const minHeightIndex = columnHeights.indexOf(Math.min(...columnHeights));
    imageColumns[minHeightIndex].push(image);
    
    const imageWidth = image.width || 300;
    const imageHeight = image.height || 400;
    const aspectRatio = imageHeight / imageWidth;
    columnHeights[minHeightIndex] += aspectRatio * 300 + 24;
  }

  return (
    <div className="image-grid">
      {imageColumns.map((columnImages, columnIndex) => (
        <div key={`column-${columnIndex}`} className="image-column">
          {columnImages.map((image) => (
            <ImageCard key={image.id} image={image} onClick={onImageClick} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
