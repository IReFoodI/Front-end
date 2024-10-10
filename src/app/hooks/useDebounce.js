import { useEffect, useState } from "react"

export function useDebounce(value, delay = 500) {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value)
    }, delay)
    return () => clearTimeout(timeout)
  }, [value, delay])
  return debounceValue
}
