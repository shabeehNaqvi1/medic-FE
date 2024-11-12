// components/ConversionTracker.tsx
"use client"; // This makes the component a client-side component

import { useEffect } from "react";

export default function ConversionTracker() {
  useEffect(() => {
    const waitForGtag = () => {
      // @ts-ignore
      if (typeof window !== "undefined" && window.gtag) {
        // @ts-ignore
        window.gtag("event", "conversion", {
          send_to: "AW-16748567566/WWYSCImL6N8ZEI64q7I-",
          value: 1.0,
          currency: "RON",
        });
      } else {
        setTimeout(waitForGtag, 500); // Retry after 500ms if gtag is not yet available
      }
    };

    waitForGtag(); // Start waiting for gtag
  }, []);

  return null; // This component doesn't render anything
}
