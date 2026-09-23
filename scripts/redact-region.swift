#!/usr/bin/env swift
//
// Blurs a rectangle of a photograph beyond recovery.
//
// The shop's photos are taken in a working lot, so customers' licence plates
// turn up in the background. A plate is personal data: it ties a stranger's
// car, and often their home, to a place and a date. Cropping handles a plate
// near an edge; this handles one in the middle of a frame worth keeping.
//
//   scripts/redact-region.swift <in> <out> <x> <y> <width> <height> [radius]
//
// x and y are the top-left corner in pixels, matching what you read off the
// image in any normal viewer. Core Image counts from the bottom, and the
// conversion happens here so callers never have to think about it.
//
// The blur is deliberately heavy. A light one still leaves glyph shapes that
// an upscaler can guess at, and the region is a few dozen pixels in a 1600px
// photograph, so nobody will notice the difference except the person whose
// plate it is.

import Foundation
import CoreImage

let args = CommandLine.arguments

guard args.count >= 7 else {
    FileHandle.standardError.write(
        "usage: \(args[0]) <in> <out> <x> <y> <width> <height> [radius]\n".data(using: .utf8)!
    )
    exit(1)
}

guard let x = Double(args[3]), let y = Double(args[4]),
      let w = Double(args[5]), let h = Double(args[6]), w > 0, h > 0 else {
    FileHandle.standardError.write("x, y, width and height must be numbers, and the size positive\n".data(using: .utf8)!)
    exit(1)
}

let radius = args.count > 7 ? (Double(args[7]) ?? 12) : 12

let inputURL = URL(fileURLWithPath: args[1])
let outputURL = URL(fileURLWithPath: args[2])

guard let source = CIImage(contentsOf: inputURL) else {
    FileHandle.standardError.write("could not read \(inputURL.path)\n".data(using: .utf8)!)
    exit(1)
}

let extent = source.extent

// Top-left origin in, bottom-left origin out.
let region = CGRect(x: x, y: extent.height - y - h, width: w, height: h)

guard extent.contains(region) else {
    FileHandle.standardError.write(
        "region \(region) falls outside the image \(extent)\n".data(using: .utf8)!
    )
    exit(1)
}

// Clamping first stops the blur from sampling transparency at the edges of the
// region, which would leave a pale halo around the patch.
let blurred = source
    .clampedToExtent()
    .applyingFilter("CIGaussianBlur", parameters: [kCIInputRadiusKey: radius])
    .cropped(to: region)

let result = blurred.composited(over: source)

let context = CIContext()
do {
    try context.writeJPEGRepresentation(
        of: result,
        to: outputURL,
        colorSpace: CGColorSpaceCreateDeviceRGB(),
        // Near-lossless: this is a master that prepare-photos.sh compresses.
        options: [kCGImageDestinationLossyCompressionQuality as CIImageRepresentationOption: 0.95]
    )
} catch {
    FileHandle.standardError.write("could not write \(outputURL.path): \(error)\n".data(using: .utf8)!)
    exit(1)
}

print("redacted \(Int(w))x\(Int(h)) at \(Int(x)),\(Int(y)) -> \(outputURL.lastPathComponent)")
