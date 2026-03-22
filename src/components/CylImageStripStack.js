import React from 'react';
import { CYL_PERSPECTIVE_PX } from '../cylWarpConstants';

/**
 * Image rendered as N horizontal strips, each individually warped via `data-cyl="warp"`.
 *
 * Gap-elimination strategy:
 *  - Absolute positioning (not flexbox) so strip placement is exact percentages with no rounding
 *    distribution across siblings.
 *  - Each strip is 50% taller than its slot (25% bleed top + 25% bleed bottom). The background
 *    image is sized/positioned so the correct image slice sits in the center of the oversized
 *    element. The bleed region shows adjacent image content and covers any sub-pixel seam.
 *  - scaleY on strips is set to 0 in WARP config — rotateX under the shared parent perspective
 *    provides all the curvature. Eliminating per-strip scaleY removes the primary gap source
 *    (each strip scaling from its own center pushed edges apart).
 *  - translateZ is omitted (strips share one perspective root).
 */
export default function CylImageStripStack({
  src,
  alt,
  stripCount = 64,
  className = '',
  style,
}) {
  const n = Math.max(1, stripCount);
  const safeSrc = src.replace(/\\/g, '\\\\').replace(/"/g, '\\"');

  const slotH = 100 / n;
  const bleed = slotH * 0.5;

  return (
    <div
      className={`relative min-h-0 w-full overflow-visible ${className}`}
      style={{
        ...style,
        perspective: `${CYL_PERSPECTIVE_PX}px`,
        transformStyle: 'preserve-3d',
      }}
    >
      <span className="sr-only">{alt}</span>
      {Array.from({ length: n }, (_, i) => {
        const nominalTop = i * slotH;
        const top = nominalTop - bleed;
        const height = slotH + bleed * 2;

        const bgTotalH = (100 / height) * 100;
        const bgOffsetY = ((nominalTop / (100 - slotH)) || 0) * 100;

        return (
          <div
            key={i}
            data-cyl="warp"
            data-cyl-image-strip=""
            className="cyl-warp-ready absolute left-0 w-full bg-no-repeat"
            style={{
              top: `${top}%`,
              height: `${height}%`,
              backgroundImage: `url("${safeSrc}")`,
              backgroundSize: `100% ${bgTotalH}%`,
              backgroundPosition: `center ${bgOffsetY}%`,
            }}
            aria-hidden
          />
        );
      })}
    </div>
  );
}
