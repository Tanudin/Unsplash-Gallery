export const mockImages = [
  {
    id: 'mock-1',
    urls: {
      small: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      regular: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080',
    },
    alt_description: 'Mountain landscape',
    user: {
      name: 'John Doe',
    },
    links: {
      html: 'https://unsplash.com/photos/mountain',
    },
  },
  {
    id: 'mock-2',
    urls: {
      small: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
      regular: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1080',
    },
    alt_description: 'Forest nature',
    user: {
      name: 'Jane Smith',
    },
    links: {
      html: 'https://unsplash.com/photos/forest',
    },
  },
  {
    id: 'mock-3',
    urls: {
      small: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400',
      regular: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1080',
    },
    alt_description: 'Sunset lake',
    user: {
      name: 'Mike Johnson',
    },
    links: {
      html: 'https://unsplash.com/photos/lake',
    },
  },
  {
    id: 'mock-4',
    urls: {
      small: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400',
      regular: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1080',
    },
    alt_description: 'Ocean waves',
    user: {
      name: 'Sarah Williams',
    },
    links: {
      html: 'https://unsplash.com/photos/ocean',
    },
  },
  {
    id: 'mock-5',
    urls: {
      small: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400',
      regular: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1080',
    },
    alt_description: 'Autumn trees',
    user: {
      name: 'Tom Brown',
    },
    links: {
      html: 'https://unsplash.com/photos/autumn',
    },
  },
  {
    id: 'mock-6',
    urls: {
      small: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
      regular: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1080',
    },
    alt_description: 'Winter snow',
    user: {
      name: 'Emma Davis',
    },
    links: {
      html: 'https://unsplash.com/photos/winter',
    },
  },
  {
    id: 'mock-7',
    urls: {
      small: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400',
      regular: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1080',
    },
    alt_description: 'Desert landscape',
    user: {
      name: 'Chris Wilson',
    },
    links: {
      html: 'https://unsplash.com/photos/desert',
    },
  },
  {
    id: 'mock-8',
    urls: {
      small: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400',
      regular: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1080',
    },
    alt_description: 'Waterfall',
    user: {
      name: 'Lisa Anderson',
    },
    links: {
      html: 'https://unsplash.com/photos/waterfall',
    },
  },
  {
    id: 'mock-9',
    urls: {
      small: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
      regular: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1080',
    },
    alt_description: 'Tropical beach',
    user: {
      name: 'David Martinez',
    },
    links: {
      html: 'https://unsplash.com/photos/beach',
    },
  },
  {
    id: 'mock-10',
    urls: {
      small: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400',
      regular: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1080',
    },
    alt_description: 'City skyline',
    user: {
      name: 'Rachel Garcia',
    },
    links: {
      html: 'https://unsplash.com/photos/city',
    },
  },
  {
    id: 'mock-11',
    urls: {
      small: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400',
      regular: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1080',
    },
    alt_description: 'Mountain peak',
    user: {
      name: 'Kevin Lee',
    },
    links: {
      html: 'https://unsplash.com/photos/peak',
    },
  },
  {
    id: 'mock-12',
    urls: {
      small: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400',
      regular: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=1080',
    },
    alt_description: 'Starry night',
    user: {
      name: 'Amy Chen',
    },
    links: {
      html: 'https://unsplash.com/photos/stars',
    },
  },
];

// Generate more mock images by repeating with different IDs
export const generateMockImages = (count = 12, offset = 0) => {
  const images = [];
  for (let i = 0; i < count; i++) {
    const baseIndex = (i + offset) % mockImages.length;
    const baseImage = mockImages[baseIndex];
    images.push({
      ...baseImage,
      id: `mock-${offset + i + 1}`,
    });
  }
  return images;
};

// Mock search results
export const mockSearchResults = {
  nature: mockImages.slice(0, 6),
  city: mockImages.slice(6, 9),
  ocean: mockImages.slice(3, 7),
  mountains: mockImages.slice(0, 5),
};
