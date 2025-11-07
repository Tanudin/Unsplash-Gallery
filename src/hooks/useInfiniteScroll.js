import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for implementing infinite scroll functionality
 * @param {Function} callback - Function to call when sentinel is visible
 * @param {boolean} isLoading - Whether data is currently loading
 * @param {boolean} hasMore - Whether more data is available
 * @returns {React.RefObject} Ref to attach to sentinel element
 */
export const useInfiniteScroll = (callback, isLoading, hasMore) => {
  const observerRef = useRef(null);
  const sentinelRef = useRef(null);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoading && hasMore) {
        callback();
      }
    },
    [callback, isLoading, hasMore]
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    };

    observerRef.current = new IntersectionObserver(handleObserver, options);

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observerRef.current.observe(currentSentinel);
    }

    return () => {
      if (observerRef.current && currentSentinel) {
        observerRef.current.unobserve(currentSentinel);
      }
    };
  }, [handleObserver]);

  return sentinelRef;
};
