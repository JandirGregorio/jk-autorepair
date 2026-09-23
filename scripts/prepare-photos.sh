#!/usr/bin/env bash
#
# Turns a phone photograph into the two renditions the site ships.
#
# Phone originals run 3-5MB, which is unusable on the mobile connection this
# site is built for. Each photo becomes a 1600px and an 800px JPEG at quality
# 72, typically 150-350KB and 40-90KB.
#
#   scripts/prepare-photos.sh <source-file> <output-name>
#
# Example:
#   scripts/prepare-photos.sh ~/Downloads/IMG_0421.jpg bay-door
#   -> public/photos/bay-door-1600.jpg
#   -> public/photos/bay-door-800.jpg
#
# It prints the intrinsic size of the large rendition, which goes into
# src/content/photos.ts so the page reserves the right space and never shifts.

set -euo pipefail

if [ $# -ne 2 ]; then
  echo "usage: $0 <source-file> <output-name>" >&2
  exit 1
fi

source_file=$1
name=$2
out_dir="$(cd "$(dirname "$0")/.." && pwd)/public/photos"

mkdir -p "$out_dir"

# Never upscale: a cropped original can be shorter than the target, and
# blowing it back up costs bytes and sharpness for nothing.
long_side=$(
  sips -g pixelWidth -g pixelHeight "$source_file" |
    awk '/pixelWidth|pixelHeight/ { if ($2 > max) max = $2 } END { print max }'
)

for size in 1600 800; do
  target=$(( size > long_side ? long_side : size ))
  sips -Z "$target" \
    --setProperty format jpeg \
    --setProperty formatOptions 72 \
    "$source_file" \
    --out "$out_dir/$name-$size.jpg" >/dev/null
done

read -r width height < <(
  sips -g pixelWidth -g pixelHeight "$out_dir/$name-1600.jpg" |
    awk '/pixelWidth/ {w=$2} /pixelHeight/ {h=$2} END {print w, h}'
)

large_size=$(du -h "$out_dir/$name-1600.jpg" | cut -f1 | tr -d ' ')
small_size=$(du -h "$out_dir/$name-800.jpg" | cut -f1 | tr -d ' ')

echo "$name: ${width}x${height} (1600: $large_size, 800: $small_size)"
