import { useState } from "react";

type SetValue<T> = T | ((previousValue: T) => T);

export default function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: SetValue<T>) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);

      if (item === null) {
        return initialValue;
      }

      return JSON.parse(item) as T;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: SetValue<T>) => {
    try {
      setStoredValue((previousValue) => {
        const nextValue =
          typeof value === "function"
            ? (value as (previousValue: T) => T)(previousValue)
            : value;

        localStorage.setItem(key, JSON.stringify(nextValue));

        return nextValue;
      });
    } catch {
      // Ignore localStorage errors
    }
  };

  return [storedValue, setValue];
}