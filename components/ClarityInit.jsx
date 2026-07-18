"use client";

import { useEffect, useRef } from "react";
import Clarity from "@microsoft/clarity";

const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

export default function ClarityInit() {
  const initialized = useRef(false);

  useEffect(() => {
    if (!CLARITY_PROJECT_ID || initialized.current) return;
    Clarity.init(CLARITY_PROJECT_ID);
    initialized.current = true;
  }, []);

  return null;
}
