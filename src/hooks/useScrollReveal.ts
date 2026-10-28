import { useEffect } from 'react';

/**
 * useScrollReveal initializes an IntersectionObserver on elements with .reveal-init
 * and adds the .revealed class when they enter the viewport.
 * If IntersectionObserver is not available or reduced motion is preferred,
 * it immediately marks all elements as revealed.
 */
export function useScrollReveal(dependencyKey?: any) {
  useEffect(() => {
    // Check for reduced motion preference
    if (typeof window === 'undefined') return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = document.querySelectorAll('.reveal-init:not(.revealed)');

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    elements.forEach((el) => observer.observe(el));

    // Fallback timer: ensure no elements remain stuck hidden if scroll didn't trigger
    const timeout = setTimeout(() => {
      document.querySelectorAll('.reveal-init:not(.revealed)').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 100) {
          el.classList.add('revealed');
        }
      });
    }, 1500);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [dependencyKey]);
}
