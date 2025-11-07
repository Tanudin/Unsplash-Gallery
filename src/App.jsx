import { useState, useEffect, useCallback, useRef } from 'react';
import SearchBar from './components/SearchBar';
import ImageGrid from './components/ImageGrid';
import ImageModal from './components/ImageModal';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { fetchRandomPhotos, searchPhotos } from './services/unsplashAPI';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import './css/App.css';

/**
 * Main application component for Unsplash Gallery
 * Manages image loading, search functionality, and infinite scroll
 */
function App() {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const isInitialLoadRef = useRef(true);

  useEffect(() => {
    loadInitialPhotos();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Loads initial set of random photos when app starts
   */
  const loadInitialPhotos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setPage(1);
      setHasMore(true);
      const photos = await fetchRandomPhotos(30);
      setImages(photos);
      isInitialLoadRef.current = false;
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Loads more images when user scrolls to bottom
   * Handles both search results and random photos
   */
  const loadMoreImages = useCallback(async () => {
    if (isLoading || !hasMore || isInitialLoadRef.current) return;

    try {
      setIsLoading(true);
      const nextPage = page + 1;

      if (searchTerm) {
        const data = await searchPhotos(searchTerm, nextPage, 30);
        if (data.results.length === 0 || nextPage >= data.totalPages) {
          setHasMore(false);
        }
        setImages(prev => [...prev, ...data.results]);
      } else {
        const photos = await fetchRandomPhotos(30);
        setImages(prev => [...prev, ...photos]);
      }
      
      setPage(nextPage);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, page, searchTerm]);

  const sentinelRef = useInfiniteScroll(loadMoreImages, isLoading, hasMore);

  /**
   * Handles search query and fetches matching photos
   * @param {string} query - Search term entered by user
   */
  const handleSearch = async (query) => {
    if (!query || query.trim() === '') {
      return;
    }

    try {
      setImages([]);
      setIsLoading(true);
      setError(null);
      setPage(1);
      setHasMore(true);
      isInitialLoadRef.current = false;
      
      const data = await searchPhotos(query, 1, 30);
      setImages(data.results);
      
      if (data.totalPages <= 1) {
        setHasMore(false);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles search form submission
   * @param {string} query - Search term to process
   */
  const handleSearchSubmit = (query) => {
    setSearchTerm(query);
    if (!query || query.trim() === '') {
      loadInitialPhotos();
      return;
    }
    handleSearch(query);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  return (
    <div className="app">
      <nav className={`navbar ${isScrolled ? 'navbar-visible' : ''}`}>
        <div className="navbar-content">
          <div className="navbar-search">
            <SearchBar 
              onSearch={handleSearchSubmit}
              value={searchTerm}
              onChange={handleSearchChange}
              presetButtons={['Nature', 'Architecture', 'Travel', 'Wallpapers']}
            />
          </div>
          <div className="navbar-preset-buttons">
            <button onClick={() => handleSearchSubmit('Nature')} className="preset-btn">Nature</button>
            <button onClick={() => handleSearchSubmit('Architecture')} className="preset-btn">Architecture</button>
            <button onClick={() => handleSearchSubmit('Travel')} className="preset-btn">Travel</button>
            <button onClick={() => handleSearchSubmit('Wallpapers')} className="preset-btn">Wallpapers</button>
          </div>
          <h2 className="navbar-title">Unsplash Gallery</h2>
        </div>
      </nav>

      <section className={`hero-section ${isScrolled ? 'hero-hidden' : ''}`}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Unsplash Gallery</h1>
          <p className="hero-subtitle">Scroll down for more results</p>
          <div className="hero-search-wrapper">
            <div className="hero-search">
              <SearchBar 
                onSearch={handleSearchSubmit}
                value={searchTerm}
                onChange={handleSearchChange}
                presetButtons={['Nature', 'Architecture', 'Travel', 'Wallpapers']}
              />
            </div>
          </div>
        </div>
      </section>

      <main className="app-main">
        {error && !isLoading && images.length === 0 && (
          <ErrorMessage message={error} />
        )}
        
        {!error && <ImageGrid images={images} onImageClick={setSelectedImage} />}
        
        {hasMore && !error && images.length > 0 && (
          <div ref={sentinelRef} className="infinite-scroll-sentinel" />
        )}
        
        {isLoading && images.length > 0 && (
          <div className="infinite-scroll-loading">
            <LoadingSpinner />
          </div>
        )}
        
        {isLoading && images.length === 0 && <LoadingSpinner />}
        
        {!hasMore && images.length > 0 && (
          <div className="end-of-results">
            <p>You've reached the end!</p>
          </div>
        )}
      </main>

      {selectedImage && (
        <ImageModal 
          image={selectedImage} 
          onClose={() => setSelectedImage(null)} 
        />
      )}
    </div>
  );
}

export default App;
