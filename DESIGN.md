---
version: alpha
name: El Rotulo
description: The shop's hand-painted sign, scaled to a screen. Enamel on metal, deep sign blue ground, two painted accents, hard offset shadows, hand-cut edges, and a brush script reserved for one line.
colors:
  primary: "#0d3b8c"
  primary-deep: "#072454"
  secondary: "#f6b711"
  tertiary: "#bf2010"
  neutral: "#f7f3e8"
  ink: "#0b0d12"
  brush: "#041a3d"
typography:
  display-xl:
    fontFamily: Bungee
    fontSize: 72px
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: -0.01em
  display-lg:
    fontFamily: Bungee
    fontSize: 36px
    fontWeight: 400
    lineHeight: 1.02
  heading-md:
    fontFamily: Bungee
    fontSize: 30px
    fontWeight: 400
    lineHeight: 1.05
  label-caps:
    fontFamily: Bungee
    fontSize: 12px
    fontWeight: 400
    letterSpacing: 0.1em
  body-md:
    fontFamily: Archivo
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.55
  numerals:
    fontFamily: Archivo
    fontSize: 17px
    fontWeight: 500
    lineHeight: 1.4
    fontFeature: "tnum"
  script-accent:
    fontFamily: Yellowtail
    fontSize: 48px
    fontWeight: 400
    lineHeight: 1.1
rounded:
  sm: 2px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 56px
components:
  button-call:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.neutral}"
    typography: "{typography.display-lg}"
    rounded: "{rounded.sm}"
  badge-open:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.ink}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.sm}"
  panel-enamel:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
  panel-deep:
    backgroundColor: "{colors.primary-deep}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.sm}"
  call-bar-mobile:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.neutral}"
    typography: "{typography.display-lg}"
  sign-shadow:
    backgroundColor: "{colors.brush}"
    textColor: "{colors.neutral}"
---

# El Rotulo

## Overview

The site is JK Auto Repair's hand-painted sign, scaled to a screen. A painted sign is read from across a street by someone already moving, so it says who, what, where, and the phone number, in that order, at full voice. The page refuses the arrangement this category ships by default: a photo hero of a clean bay, a row of identical service cards, a review strip, and a map dropped at the bottom.

Everything is paint on metal. Panels butt against one another like painted boards, edges are hand-cut, and depth comes from one hard offset shadow rather than a blur. The visitor is a driver with a car that is misbehaving, standing outdoors on a phone, often reading Spanish first. Legibility outranks decoration everywhere.

## Colors

The ground is deep sign blue and it owns the page. Two painted accents sit on it, and nothing else is allowed to become an accent.

- **Primary, sign blue (#0d3b8c):** the enamel field the whole site is painted on.
- **Primary deep (#072454):** the darker board, used for panels that sit on the blue and for the footer.
- **Secondary, sign yellow (#f6b711):** the lettering accent. It carries the shop name's second line, the open badge, arrows, and links.
- **Tertiary, painted red (#bf2010):** reserved for the phone. The call button and the sticky phone bar are the only red on the site, so red always means "call".
- **Neutral, enamel white (#f7f3e8):** body text on blue, and the light painted boards.
- **Ink (#0b0d12):** text on enamel boards, and every painted border.
- **Brush (#041a3d):** the offset shadow behind painted lettering and panels.

Measured contrast: enamel on sign blue 12.3:1, sign yellow on sign blue 7.4:1, enamel on painted red 5.1:1, ink on enamel 16.8:1. Every pairing clears WCAG AA for its size.

## Typography

Three faces, each with one job.

- **Bungee** paints every heading, label, button and number. It comes out of American signage lettering, which is the point; it is never used for running text.
- **Archivo** sets body copy and tabular numerals. It carries Spanish diacritics without fuss and stays readable at arm's length in daylight.
- **Yellowtail** appears exactly once per page, on "Se habla español". A brush script used twice stops being a painted flourish and becomes a font choice.

Headings run tight (0.95 to 1.05 line height) because painted lettering stacks tight. Body runs at 1.55 and is capped near 65 characters. Phone numbers, hours and addresses use tabular figures so the digits line up like painted numerals.

## Layout

One column of painted boards on a blue field, with an asymmetric grid: the hero splits three-to-two, and the service boards alternate three-of-five and two-of-five widths so they read as panels rather than a card row. Spacing steps are 4, 8, 16, 32 and 56 pixels, with more space above a heading than below it.

The four things a stranger needs (name and trade, address with the unit, hours and open state, phone) are the four largest elements. On a phone the boards stack, the hero drops to 36px display type, and a red call bar pins to the bottom of the screen.

## Elevation & Depth

Depth is paint on paint: a hard offset shadow, 6px on desktop and 4px on phones, in brush navy with no blur. Lettering carries the same offset as a text shadow. There are no soft shadows, no glows, and no blur anywhere in the system.

## Shapes

Corners are 2px, which reads as a cut edge rather than a rounded one. Borders are 4px to 8px painted ink or brush navy; hairlines belong to a different medium. List bullets are small painted squares, not glyphs or emoji. The only drawn icon is an arrow, authored as SVG at a 3px stroke to match the painted line weight.

## Components

- **Call button:** painted red board, enamel lettering, ink border, hard offset shadow. It lifts 2px on hover. The number never wraps; on phones the label stacks above it.
- **Open badge:** sign yellow board with ink lettering when the shop is open, enamel when closed. It renders only after load, from the shop's own clock in America/New_York, so the prerendered HTML never claims a state it cannot know.
- **Panels:** enamel boards with ink text, or deep blue boards with enamel text, alternating down the page.
- **Address plate:** the unit ("Suite C") sits on its own line in sign yellow at the same weight as the street, because the building has units A, B and C and the Google Business Profile is registered with Suite C.
- **Painted arrow:** travels 4px toward its destination on hover and focus. This is the site's one authored motion, and it is disabled under reduced-motion.
- **Mobile call bar:** fixed to the bottom under 640px, painted red, the phone number always one tap away.

## Do's and Don'ts

Do keep red for the phone alone. Do let the blue ground own the page. Do set the address, hours and phone in tabular figures. Do write Spanish as Spanish rather than as a translation of the English.

Don't add a third accent color. Don't introduce soft shadows, glass, gradients, or gradient text. Don't turn the service boards into a grid of equal cards with icons. Don't put a kicker or eyebrow above a heading. Don't use emoji or glyphs as icons. Don't show a star rating, a review count, or a testimonial: the shop has six Google reviews and no testimonials on file, and the site links to the real ones instead of quoting invented ones.
