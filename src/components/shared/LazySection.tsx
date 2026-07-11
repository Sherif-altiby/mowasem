"use client";

import React, { useState, useEffect, useRef } from "react";

interface LazySectionProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}

const LazySection = ({ 
  children, 
  fallback, 
  threshold = 0.01, 
  rootMargin = "300px" 
}: LazySectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div ref={sectionRef} className="w-full" style={{ containIntrinsicSize: '0 500px' }}>
      {isVisible ? children : fallback}
    </div>
  );
};

export default LazySection;
