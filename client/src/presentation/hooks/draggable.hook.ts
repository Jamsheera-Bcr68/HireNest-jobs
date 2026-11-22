import type React from 'react';
import { useCallback, useRef, useState } from 'react';

export function useDraggable(
  containerRef: React.RefObject<HTMLElement | null>
) {
  const elRef = useRef<HTMLDivElement>(null);

  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const drag = useRef({ active: false, offsetx: 0, offsetY: 0 });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const el = elRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();

    drag.current = {
      active: true,
      offsetx: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };

    el.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!drag.current.active || !elRef.current || !containerRef.current)
        return;
      const c = containerRef.current.getBoundingClientRect();
      const el = elRef.current.getBoundingClientRect();
      let x = e.clientX - c.left - drag.current.offsetx;
      let y = e.clientY - c.top - drag.current.offsetY;
      x = Math.max(0, Math.min(x, c.width - el.width));
      y = Math.max(0, Math.min(y, c.height - el.height));

      setPos({ x, y });
    },
    [containerRef]
  );

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    drag.current.active = false;
    elRef.current?.releasePointerCapture(e.pointerId);
  }, []);

  return { elRef, pos, onPointerDown, onPointerMove, onPointerUp };
}
