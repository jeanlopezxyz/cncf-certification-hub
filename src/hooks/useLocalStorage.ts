/**
 * Optimized localStorage hook
 * Eliminates repetitive localStorage logic across components
 */

import { useState, useEffect, useCallback } from 'react';
import { optimizedStorage } from '../utils/storage';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: {
    serialize?: (value: T) => string;
    deserialize?: (value: string) => T;
    validator?: (value: unknown) => value is T;
  } = {}
): [T, (value: T | ((prev: T) => T)) => void, boolean] {
  const {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    validator,
  } = options;

  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load initial value
  useEffect(() => {
    try {
      const item = optimizedStorage.getItem(key);
      if (item !== null) {
        const parsed = deserialize(item);
        
        // Validate if validator is provided
        if (validator && !validator(parsed)) {
          console.warn(`Invalid stored value for key ${key}, using initial value`);
          setStoredValue(initialValue);
        } else {
          setStoredValue(parsed);
        }
      }
    } catch (error) {
      console.warn(`Failed to load localStorage key ${key}:`, error);
      setStoredValue(initialValue);
    } finally {
      setIsLoaded(true);
    }
  }, [key, initialValue, deserialize, validator]);

  // Set value function
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        
        const serialized = serialize(valueToStore);
        optimizedStorage.setBatched(key, serialized);
      } catch (error) {
        console.warn(`Failed to set localStorage key ${key}:`, error);
      }
    },
    [key, serialize, storedValue]
  );

  return [storedValue, setValue, isLoaded];
}

/**
 * Hook for boolean localStorage values (common pattern)
 */
export function useLocalStorageBoolean(
  key: string,
  initialValue = false
): [boolean, (value: boolean) => void, boolean] {
  return useLocalStorage(key, initialValue, {
    serialize: (value) => String(value),
    deserialize: (value) => value === 'true',
    validator: (value): value is boolean => typeof value === 'boolean',
  });
}

/**
 * Hook for array localStorage values
 */
export function useLocalStorageArray<T>(
  key: string,
  initialValue: T[] = [],
  validator?: (value: unknown) => value is T[]
): [T[], (value: T[] | ((prev: T[]) => T[])) => void, boolean] {
  return useLocalStorage(key, initialValue, {
    validator: validator || ((value): value is T[] => Array.isArray(value)),
  });
}

/**
 * Hook for object localStorage values
 */
export function useLocalStorageObject<T extends Record<string, unknown>>(
  key: string,
  initialValue: T,
  validator?: (value: unknown) => value is T
): [T, (value: T | ((prev: T) => T)) => void, boolean] {
  return useLocalStorage(key, initialValue, {
    validator: validator || ((value): value is T => 
      typeof value === 'object' && value !== null && !Array.isArray(value)
    ),
  });
}