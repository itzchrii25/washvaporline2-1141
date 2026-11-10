# Motion upgrade

- Direction approved by request: stronger cinematic motion, retain branding and content.
- Add reusable motion components and dedicated motion CSS; modify existing landing composition.
- No backend, external media, or dependency changes.
- Keep keyboard/touch access, reduced-motion mode, readable content and functional CTA links.
- Verify: build/lint, desktop pointer tilt, mobile tap/contact dock, scroll reveals, reduced-motion, no overflow.
- Status: complete. Build/lint pass. Browser verified desktop 3D transforms, scroll progress and off-screen particle pause; 320–1440px no horizontal overflow. Reduced-motion hides particles and keeps title visible. Touch menu, WhatsApp form destination and comparison slider verified. Mobile photo parallax disabled to prevent content overlap.