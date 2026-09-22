---
version: alpha
name: The Service Record
description: The shop's work order, printed on the paper it lives on. Oat paper ground, graphite ink, hairline rules, tabular figures, and one oxblood accent spent only on the phone. The arrangement is the familiar auto-shop one; the materials are not.
colors:
  primary: "#23262b"
  secondary: "#5c6168"
  tertiary: "#7a1f1f"
  tertiary-deep: "#5e1616"
  neutral: "#f2efe6"
  leaf: "#fbf9f4"
  carbon: "#e8e3d5"
  rule: "#cfc9bb"
  rule-strong: "#a8a294"
typography:
  display-xl:
    fontFamily: Bricolage Grotesque
    fontSize: 60px
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: -0.02em
  display-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -0.01em
  heading-md:
    fontFamily: Bricolage Grotesque
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.15
  body-lg:
    fontFamily: Archivo
    fontSize: 19px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Archivo
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.6
  form-md:
    fontFamily: Courier Prime
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "tnum"
  form-label:
    fontFamily: Courier Prime
    fontSize: 11px
    fontWeight: 400
    letterSpacing: 0.18em
rounded:
  sm: 3px
spacing:
  xs: 4px
  sm: 8px
  md: 20px
  lg: 40px
  xl: 64px
components:
  page:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
  leaf-panel:
    backgroundColor: "{colors.leaf}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md}"
  photo-slot:
    backgroundColor: "{colors.carbon}"
    textColor: "{colors.secondary}"
    typography: "{typography.form-label}"
    rounded: "{rounded.sm}"
  rule-hairline:
    backgroundColor: "{colors.rule}"
    height: "1px"
  rule-emphasis:
    backgroundColor: "{colors.rule-strong}"
    height: "1px"
  button-call:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.neutral}"
    typography: "{typography.display-lg}"
    rounded: "{rounded.sm}"
  button-call-hover:
    backgroundColor: "{colors.tertiary-deep}"
    textColor: "{colors.neutral}"
  call-bar-mobile:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.neutral}"
    typography: "{typography.form-md}"
---

# The Service Record

## Overview

The site is JK Auto Repair's service record: the work order a mechanic fills in, printed on the paper it lives on. The client asked for the arrangement customers already expect from an auto shop site, so the structure is conventional on purpose: a hero, service groups, reviews, makes, areas served, hours and map, and a closing call. The distinction comes from material and restraint rather than from an unusual layout.

The visitor is a driver with a misbehaving car, standing outdoors on a phone, often reading Spanish first. The craft bar is the local Mercer County shops this competes with, and the way to beat them is clarity, legibility and trust rather than polish, since there are no photographs yet to out-polish anyone with.

## Colors

One ground, one ink, one accent. Nothing else earns color.

- **Neutral, oat paper (#f2efe6):** the page. Warm enough to read as paper, dull enough to stay quiet outdoors.
- **Leaf (#fbf9f4):** the off-white panels laid on the paper: address block, hours, service groups.
- **Carbon (#e8e3d5):** the carbon-copy tint, used for photo slots and any awaiting-content state.
- **Primary, graphite (#23262b):** all body and heading text. Not pure black, which reads as screen rather than print.
- **Secondary, slate (#5c6168):** labels, captions, and the trade line under the shop name.
- **Rule (#cfc9bb) and rule-strong (#a8a294):** hairlines. A form is ruled, not boxed, so borders stay 1px.
- **Tertiary, oxblood (#7a1f1f):** the phone, the primary button, and the few links that lead somewhere decisive. Because it appears nowhere else, oxblood always means "act".

Measured contrast: graphite on paper 13.9:1, graphite on leaf 14.8:1, slate on paper 6.1:1, oxblood on paper 8.2:1, paper on oxblood 8.2:1. Every pairing clears WCAG AA.

## Typography

Three faces, each with one job.

- **Bricolage Grotesque** sets headings and the shop name. It carries more personality than a neutral grotesque without raising its voice, which is what keeps the conventional arrangement from reading as a template.
- **Archivo** sets body copy. It handles Spanish diacritics cleanly and stays legible in daylight.
- **Courier Prime** sets everything a service record treats as a measurement: field labels, hours, the phone number, and the trust row. It is used for data, never as decoration for its own sake.

Headings run tight, with balanced wrapping. Body runs at 1.6 and stays near 65 characters. Every figure uses tabular numerals so hours and phone numbers align down the column.

## Layout

One centered column at 1152px maximum, on a familiar vertical rhythm: hero, services, about and mission, reviews, photos, makes, areas, hours and location, closing call. The hero splits three-to-two, with the shop name and phone on the left and the ruled address block plus the photo slot on the right.

Spacing steps are 4, 8, 20, 40 and 64 pixels, with more space above a heading than below it. On a phone everything stacks, and a slim oxblood call bar pins to the bottom of the screen.

## Elevation & Depth

Paper does not cast hard shadows. Panels sit on the page with a 1px rule and one soft, low-contrast lift. There are no offset shadows, no glows, and no blur.

## Shapes

Corners are 3px, barely rounded, closer to a cut sheet than a card. Rules are 1px hairlines. Awaiting-content frames use a 1px dashed rule so they read as a blank field on a form rather than as a broken image. The only drawn icon is a thin arrow at 1.5px stroke.

## Components

- **Call button:** oxblood, paper text, label in the display face and the number in the typewriter face so it never wraps. It darkens on hover rather than moving.
- **Open stamp:** a small ruled chip beside today's hours, oxblood when open, slate when closed. It renders only after load, from the shop's clock in America/New_York, so the prerendered HTML never claims a state it cannot know.
- **Address block:** a leaf panel with ruled lines, the street on one line and "Suite C" on its own, because the building has units A, B and C and the Google Business Profile is registered with Suite C.
- **Service groups:** leaf panels, each item on its own ruled row.
- **Photo slot:** a carbon frame at 4:3 with a dashed rule and a label saying photos are coming. Dropping in real images is a content change, not a layout change.
- **Mobile call bar:** fixed to the bottom under 640px, oxblood, the number always one tap away.

## Do's and Don'ts

Do keep oxblood for the phone and the primary action alone. Do set every figure in tabular numerals. Do let hairlines carry structure instead of heavy borders or shadows. Do write Spanish as Spanish rather than as a translation of the English.

Don't add a second accent color. Don't introduce gradients, glass, gradient text, or hard offset shadows. Don't put a kicker or eyebrow above a heading. Don't fill the photo slot with stock photography or a texture standing in for a picture. Don't show a star rating, a review count, or a testimonial: the shop has six Google reviews and none on file, so the site links to the real ones instead.
