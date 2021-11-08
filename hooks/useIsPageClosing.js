import { useState, useEffect, useCallback } from 'react';

import { WAITING_FOR_PAGE_CLOSE_ANIMATION, PAGE_CLOSE_ANIMATION_DONE } from '../constants/events';
import { DEFAULT_TRANSITION_DURATION } from '../constants/variables';

const useIsPageClosing = (delay = 0) => {
  const [isPageClosing, setIsPageClosing] = useState(false);

  const closeContent = useCallback(() => {
    setIsPageClosing(true);
    setTimeout(() => {
      document.dispatchEvent(new Event(PAGE_CLOSE_ANIMATION_DONE));
    }, delay);
  }, [delay]);

  useEffect(() => {
    document.addEventListener(WAITING_FOR_PAGE_CLOSE_ANIMATION, closeContent);
    return () => {
      document.removeEventListener(WAITING_FOR_PAGE_CLOSE_ANIMATION, closeContent);
    };
  }, [closeContent]);

  return isPageClosing;
};

export default useIsPageClosing;
