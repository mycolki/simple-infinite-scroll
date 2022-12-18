import { useEffect, useRef } from 'react';

export default function useIntersect(intersectCallback: () => void, option: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const intersectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          intersectCallback();
        }
      });
    }, option);

    intersectionObserver.observe(ref.current);

    return () => {
      intersectionObserver.disconnect();
    };
  }, [intersectCallback, ref, option]);

  return ref;
}
