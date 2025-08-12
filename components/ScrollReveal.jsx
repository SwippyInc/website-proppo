"use client";

import { useEffect, useRef } from "react";
import ScrollReveal from "scrollreveal";

export default function ScrollRevealComponent({ children, options }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ScrollReveal().reveal(ref.current, {
        duration: 1000, // Animation duration in ms
        distance: "20px", // Distance to move
        origin: "bottom", // Animation starting point
        opacity: 0, // Start from invisible
        delay: 100, // Delay before animation
        ...options, // Allow custom options to override defaults
      });
    }

    // Cleanup on unmount
    return () => {
      if (ref.current) {
        ScrollReveal().destroy();
      }
    };
  }, [options]);

  return <div ref={ref}>{children}</div>;
}