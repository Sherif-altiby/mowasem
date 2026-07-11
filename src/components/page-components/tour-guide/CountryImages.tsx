"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// ── Types ──
interface GalleryImage {
  url: string;
  alt?: string;
}

interface PhotoGalleryProps {
  images: (GalleryImage | string)[];
}

export default function PhotoGallery({ images }: PhotoGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  // ✅ كل الـ hooks قبل أي early return
  // Memoize normalized images to avoid recomputation on every render
  const normalizedImages: GalleryImage[] = useMemo(() =>
    images.map((img) =>
      typeof img === "string" ? { url: img, alt: "" } : img,
    ),
    [images]
  );

  const openLightbox = useCallback((index: number) => {
    if (isAnimatingRef.current) return;
    setSelectedImage(index);
    setIsZoomed(false);
  }, []);

  const closeLightbox = useCallback(() => {
    if (isAnimatingRef.current || !overlayRef.current || !lightboxRef.current)
      return;

    isAnimatingRef.current = true;

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
    });

    gsap.to(lightboxRef.current, {
      opacity: 0,
      scale: 0.92,
      duration: 0.25,
      ease: "power2.in",
      onComplete() {
        setSelectedImage(null);
        setIsZoomed(false);
        isAnimatingRef.current = false;
      },
    });
  }, []);

  const nextImage = useCallback(() => {
    if (selectedImage === null || isAnimatingRef.current) return;
    setSelectedImage((selectedImage + 1) % normalizedImages.length);
    setIsZoomed(false);
  }, [selectedImage, normalizedImages.length]);

  const previousImage = useCallback(() => {
    if (selectedImage === null || isAnimatingRef.current) return;
    setSelectedImage(
      (selectedImage - 1 + normalizedImages.length) % normalizedImages.length,
    );
    setIsZoomed(false);
  }, [selectedImage, normalizedImages.length]);

  const toggleZoom = useCallback(() => setIsZoomed((z) => !z), []);

  // Keyboard navigation
  useGSAP(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") previousImage();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedImage, nextImage, previousImage, closeLightbox]);

  // Animate-in عند الفتح
  useGSAP(() => {
    if (selectedImage === null || !overlayRef.current || !lightboxRef.current)
      return;

    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" },
    );

    gsap.fromTo(
      lightboxRef.current,
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" },
    );
  }, [selectedImage]);

  // ✅ Early return بعد كل الـ hooks
  if (!images || images.length === 0) return null;

  const remainingImages = normalizedImages.length - 5;

  return (
    <div className="shadow-[0_0_8px_0_rgba(0,0,0,0.15)] border border-gray-200 rounded-3xl p-4">
      {/* Mobile Layout */}
      <div className="md:hidden space-y-2">
        <div
          className="relative w-full h-72 rounded-2xl overflow-hidden cursor-pointer"
          onClick={() => openLightbox(activeMobileIndex)}
        >
          <Image
            src={normalizedImages[activeMobileIndex].url}
            alt={normalizedImages[activeMobileIndex].alt || "Main view"}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory">
          {normalizedImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveMobileIndex(index)}
              className={`relative shrink-0 w-20 h-16 rounded-xl overflow-hidden snap-start transition-all ${
                activeMobileIndex === index
                  ? "ring-2 ring-white opacity-100"
                  : "opacity-60 hover:opacity-85"
              }`}
            >
              <Image
                src={image.url}
                alt={image.alt || `Image ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Grid Layout */}
      <div
        className="hidden md:grid md:grid-cols-4 md:grid-rows-2 gap-2 md:h-125 rounded-2xl overflow-hidden cursor-pointer"
        onClick={() => openLightbox(0)}
      >
        {normalizedImages[0] && (
          <div
            className={`relative ${
              normalizedImages.length === 1
                ? "col-span-4 row-span-2"
                : "col-span-2 row-span-2"
            } h-full`}
          >
            <Image
              src={normalizedImages[0].url}
              alt={normalizedImages[0].alt || "Main view"}
              fill
              className="object-cover hover:opacity-95 transition-opacity"
              priority
            />
          </div>
        )}

        {normalizedImages.slice(1, 5).map((image, index) => (
          <div
            key={index}
            className="relative col-span-1 row-span-1 h-full"
            onClick={(e) => {
              e.stopPropagation();
              openLightbox(index + 1);
            }}
          >
            <Image
              src={image.url}
              alt={image.alt || `Gallery image ${index + 2}`}
              fill
              className="object-cover hover:opacity-95 transition-opacity"
            />
            {index === 3 && remainingImages > 0 && (
              <div className="absolute inset-0 bg-black/50 hover:bg-black/40 transition-colors flex items-center justify-center text-white font-bold text-xl backdrop-blur-sm">
                +{remainingImages}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Lightbox ── */}
      {selectedImage !== null && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
          style={{ opacity: 0 }}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 bg-card/10 hover:bg-card/20 text-white p-2 rounded-full transition-colors"
            aria-label="Close gallery"
          >
            <X className="w-6 h-6" />
          </button>

          {normalizedImages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); previousImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-card/10 hover:bg-card/20 text-white p-3 rounded-full transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {normalizedImages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-card/10 hover:bg-card/20 text-white p-3 rounded-full transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          <button
            onClick={(e) => { e.stopPropagation(); toggleZoom(); }}
            className="absolute top-4 left-4 z-10 bg-card/10 hover:bg-card/20 text-white p-2 rounded-full transition-colors"
            aria-label={isZoomed ? "Zoom out" : "Zoom in"}
          >
            <ZoomIn className={`w-6 h-6 transition-transform ${isZoomed ? "scale-125" : ""}`} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-card/10 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
            {selectedImage + 1} / {normalizedImages.length}
          </div>

          <div
            ref={lightboxRef}
            onClick={(e) => e.stopPropagation()}
            className={`relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center transition-transform ${
              isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
            }`}
            style={{ opacity: 0 }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={normalizedImages[selectedImage].url}
                alt={normalizedImages[selectedImage].alt || `Image ${selectedImage + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>

          {normalizedImages.length > 1 && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 max-w-4xl w-full px-4">
              <div className="flex gap-2 overflow-x-auto pb-2 justify-center">
                {normalizedImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(index);
                      setIsZoomed(false);
                    }}
                    className={`relative shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-white scale-110"
                        : "border-white/30 hover:border-white/60"
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}