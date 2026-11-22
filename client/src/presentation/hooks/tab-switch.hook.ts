import { useEffect, useRef, useState } from 'react';

export type ProctorEvent = {
  type: 'tab_hidden' | 'window_blur' | 'fullscreen_exit' | 'window_resized';
  at: number;
  questionId?: string;
  durationMs?: number;
};

export function useProctoring(
  enabled: boolean,
  onEvent?: (e: ProctorEvent) => void
) {
  const [events, setEvents] = useState<ProctorEvent[]>([]);

  const away = useRef<{ type: ProctorEvent['type']; at: number } | null>(null);
  const onEventRef = useRef(onEvent);
  onEventRef.current = onEvent;

  useEffect(() => {
    if (!enabled) return;

    const push = (e: ProctorEvent) => {
      setEvents((p) => [...p, e]);

      onEventRef.current?.(e);
    };

    const left = (type: 'tab_hidden' | 'window_blur') => {
      if (away.current) return; // avoid double counting
      away.current = { type, at: Date.now() };
    };

    const returned = () => {
      const a = away.current;
      if (!a) return;
      away.current = null;
      const durationMs = Date.now() - a.at;
      if (durationMs < 1000) return; // ignore permission popups etc.
      push({ type: a.type, at: a.at, durationMs });
    };

    const onVisibility = () =>
      document.hidden ? left('tab_hidden') : returned();
    const onBlur = () => left('window_blur');
    const onFocus = () => returned();

    const onFullscreen = () => {
      if (!document.fullscreenElement)
        push({ type: 'fullscreen_exit', at: Date.now() });
    };

    const onResize = () => {
      const tooSmall =
        window.innerWidth < screen.availWidth * 0.8 ||
        window.innerHeight < screen.availHeight * 0.7;
      if (tooSmall && !document.fullscreenElement)
        push({ type: 'window_resized', at: Date.now() });
    };

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);
    document.addEventListener('fullscreenchange', onFullscreen);
    window.addEventListener('resize', onResize);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('fullscreenchange', onFullscreen);
      window.removeEventListener('resize', onResize);
    };
  }, [enabled]);

  return { events };
}
