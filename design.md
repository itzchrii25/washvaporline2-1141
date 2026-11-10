# Wash Vapor Line — Design

Premium local cleaning service, Italian language, bright and hygienic rather than clinical. Web only.

## Brand
Sky blue #00A8E8, deep blue #086BC1, ink #17252F, mist #F3FAFE, white. Original red/blue logo retained.
Poppins display paired with DM Sans body, self-hosted. Oversized tight headings and airy body copy.

## Layout and motion
1200px desktop container, asymmetric hero with photograph and floating glass card. Mobile stacked layout with bottom contact dock.
Generous section spacing, blue uppercase labels, thin rules, soft 20–32px radii. Alternate white and pale mist sections; vivid blue final CTA.
Motion upgrade: masked word-by-word hero entrance, spring-based 3D pointer-reactive cards and magnetic CTAs, photo parallax, scroll progress, layered steam particles, breathing badges and light sweeps. Viewport reveals use larger coordinated spring entrances. Ambient motion pauses off-screen; touch gets tap feedback instead of cursor effects. Reduced motion removes translations, particles and loops. No scroll hijacking or loading intro; contact actions stay immediately usable.

## Page and conversion flows
Home composed at pages/index.tsx, main implementation in pages/landing.tsx. Navbar, hero, service cards, benefits, WhatsApp CTA, contact form and map, footer. Before/after section and navigation link removed at user request.
WhatsApp/tel links throughout. Form opens prefilled WhatsApp, no backend or storage. Google Maps loads only after explicit click.

## Content integrity
Stock photos are illustrative. No fabricated reviews or unsupported numerical bactericidal guarantees. Effectiveness depends on surfaces, temperature and contact time.
