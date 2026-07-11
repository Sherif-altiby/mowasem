"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import Image from "next/image";
import { gsap } from "gsap";

interface PhotoGalleryProps {
  images: ({ url: string; alt: string } | string)[];
}

export default function PhotoGallery({ images }: PhotoGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [failedUrls, setFailedUrls] = useState<Set<string>>(new Set());

  // GSAP refs
  const overlayRef    = useRef<HTMLDivElement>(null);
  const imageWrapRef  = useRef<HTMLDivElement>(null);
  const controlsRef   = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const counterRef    = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  // ─── Derived data (no hooks below this) ─────────────────────────────────────
  const allNormalized: { url: string; caption: string }[] = (images ?? []).map(
    (img) =>
      typeof img === "string"
        ? { url: img, caption: "" }
        : { url: img.url, caption: img.alt },
  );

  const normalizedImages = allNormalized.filter((img) => !failedUrls.has(img.url));
  const maxVisibleImages  = 5;
  const remainingImages   = normalizedImages.length - maxVisibleImages;
  const isOpen            = selectedImage !== null;

  // ─── Handlers ───────────────────────────────────────────────────────────────
  const handleImageError = useCallback((url: string) => {
    setFailedUrls((prev) => new Set(prev).add(url));
  }, []);

  const openLightbox = useCallback((index: number) => {
    setSelectedImage(index);
    setIsZoomed(false);
  }, []);

  const closeLightbox = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        setSelectedImage(null);
        setIsZoomed(false);
        isAnimatingRef.current = false;
      },
    });

    tl.to(imageWrapRef.current,  { scale: 0.92, opacity: 0, duration: 0.2,  ease: "power2.in" }, 0)
      .to(controlsRef.current,   { opacity: 0,              duration: 0.15, ease: "power1.in" }, 0)
      .to(overlayRef.current,    { opacity: 0,              duration: 0.25, ease: "power2.in" }, 0.05);
  }, []);

  const animateImageSwap = useCallback((direction: 1 | -1, cb: () => void) => {
    if (!imageWrapRef.current) { cb(); return; }

    gsap.to(imageWrapRef.current, {
      x: direction * -40,
      opacity: 0,
      duration: 0.15,
      ease: "power2.in",
      onComplete: () => {
        cb();
        gsap.fromTo(
          imageWrapRef.current,
          { x: direction * 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.2, ease: "power2.out" },
        );
      },
    });
  }, []);

  const nextImage = useCallback(() => {
    if (selectedImage === null) return;
    animateImageSwap(-1, () => {
      setSelectedImage((prev) =>
        prev === null ? 0 : (prev + 1) % normalizedImages.length,
      );
      setIsZoomed(false);
    });
  }, [selectedImage, normalizedImages.length, animateImageSwap]);

  const previousImage = useCallback(() => {
    if (selectedImage === null) return;
    animateImageSwap(1, () => {
      setSelectedImage((prev) =>
        prev === null
          ? 0
          : (prev - 1 + normalizedImages.length) % normalizedImages.length,
      );
      setIsZoomed(false);
    });
  }, [selectedImage, normalizedImages.length, animateImageSwap]);

  // ─── GSAP entrance animation ─────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;

    const raf = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        tl.fromTo(overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" }, 0);

        tl.fromTo(imageWrapRef.current,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.4)" }, 0.05);

        tl.fromTo(controlsRef.current,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }, 0.15);

        tl.fromTo(
          [counterRef.current, thumbnailsRef.current],
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.25, ease: "power2.out", stagger: 0.05 }, 0.2);
      });

      return () => ctx.revert();
    });

    return () => cancelAnimationFrame(raf);
  }, [isOpen]);

  // ─── Keyboard navigation ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextImage();
      else if (e.key === "ArrowLeft")  previousImage();
      else if (e.key === "Escape")     closeLightbox();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, nextImage, previousImage, closeLightbox]);

  // ─── Early return AFTER all hooks ────────────────────────────────────────────
  if (!images || images.length === 0 || normalizedImages.length === 0) return null;

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <h2 className="sr-only">معرض الصور</h2>

      {/* Grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 h-[300px] md:h-[500px] rounded-2xl overflow-hidden cursor-pointer"
        onClick={() => openLightbox(0)}
      >
        {normalizedImages[0] && (
          <div
            className={`relative ${
              normalizedImages.length === 1 ? "col-span-4 row-span-2" : "col-span-2 row-span-2"
            } h-full`}
          >
            <Image
              src={normalizedImages[0].url}
              alt={normalizedImages[0].caption || "Main view"}
              fill
              className="object-cover hover:opacity-95 transition-opacity"
              priority
              onError={() => handleImageError(normalizedImages[0].url)}
            />
          </div>
        )}

        {normalizedImages.slice(1, 5).map((image, index) => (
          <div
            key={image.url}
            className="relative col-span-1 row-span-1 h-full hidden md:block"
            onClick={(e) => { e.stopPropagation(); openLightbox(index + 1); }}
          >
            <Image
              src={image.url}
              alt={image.caption || `Gallery image ${index + 2}`}
              fill
              className="object-cover hover:opacity-95 transition-opacity"
              onError={() => handleImageError(image.url)}
            />
            {index === 3 && remainingImages > 0 && (
              <div className="absolute inset-0 bg-black/50 hover:bg-black/40 transition-colors flex items-center justify-center text-white font-bold text-xl backdrop-blur-sm">
                +{remainingImages}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile show-all button */}
      <div className="md:hidden flex justify-end">
        <button
          onClick={() => openLightbox(0)}
          className="bg-card/90 backdrop-blur text-sm px-4 py-2 rounded-full shadow-sm font-medium border"
        >
          {`عرض كل ${normalizedImages.length} صورة`}
        </button>
      </div>

      {/* Lightbox */}
      {isOpen && selectedImage !== null && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-[#05050561] backdrop-blur-sm z-50 flex items-center justify-center p-4"
          style={{ opacity: 0 }}
          onClick={closeLightbox}
        >
          {/* Controls */}
          <div ref={controlsRef} className="contents" style={{ opacity: 0 }}>
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-card/10 hover:bg-card/20 text-white p-2 rounded-full transition-colors"
              aria-label="Close gallery"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); setIsZoomed((z) => !z); }}
              className="absolute top-4 left-4 z-10 bg-card/10 hover:bg-card/20 text-white p-2 rounded-full transition-colors"
              aria-label={isZoomed ? "Zoom out" : "Zoom in"}
            >
              <ZoomIn className={`w-6 h-6 transition-transform ${isZoomed ? "scale-125" : ""}`} />
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
          </div>

          {/* Counter */}
          <div
            ref={counterRef}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-card/10 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm"
            style={{ opacity: 0 }}
          >
            {selectedImage + 1} / {normalizedImages.length}
          </div>

          {/* Main image */}
          <div
            ref={imageWrapRef}
            onClick={(e) => e.stopPropagation()}
            style={{ opacity: 0 }}
            className={`relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center transition-transform will-change-transform ${
              isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
            }`}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={normalizedImages[selectedImage].url}
                alt={normalizedImages[selectedImage].caption || `صورة ${selectedImage + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
                onError={() => {
                  handleImageError(normalizedImages[selectedImage].url);
                  if (normalizedImages.length - failedUrls.size <= 1) closeLightbox();
                  else nextImage();
                }}
              />
            </div>
          </div>

          {/* Thumbnails */}
          {normalizedImages.length > 1 && (
            <div
              ref={thumbnailsRef}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 max-w-4xl w-full px-4"
              style={{ opacity: 0 }}
            >
              <div className="flex no-scrollbar gap-2 overflow-x-auto pb-2 justify-center">
                {normalizedImages.map((image, index) => (
                  <button
                    key={image.url}
                    onClick={(e) => {
                      e.stopPropagation();
                      animateImageSwap(index > selectedImage ? -1 : 1, () => {
                        setSelectedImage(index);
                        setIsZoomed(false);
                      });
                    }}
                    className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
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
                      onError={() => handleImageError(image.url)}
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