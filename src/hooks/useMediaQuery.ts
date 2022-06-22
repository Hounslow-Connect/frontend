import { useState, useEffect } from 'react';

export const useMediaQuery = (mediaQuerySize: string) => {
  const [isMobile, setIsMobile] = useState({ matches: window.matchMedia(mediaQuerySize).matches });

  const handler = (e: MediaQueryListEvent) => setIsMobile({matches: e.matches});

  useEffect(() => {
    window.matchMedia(mediaQuerySize).addEventListener('change', handler);
  }, [isMobile, mediaQuerySize]);

  return {
    isMobile,
  }
}
