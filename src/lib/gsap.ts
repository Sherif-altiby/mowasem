import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

// Centralized GSAP plugin registration to avoid duplicate registrations
let pluginsRegistered = false;

export function registerGSAPPlugins() {
  if (typeof window === "undefined") return;
  
  if (!pluginsRegistered) {
    gsap.registerPlugin(ScrollTrigger, Draggable);
    pluginsRegistered = true;
  }
}

export { gsap, ScrollTrigger, Draggable };
