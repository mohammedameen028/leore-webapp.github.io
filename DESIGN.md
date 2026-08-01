---
name: Leore
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1c1c'
  surface-container: '#1f2020'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e4e2e1'
  on-surface-variant: '#c4c7c7'
  inverse-surface: '#e4e2e1'
  inverse-on-surface: '#303030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c9c6c5'
  primary: '#c9c6c5'
  on-primary: '#313030'
  primary-container: '#0d0d0d'
  on-primary-container: '#7c7a7a'
  inverse-primary: '#5f5e5e'
  secondary: '#c6c7c2'
  on-secondary: '#2f312e'
  secondary-container: '#484a46'
  on-secondary-container: '#b8b9b4'
  tertiary: '#e9c349'
  on-tertiary: '#3c2f00'
  tertiary-container: '#120c00'
  on-tertiary-container: '#957700'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c9c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#e3e3de'
  secondary-fixed-dim: '#c6c7c2'
  on-secondary-fixed: '#1a1c19'
  on-secondary-fixed-variant: '#454744'
  tertiary-fixed: '#ffe088'
  tertiary-fixed-dim: '#e9c349'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#574500'
  background: '#131313'
  on-background: '#e4e2e1'
  surface-variant: '#353535'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 72px
    fontWeight: '800'
    lineHeight: 76px
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Sora
    fontSize: 44px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0em
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.15em
  button:
    fontFamily: Sora
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap: 120px
---

## Brand & Style
The design system embodies a premium, minimalist streetwear aesthetic—balancing the raw edge of urban fashion with the sophisticated restraint of high-end luxury. The identity is built on a "solid" foundation, emphasizing structural integrity, permanence, and deliberate composition. 

The visual style is **Minimalist-Modern** with a focus on tactile luxury. It utilizes expansive whitespace to frame products like gallery pieces, creating an atmosphere of exclusivity and focus. The emotional response should be one of quiet confidence, authority, and meticulous craft. High-quality textures and subtle motion are prioritized over decorative elements to maintain a professional yet cutting-edge vibe.

## Colors
The palette is rooted in deep, matte tones to evoke the weight of heavy-gauge cotton and premium hardware. 

- **Primary (Deep Charcoal):** Used for the core UI surfaces to create a "solid" and immersive environment.
- **Secondary (Off-White):** Used for primary typography and highlights, providing a soft contrast that is less harsh than pure white.
- **Tertiary (Muted Gold):** Reserved for singular call-to-actions, limited drops, and status indicators. It acts as the "hallmark" of the brand.
- **Neutral:** Mid-tone charcoals used for borders, secondary buttons, and subtle component layering.

The interface operates exclusively in a high-contrast dark mode to emphasize product photography and maintain a luxury streetwear feel.

## Typography
Typography is the primary architectural element of the design system. 

- **Headlines:** Sora provides a modern, geometric, and "solid" feel. Large display type should be tightly kerned to feel like a singular block of form.
- **Body:** Hanken Grotesk offers a clean, contemporary grotesque feel that is highly readable but maintains a sharp, professional edge.
- **Technical Labels:** JetBrains Mono is used for technical specs, sizing, and price tags to lean into the "utility" aspect of streetwear.

All uppercase styling should be applied to labels and buttons to reinforce the brand's authoritative tone.

## Layout & Spacing
The layout follows a strict 12-column fixed grid for desktop, moving to a 4-column fluid grid for mobile. 

The spacing philosophy is "Generous & Intentional." Vertical rhythms use large gaps (Section Gaps) to separate editorial content, ensuring the UI never feels cluttered. Micro-interactions should utilize the 8px base unit. 

Content should be centered within the max-width container on ultra-wide displays to maintain a curated, editorial look. Product galleries should use asymmetrical layouts—where images span different column counts (e.g., one image spanning 8 columns, the next spanning 4)—to mimic high-fashion lookbooks.

## Elevation & Depth
In this design system, depth is communicated through **Tonal Layering** and **Micro-Borders** rather than traditional shadows.

1.  **Level 0 (Base):** The darkest charcoal (#0D0D0D).
2.  **Level 1 (Surfaces):** Cards and containers use a slightly lighter neutral (#1A1A1A) with a 1px solid border (#262626).
3.  **Interactive States:** On hover, elements slightly shift in tone or gain a Muted Gold border. 

Shadows are almost entirely avoided, except for high-importance overlays (modals), where a sharp, non-diffused 4px "block shadow" can be used to maintain the "solid" brand feel.

## Shapes
The shape language is **Sharp (0px)**. 

Every element—from buttons and input fields to image containers and modals—must have hard 90-degree corners. This reinforces the "solid," structural, and brutalist-lite influence of the brand. There are no exceptions for rounded corners, as the sharpness is a key differentiator in the premium streetwear space.

## Components
- **Buttons:** Primary buttons are solid Off-White with Black text, sharp corners. Secondary buttons are transparent with a 1px Neutral border. Hover states for all buttons should involve a fill-slide animation or a color invert.
- **Input Fields:** Underline-only or 1px bordered boxes with no fill. Labels use the `label-caps` typography style positioned above the field.
- **Cards:** Product cards are borderless by default, using whitespace to separate data. The image should fill the width of the card. Text (Title/Price) is aligned left using `headline-md` and `label-caps`.
- **Chips/Tags:** Small, rectangular boxes with 1px borders. Used for "In Stock," "Limited Edition," or "Size."
- **Lists:** Clean, horizontal dividers (1px thickness, #262626) separating items. High use of padding (24px+) between rows.
- **Interactive Progress:** Use the Muted Gold for thin, 2px loading bars or scroll progress indicators at the top of the viewport.