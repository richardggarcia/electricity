import { useEffect, useRef, useState } from "react";

const defaultOptions = { threshold: 0.2 };

export function useInView(options = defaultOptions) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return [ref, isVisible];
}
