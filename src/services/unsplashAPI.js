import { generateMockImages, mockSearchResults } from './mockData';

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const BASE_URL = 'https://api.unsplash.com';
const USE_MOCK_DATA = true;

/**
 * Fetches random photos from Unsplash API
 * @param {number} count - Number of photos to fetch (default: 10)
 * @returns {Promise<Array>} Array of photo objects
 */
export const fetchRandomPhotos = async (count = 10) => {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateMockImages(count, Math.floor(Math.random() * 100)));
      }, 300); 
    });
  }

  const response = await fetch(
    `${BASE_URL}/photos/random?count=${count}&client_id=${ACCESS_KEY}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

/**
 * Searches for photos matching the query
 * @param {string} query - Search term
 * @param {number} page - Page number for pagination (default: 1)
 * @param {number} perPage - Number of results per page (default: 12)
 * @returns {Promise<Object>} Object containing results array and pagination info
 */
export const searchPhotos = async (query, page = 1, perPage = 12) => {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const queryLower = query.toLowerCase();
        const results = mockSearchResults[queryLower] || generateMockImages(perPage, (page - 1) * perPage);
        resolve({
          results: results,
          total: 100,
          totalPages: 10,
        });
      }, 300);
    });
  }

  if (!query || query.trim() === '') {
    throw new Error('Search query cannot be empty');
  }

  const response = await fetch(
    `${BASE_URL}/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&client_id=${ACCESS_KEY}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return {
    results: data.results,
    total: data.total,
    totalPages: data.total_pages
  };
};
