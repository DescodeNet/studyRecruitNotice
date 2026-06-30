# Study Recruit Notice Design System

## 1. Atmosphere & Identity

A warm, practical education landing page for people starting financial literacy study in local groups. It should feel trustworthy and human rather than institutional. The signature is calm green structure with amber action moments, Korean copy given room to breathe, and real study photos carrying the social proof.

## 2. Color

### Palette

| Role | Token | Light | Dark | Usage |
|------|-------|-------|------|-------|
| Surface/page | `bg.DEFAULT` | `#F9F7F3` | n/a | Main warm background |
| Surface/card | `bg.card` | `#FFFFFF` | n/a | Forms, cards, photo surfaces |
| Surface/scrim | `black/70` | rgba black | n/a | Modal/lightbox overlay |
| Text/primary | `txt.primary` | `#2C2C2C` | n/a | Headlines, body |
| Text/secondary | `txt.secondary` | `#6B6B6B` | n/a | Supporting copy |
| Text/muted | `txt.muted` | `#9B9B9B` | n/a | Disabled and minor metadata |
| Accent/primary | `primary.DEFAULT` | `#2D5A4A` | n/a | Navigation, section anchors, focus |
| Accent/primary-light | `primary.light` | `#3D7A64` | n/a | Hover and scrollbar thumb |
| Accent/primary-dark | `primary.dark` | `#1D4A3A` | n/a | Hero overlays, deep green sections |
| Action/accent | `accent.DEFAULT` | `#E8A54B` | n/a | Primary CTA |
| Action/accent-hover | `accent.hover` | `#D4943D` | n/a | CTA hover |
| Status/error | Tailwind red scale | existing | n/a | Form validation |

### Rules
- Use the Tailwind theme tokens in `tailwind.config.js` before raw colors.
- Amber is for action, not decoration.
- Photo overlays may use black/white opacity utilities when the image itself is the surface.

## 3. Typography

### Scale

| Level | Size | Weight | Line Height | Tracking | Usage |
|-------|------|--------|-------------|----------|-------|
| Display | `text-4xl md:text-5xl lg:text-6xl` | 700 | tight | 0 | Hero headline |
| Section H2 | `text-3xl md:text-4xl` | 700 | tight | 0 | Section headings |
| Card H3 | `text-xl` / `text-2xl` | 700 | normal | 0 | Cards, confirmation |
| Body/lg | `text-lg md:text-xl` | 400 | relaxed | 0 | Supporting copy |
| Body | `text-base` | 400 | 1.6 | 0 | Default text |
| Body/sm | `text-sm` | 400-700 | relaxed | 0 | Labels, helper text |

### Font Stack
- Primary: `Pretendard Variable`, `Pretendard`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `sans-serif`

### Rules
- Korean copy uses `word-break: keep-all` and frequent `whitespace-pre-line`.
- Do not introduce a second type family without a clear brand reason.

## 4. Spacing & Layout

### Base Unit
All spacing follows Tailwind's 4px scale.

| Token | Value | Usage |
|-------|-------|-------|
| `gap-2` | 8px | Icon/text and compact inline spacing |
| `gap-3` | 12px | Thumbnail rows |
| `gap-4` | 16px | List items, mobile card gaps |
| `gap-6` | 24px | Form grid and comfortable groups |
| `gap-8` | 32px | Two-column section rhythm |
| `py-14 md:py-20` | 56/80px | Standard section spacing |
| `max-w-4xl` / `max-w-6xl` | 896/1152px | Form and content containers |

### Grid
- Breakpoints follow Tailwind defaults.
- Marketing sections use constrained content widths with full-width section backgrounds.
- Photo grids use stable aspect ratios to prevent layout shift.

## 5. Components

### Section Photo Gallery
- **Structure**: featured image, secondary images, horizontal thumbnail strip, modal lightbox.
- **Spacing**: `gap-3 md:gap-4`, thumbnails `w-28 h-20 md:w-36 md:h-24`.
- **States**: hover scale, focus ring, active press, mobile scroll hint, right edge fade, snap-aligned thumbnails.
- **Accessibility**: photo triggers are buttons with descriptive labels; modal uses `role="dialog"`, `aria-modal`, close/previous/next controls, and Escape/arrow-key support.
- **Motion**: image hover uses transform; modal fades/scales with Framer Motion.

### CTA Form
- **Structure**: labels above inputs, errors below inputs, consent block, two final actions.
- **States**: focus ring, validation error, loading button, submitted confirmation.
- **Accessibility**: required fields are visible, placeholders do not replace labels.

## 6. Motion & Interaction

| Type | Duration | Easing | Usage |
|------|----------|--------|-------|
| Micro | 150-200ms | ease-out | Hover, active, focus feedback |
| Standard | 300-500ms | ease-in-out | Section reveal, modal transition |
| Emphasis | 600ms | ease-in-out | Hero and major section entrance |

### Rules
- Animate only `transform`, `opacity`, and filter-like overlay effects.
- Keep existing Framer Motion `whileInView` reveal language.
- Every clickable visual element needs hover, active, and keyboard focus treatment.

## 7. Depth & Surface

### Strategy
Mixed: tonal section shifts plus soft rounded surfaces and restrained shadows.

| Level | Value | Usage |
|-------|-------|-------|
| Subtle | `shadow-sm`, `border-black/5` | Thumbnails, small image cards |
| Default | `shadow-md` / `shadow-lg` | Image cards |
| Prominent | `shadow-xl`, dark scrim | CTA form and lightbox modal |

### Rules
- Rounded image surfaces use `rounded-xl` or `rounded-2xl`.
- Forms and larger panels may use `rounded-3xl` because that pattern already exists.
- Do not add decorative gradient/orb backgrounds.
