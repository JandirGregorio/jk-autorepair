---
version: alpha
name: Service Minimal
description: The grammar the large service brands use, applied to a neighborhood shop. Near-black and white full-bleed bands alternating, one family at light weights, pill actions, hairlines, and no accent color at all.
colors:
  primary: "#0c0c0d"
  neutral: "#ffffff"
  muted: "#f4f4f5"
  secondary: "#6b6b70"
  secondary-dark: "#b4b4b8"
  line: "#e3e3e5"
  line-dark: "#2a2a2d"
typography:
  display-xl:
    fontFamily: Manrope
    fontSize: 72px
    fontWeight: 300
    lineHeight: 1.05
    letterSpacing: -0.02em
  display-lg:
    fontFamily: Manrope
    fontSize: 40px
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: -0.02em
  heading-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: 300
    lineHeight: 1.2
  body-lg:
    fontFamily: Manrope
    fontSize: 19px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: Manrope
    fontSize: 11px
    fontWeight: 500
    letterSpacing: 0.22em
rounded:
  sm: 4px
  full: 999px
spacing:
  xs: 8px
  sm: 16px
  md: 32px
  lg: 56px
  xl: 112px
components:
  page:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
  band-dark:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.body-md}"
  band-muted:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.primary}"
  text-secondary:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.secondary}"
  text-secondary-dark:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.secondary-dark}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.full}"
    typography: "{typography.body-md}"
  button-primary-dark:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
  rule:
    backgroundColor: "{colors.line}"
    height: "1px"
  rule-dark:
    backgroundColor: "{colors.line-dark}"
    height: "1px"
---

# Service Minimal

## Overview

This is the visual grammar the large service brands run on, applied honestly to a one-man shop in Hamilton Township. The page is a stack of full-bleed bands that alternate near-black, white, and a pale gray. Each band holds one idea, centered, with a light-weight headline, a short gray supporting line, and at most two pill actions.

The restraint is the identity. There is no accent color, no border treatment, no shadow, and no ornament, so the only things that can carry the page are typography, spacing, and eventually photography. It borrows the pattern language of large service brands, never their marks, names, or typefaces, and nothing on the page implies the shop is affiliated with any manufacturer.

## Colors

Two grounds and one gray, plus two hairlines.

- **Primary, near-black (#0c0c0d):** the hero, the reviews band, the closing band, the footer, and the primary button.
- **Neutral, white (#ffffff):** the content bands and the type on dark grounds.
- **Muted, pale gray (#f4f4f5):** alternating bands and empty photo frames, so the rhythm reads without a rule.
- **Secondary (#6b6b70) and secondary-dark (#b4b4b8):** supporting text on light and dark grounds.
- **Line (#e3e3e5) and line-dark (#2a2a2d):** hairlines for the hours table and outlined buttons.

Measured contrast: white on near-black 19.1:1, near-black on white 19.1:1, secondary on white 5.2:1, secondary-dark on near-black 7.4:1. Every pairing clears WCAG AA.

## Typography

One family, Manrope, at 300 for every heading and 400 for text. A single family is part of the look: the large brands run one voice everywhere and let size and weight carry hierarchy.

Headings are light and tightly tracked at -0.02em, which is what keeps a 72px shop name from shouting. Supporting lines sit in gray at body size. Labels are 11px at 0.22em tracking, used sparingly. Phone numbers and hours use tabular numerals.

## Layout

Everything is a full-bleed band with a 1024px content column and 112px of vertical padding on desktop, half that on a phone. The hero occupies 85% of the viewport height and is centered both ways.

Bands alternate white, pale gray, and near-black down the page: hero, one-line promise, services, about and mission, photography, reviews, makes, areas served, hours and location, closing call. Content inside a band is either centered or a simple two-column split.

## Elevation & Depth

None. There are no shadows and no raised surfaces. Separation comes from changing the ground color between bands, which is why the band rhythm matters more here than in a bordered design.

## Shapes

Actions are pills. Everything else is square: photo frames, the map, and the hours rows, which are separated by 1px hairlines rather than boxes. Corner rounding elsewhere is 4px at most.

## Components

- **Pill buttons:** filled and outlined, in a light and a dark variant since they appear on both grounds. They change color on hover rather than moving.
- **Open status:** a plain line beside today's hours rather than a badge. It renders only after load, from the shop's clock in America/New_York, so the prerendered HTML never claims a state it cannot know.
- **Address block:** the street on one line and "Suite C" on its own, because the building has units A, B and C and the Google Business Profile is registered with Suite C.
- **Photo frames:** 16:9, pale gray, labelled as awaiting real photographs. This grammar leans on photography more than any other direction considered, so these frames are the largest open question in the design.
- **Mobile call bar:** fixed to the bottom under 640px, near-black, the number always one tap away.

## Do's and Don'ts

Do let whitespace do the work. Do keep one family and one weight for headings. Do alternate band grounds to create rhythm. Do write Spanish as Spanish rather than as a translation of the English.

Don't introduce an accent color, a shadow, a gradient, or a card. Don't add a second typeface. Don't imitate any manufacturer's wordmark, badge, or typeface, or suggest the shop is an authorized service center for a brand it has no relationship with. Don't fill the photo frames with stock photography. Don't show a star rating, a review count, or a testimonial: the shop has six Google reviews and none on file, so the site links to the real ones instead.
