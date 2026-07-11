// ServiceModal.tsx
"use client";

import AnimatedDiv from "@/components/common/AnimatedWrapper/AnimatedWrapper";
import { useSyncExternalStore } from "react";
import { X } from "lucide-react";

const sharedBoxClass =
  "px-5 md:px-10 py-3 relative bg-card max-h-[90vh] shadow-xl overflow-hidden";

function ModalContent({
  title,
  onClose,
  isDesktop,
  children,
}: {
  title: string;
  onClose: () => void;
  isDesktop?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <>
      {!isDesktop && (
        <div className="flex justify-center pt-2 pb-1 shrink-0">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>
      )}
      <div className="shrink-0 flex items-center justify-between py-4 border-b border-gray-400">
        <h2 className="text-lg md:text-xl font-semibold text-right w-full">
          {title}
        </h2>
        <button
          onClick={onClose}
          className="cursor-pointer text-foreground hover:text-gray-500 transition"
        >
          <X size={24} />
        </button>
      </div>
      <div className="py-6 overflow-y-auto">{children}</div>
    </>
  );
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(min-width: 768px)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(min-width: 768px)").matches;
}

function getServerSnapshot() {
  return false;
}

function useIsDesktop() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default function ServiceModal({
  isOpen,
  onClose,
  title,
  children,
  className,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const isDesktop = useIsDesktop();

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 !m-0 z-[100] flex ${
        isDesktop ? "items-center" : "items-end"
      } justify-center ${className || ""}`}
    >
      {/* Overlay */}
      <AnimatedDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 w-full h-full bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Single modal — animates based on actual screen size */}
      <AnimatedDiv
        key={isDesktop ? "desktop" : "mobile"}
        initial={isDesktop ? { scale: 0 } : { y: "100%" }}
        animate={isDesktop ? { scale: 1 } : { y: 0 }}
        transition={
          isDesktop
            ? { duration: 0.2 }
            : { duration: 0.35, ease: [0.32, 0.72, 0, 1] }
        }
        className={`${sharedBoxClass} flex flex-col ${
          isDesktop ? "w-[90%] max-w-lg rounded-2xl" : "w-full rounded-t-2xl"
        }`}
      >
        <ModalContent title={title} onClose={onClose} isDesktop={isDesktop}>
          {children}
        </ModalContent>
      </AnimatedDiv>
    </div>
  );
}
