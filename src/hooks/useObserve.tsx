import { useEffect, useRef } from 'react';

export default function useObserve(intersectCallback: VoidFunction) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const intersectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            intersectCallback();
          }
        });
      },
      { rootMargin: '0px 0px 200px 0px' }
    );

    intersectionObserver.observe(ref.current);

    return () => {
      intersectionObserver.disconnect();
    };
  }, [ref, intersectCallback]);

  return ref;
}
