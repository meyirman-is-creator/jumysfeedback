// src/components/ClientOnly.tsx - FULL FILE WITH CHANGES

"use client";

import { useEffect, useState, ReactNode } from 'react';

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function ClientOnly({ children, fallback }: ClientOnlyProps) {
  const [isMounted, setIsMounted] = useState(false);

  // CHANGE: Set isMounted to true on component mount (client-side only)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // CHANGE: Return fallback or null during SSR
  if (!isMounted) {
    return fallback || null;
  }

  return <>{children}</>;
}