"use client";

import { useEffect, useRef } from "react";

const kitFormUid = "d6b92e6422";
const kitFormSrc = "https://lifeforgetrading.kit.com/d6b92e6422/index.js";

export function KitForm() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || container.dataset.loaded === "true") {
      return;
    }

    container.dataset.loaded = "true";

    const script = document.createElement("script");
    script.async = true;
    script.dataset.uid = kitFormUid;
    script.src = kitFormSrc;

    container.appendChild(script);
  }, []);

  return <div ref={containerRef} className="kit-form-shell" />;
}
