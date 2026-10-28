import React, { useEffect, useState, useRef } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
}

export const LuxuryCursor: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Mouse coords
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const lastSparkleTime = useRef(0);
  const sparkleId = useRef(0);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(pointer: fine)');
    if (!media.matches) return;

    setIsEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Spawn trailing gold & burgundy sparkles throttled to ~60ms
      const now = performance.now();
      if (now - lastSparkleTime.current > 50) {
        lastSparkleTime.current = now;
        const colors = ['#D6A85A', '#EAC988', '#F7E7EC', '#7B2948', '#FFD700'];
        const newSparkle: Sparkle = {
          id: ++sparkleId.current,
          x: e.clientX + (Math.random() * 12 - 6),
          y: e.clientY + (Math.random() * 12 - 6),
          size: Math.random() * 5 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360
        };

        setSparkles((prev) => [...prev.slice(-12), newSparkle]);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Detect hover over interactive elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer, [data-interactive]');
      setIsHovered(!!interactive);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', onMouseOver, { passive: true });

    // Render loop for smooth cursor easing
    let rafId: number;
    const updateCursor = () => {
      // Direct dot movement
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }

      // Smooth lag for outer gold ring
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.22;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.22;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId = requestAnimationFrame(updateCursor);
    };

    rafId = requestAnimationFrame(updateCursor);

    // Fade out sparkles
    const sparkleCleaner = setInterval(() => {
      setSparkles((prev) => (prev.length > 0 ? prev.slice(1) : prev));
    }, 90);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(rafId);
      clearInterval(sparkleCleaner);
    };
  }, [isVisible]);

  if (!isEnabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300" style={{ opacity: isVisible ? 1 : 0 }}>
      {/* Trailing Sparkles */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-700 ease-out animate-sparkle"
          style={{
            left: `${s.x}px`,
            top: `${s.y}px`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            color: s.color,
            transform: `rotate(${s.rotation}deg)`
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full opacity-80 drop-shadow-[0_0_4px_rgba(214,168,90,0.8)]">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
        </div>
      ))}

      {/* Outer Eased Gold Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none transition-[width,height,border-color,background-color] duration-200 ease-out ${
          isHovered
            ? 'w-12 h-12 border-[#D6A85A] bg-[#D6A85A]/15 shadow-[0_0_15px_rgba(214,168,90,0.4)] backdrop-blur-[0.5px]'
            : isClicking
            ? 'w-6 h-6 border-[#7B2948] bg-[#7B2948]/20'
            : 'w-8 h-8 border-[#D6A85A]/70 bg-[#D6A85A]/5'
        }`}
      />

      {/* Central Snappy Burgundy Dot */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-[width,height,background-color] duration-150 ${
          isHovered
            ? 'w-2 h-2 bg-[#D6A85A] shadow-[0_0_8px_#D6A85A]'
            : isClicking
            ? 'w-3 h-3 bg-[#621F38]'
            : 'w-2 h-2 bg-[#7B2948]'
        }`}
      />
    </div>
  );
};
