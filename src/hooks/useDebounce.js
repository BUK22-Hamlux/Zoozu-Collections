import { useState, useEffect } from "react";

// useDebounce delays updating the output value until the user has stopped
// changing the input for `delay` milliseconds.
//
// Without debounce: every single keystroke triggers a filter/search operation.
// With debounce (300ms): the operation only runs once the user pauses typing.
// This prevents unnecessary work and makes the UI feel responsive, not janky.
//
// Usage:
//   const debouncedQuery = useDebounce(query, 300);
//   // debouncedQuery only updates 300ms after `query` stops changing

function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timer to update the debounced value after the delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: if `value` changes before the timer fires, cancel the old timer
    // and start a new one. This is what makes it a "debounce" — only the last
    // change within the delay window actually takes effect.
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
