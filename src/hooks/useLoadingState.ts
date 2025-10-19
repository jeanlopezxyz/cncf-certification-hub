import { useState, useEffect } from 'react';

interface UseLoadingStateOptions {
  minLoadingTime?: number;
  initialLoading?: boolean;
}

export const useLoadingState = (options: UseLoadingStateOptions = {}) => {
  const { minLoadingTime = 500, initialLoading = false } = options;
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [startTime, setStartTime] = useState<number | null>(null);

  const startLoading = () => {
    setIsLoading(true);
    setStartTime(Date.now());
  };

  const stopLoading = () => {
    if (startTime) {
      const elapsed = Date.now() - startTime;
      if (elapsed < minLoadingTime) {
        setTimeout(() => {
          setIsLoading(false);
          setStartTime(null);
        }, minLoadingTime - elapsed);
      } else {
        setIsLoading(false);
        setStartTime(null);
      }
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (startTime) {
        setIsLoading(false);
        setStartTime(null);
      }
    };
  }, [startTime]);

  return {
    isLoading,
    startLoading,
    stopLoading,
    setLoading: setIsLoading
  };
};

export default useLoadingState;