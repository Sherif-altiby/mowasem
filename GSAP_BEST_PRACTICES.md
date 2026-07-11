# GSAP Best Practices

This document outlines the GSAP best practices implemented in this project to ensure optimal performance and user experience.

## Implemented Practices

### 1. Centralized Plugin Registration
- **Location**: `src/lib/gsap.ts`
- **Practice**: All GSAP plugins are registered once in a centralized location to avoid duplicate registrations
- **Usage**: Import `registerGSAPPlugins()` and call it at the top of components that need GSAP
- **Benefits**: Prevents duplicate registrations and memory leaks

### 2. Using @gsap/react
- **Package**: `@gsap/react` installed
- **Practice**: Use `useGSAP` hook instead of `useEffect` for GSAP animations
- **Benefits**: Automatic cleanup of animations, prevents memory leaks
- **Example**:
```tsx
import { useGSAP } from "@gsap/react";

useGSAP(() => {
  gsap.to(element, { opacity: 1 });
}, { scope: ref, dependencies: [...] });
```

### 3. Reduced Motion Support
- **Location**: `src/components/common/AnimatedWrapper/AnimatedWrapper.tsx`
- **Practice**: Use `gsap.matchMedia()` to respect user's motion preferences
- **Implementation**:
```tsx
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  // Animations only run if user prefers motion
});
```

### 4. Responsive Animations
- **Location**: `src/hooks/useGSAPSwiper.ts`
- **Practice**: Disable complex animations on smaller screens using matchMedia
- **Example**:
```tsx
mm.add("(min-width: 768px)", () => {
  // Animations only on desktop/tablet
});
```

### 5. Optimized Animation Durations
- **Target**: 0.6s - 1s for most animations
- **Updated Components**:
  - `AnimatedWrapper`: Default duration changed from 0.5s to 0.6s
  - `HotelCard`: Entrance stagger optimized to 0.6s
  - `BlogCard`: Entrance animation changed to 0.6s
  - `TourCard`: Hover animations reduced from 0.7s to 0.5s
  - `TourSlider`: Scroll animations set to 0.6s

### 6. CSS Performance Optimizations
- **Location**: `src/app/globals.css`
- **Classes Added**:
  - `.gsap-animate`: For elements with both transform and opacity animations
  - `.gsap-animate-transform`: For elements with only transform animations
  - `.gsap-animate-opacity`: For elements with only opacity animations
- **Usage**: Add these classes to animated elements for better performance

## Guidelines for Future Development

### When to Use GSAP
Use GSAP animations only for:
- Hero Section entrance animations
- CTA Buttons hover effects
- Cards entering the viewport
- Navbar show/hide transitions
- Complex scroll interactions

**Avoid** animating every element - keep it minimal and purposeful.

### Preferred Properties
**Use these performant properties:**
- `transform: translateY()`
- `transform: scale()`
- `transform: rotate()`
- `opacity`

**Avoid these expensive properties:**
- `top`, `left`, `right`, `bottom`
- `width`, `height`
- `margin`, `padding`
- `filter: blur()` on large elements

### Animation Duration Guidelines
- **Hero animations**: 0.6s - 1s
- **Card entrance**: 0.5s - 0.6s
- **Hover effects**: 0.3s - 0.5s
- **Scroll triggers**: 0.6s - 0.8s
- **Avoid**: Durations longer than 1s for UI elements

### ScrollTrigger Best Practices
- Use a single timeline per section instead of multiple ScrollTriggers
- Use `scrub: true` only for parallax or progress animations
- Avoid using ScrollTrigger on every element
- Example:
```tsx
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: section,
    start: "top 85%",
  }
});

tl.from(".card", {
  y: 80,
  opacity: 0,
  stagger: 0.15
});
```

### Component Structure
Keep animations scoped to their components:
- Each component manages its own animations
- Use `gsap.context()` or `useGSAP` for cleanup
- Don't pollute global GSAP instances

### Image Optimization
- Use Next.js `<Image>` component with `priority` for hero images
- Use `sizes` attribute for responsive images
- Lazy load images below the fold

### Memory Management
- Always clean up animations on unmount
- Use `gsap.context()` or `useGSAP` hook
- Kill draggable instances on unmount
- Clear intervals and timeouts

## Component-Specific Notes

### AnimatedWrapper
- Uses `useGSAP` hook for automatic cleanup
- Supports reduced motion preferences
- Default duration: 0.6s
- Use for simple entrance/scroll animations

### useGSAPSwiper
- Centralized plugin registration
- Responsive: Draggable only enabled on desktop (min-width: 768px)
- Uses `gsap.context()` for cleanup
- Throttled drag updates for performance

### Card Components (TourCard, HotelCard, BlogCard)
- Hover animations use GSAP for smooth transitions
- Entrance animations use staggered timelines
- Durations optimized to 0.5s - 0.6s
- Consider using CSS transitions for simple hovers

## Performance Checklist

Before adding new GSAP animations:
- [ ] Is the animation necessary for UX?
- [ ] Can CSS transitions handle this instead?
- [ ] Am I using transform/opacity only?
- [ ] Is the duration between 0.6s and 1s?
- [ ] Am I using `useGSAP` or `gsap.context()`?
- [ ] Does this respect reduced motion preferences?
- [ ] Is this disabled on mobile if complex?
- [ ] Will this cause memory leaks without cleanup?

## References
- [GSAP Performance Guide](https://greensock.com/docs/v3/Performance)
- [GSAP React Integration](https://greensock.com/docs/v3/Plugins/GSAP/react)
- [Web Animations Performance](https://web.dev/animations-guide/)
