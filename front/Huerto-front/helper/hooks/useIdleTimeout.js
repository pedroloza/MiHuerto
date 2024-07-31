import { useEffect, useRef } from "react";

const useIdleTimeout = (onIdle, timeout = 300000) => {
  const timer = useRef(null);

  useEffect(() => {
    const resetTimer = () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(onIdle, timeout);
    };

    const events = [
      "mousemove",
      "mousedown",
      "keypress",
      "scroll",
      "touchstart",
    ];

    const eventHandler = () => resetTimer();

    events.forEach((event) => {
      window.addEventListener(event, eventHandler);
    });

    resetTimer();

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, eventHandler);
      });
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [onIdle, timeout]);

  return timer.current;
};

export default useIdleTimeout;
