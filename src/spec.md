# Specification

## Summary
**Goal:** Build a single-page, mobile-first Valentine proposal story in React with slow, gentle, premium-feeling animations, ending in a canvas particle slideshow that forms user-provided images and finishes with a permanent final message.

**Planned changes:**
- Create a multi-step interactive proposal flow:
  - Step 1 centered glowing card with exact text “Will you be my Valentine? 💌”, buttons “Yes 💖” and “No 😶”, and a subtle smooth background heartbeat/floating-hearts animation.
  - Track escalating “No” clicks: (1) cute begging guy appears; (2) guy becomes sad/crying then slowly walks off-screen; (3) remove “No” button and show crying cat that gently pushes/lifts the “Yes” button.
  - On “Yes”, trigger a smooth magical celebration (roses/flowers/hearts rain + glow/sparkles/confetti) and animate the cat to happy-cry.
  - Transition to the final love message screen showing the provided text exactly with premium typography and slow fade-in.
  - Add an extra slide reachable via a bottom button (e.g., “Next 💌” / “One more thing…”) showing the provided long emotional message exactly.
  - Add a bottom-center heart-only button with gentle breathing glow; clicking it transitions into the particle slideshow module.
- Implement a self-contained Particle Slideshow Module that renders only inside `<section id="particleSlideshowSection"></section>`:
  - Module creates and manages a `<canvas>` in that section; all styling scoped under `#particleSlideshowSection` only.
  - Image input system that does not hardcode file paths and preserves provided order (hidden ordered `<img>` tags and/or a pasteable URL array), supporting the uploaded “image 5 the last .jpg” as the final image.
  - “No blank white screen” entry: canvas visible immediately with scattered particles or a soft loading indicator while preloading; start slideshow only after all images load successfully.
  - Canvas particle animation using `requestAnimationFrame`, responsive sizing with `devicePixelRatio`, and aspect-ratio-correct fitting:
    - For each image: scattered → form identical pixel-sampled dot mosaic (~3s) → hold (3s) → break apart (~3s) → next.
    - Last image: forms and remains permanently; particles become subtly multi-colored; then show bottom text exactly: “i love you deep down bottom of my heart from surya” (slow fade-in + slight upward motion, permanent).
  - Expose global integration functions `startParticleSlideshow()` and `stopParticleSlideshow()` for clean start/stop and cleanup.
- Apply a consistent pastel Valentine theme (no blue/purple as primary) with modern romantic typography, soft glows, and gentle micro-interactions across all steps.

**User-visible outcome:** Users can go through a romantic, animated Valentine proposal interaction (with escalating “No” reactions and a “Yes” celebration), read the final messages, then press a heart button to enter a pure-white particle-canvas slideshow that forms the provided image(s) and ends on a permanent final image and bottom text.
