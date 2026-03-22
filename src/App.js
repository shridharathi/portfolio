import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

import Work from './pages/Work/Work';
import { CYL_PERSPECTIVE_PX } from './cylWarpConstants';
import { resetAndSplitLineRoots } from './lineWarp';

const CYL_ALL_BLOCKS = '[data-cyl="warp"]';

/** Cylinder warp — tune here: smaller perspective / higher angles = stronger bend */
const WARP = {
  /** higher = gentler perspective — shared with CylImageStripStack via cylWarpConstants */
  perspectivePx: CYL_PERSPECTIVE_PX,
  /** lower = less discrete-strip mismatch at top/bottom (text still uses full bend) */
  maxRotateDeg: 70,
  /**
   * Text only: max scaleY ≈ 1 + this at |t|→1. Keep modest to avoid lines piling up under
   * rotateX + perspective (was 2).
   */
  stretchY: 1.15,
  /**
   * Text: scaleY uses cylSilhouette^this (see cylSilhouette in App.js).
   */
  textStretchYExponent: 2.55,
  /**
   * Image strips: extra scale on top of cylSilhouette s — keep small; parent perspective + s
   * already shape the cylinder.
   */
  stretchYImageStrip: 0,
  /** Legacy fallback if column width is missing (should not happen after measure) */
  stretchX: 1.2,
  /** ~0 for strips under shared perspective (avoids horizontal seam drift) */
  stretchXImageStrip: 0,
  /**
   * Text: scaleX blends to full viewport using cylSilhouette(|t|) so side edges follow a circular
   * arc (half-circle negative space), not straight diagonals from linear width. rotateX stays
   * linear in |t| for uniform cylinder spin.
   */
  viewportWidthBleed: 0.98,
  /** push slightly into the screen at edges (adds depth with perspective) */
  translateZ: 4,
};

/**
 * Normalized distance from viewport center: u = |t| ∈ [0,1]. Drives rotateX linearly (uniform
 * angular rate on the cylinder).
 */
function cylAmount(t) {
  return Math.min(1, Math.max(0, Math.abs(t)));
}

/**
 * Quarter-circle easing: s(u) = 1 - sqrt(1 - u²). s(0)=0, s(1)=1, ds/du|0=0.
 * Drives scaleX/scaleY/Z so horizontal extent grows on a circular arc vs viewport height — avoids
 * linear width (triangular negative space on the sides).
 */
function cylSilhouette(u) {
  const x = Math.min(1, Math.max(0, u));
  return 1 - Math.sqrt(Math.max(0, 1 - x * x));
}

/**
 * @param {boolean} [opts.omitTranslateZ] — image strips sit edge-to-edge; translateZ
 *   under perspective offsets each band on Z and seams read as “stacked” slats.
 * @param {boolean} [opts.omitPerspective] — perspective lives on CylImageStripStack wrapper.
 * @param {boolean} [opts.imageStripStretch] — use image-strip stretchX / stretchY (see WARP.*ImageStrip).
 *   Text: columnWidth + viewportWidth. Image strips: stripColumnWidth + viewportWidth (same s law).
 */
function buildWarpTransform(t, opts = {}) {
  const u = cylAmount(t);
  const s = cylSilhouette(u);
  const rx = Math.sign(t) * u * WARP.maxRotateDeg;
  const xStretch = opts.imageStripStretch ? WARP.stretchXImageStrip : WARP.stretchX;
  const yStretch = opts.imageStripStretch ? WARP.stretchYImageStrip : WARP.stretchY;
  let sx;
  if (opts.imageStripStretch) {
    if (opts.stripColumnWidth > 0 && opts.viewportWidth > 0) {
      const col = Math.max(opts.stripColumnWidth, 1);
      const target = (opts.viewportWidth * WARP.viewportWidthBleed) / col;
      sx = 1 + (target - 1) * s;
    } else {
      sx = 1 + xStretch * s;
    }
  } else if (opts.columnWidth > 0 && opts.viewportWidth > 0) {
    const col = Math.max(opts.columnWidth, 1);
    const target = (opts.viewportWidth * WARP.viewportWidthBleed) / col;
    sx = 1 + (target - 1) * s;
  } else {
    sx = 1 + xStretch * s;
  }
  const sy = opts.imageStripStretch
    ? 1 + yStretch * s
    : 1 + yStretch * Math.pow(s, WARP.textStretchYExponent);
  const perspective = opts.omitPerspective ? '' : `perspective(${WARP.perspectivePx}px) `;
  const rotateScale = `rotateX(${rx}deg) scale(${sx.toFixed(4)}, ${sy.toFixed(4)})`;
  if (opts.omitTranslateZ) {
    return `${perspective}${rotateScale}`;
  }
  const tz = WARP.translateZ * Math.pow(s, WARP.textStretchYExponent);
  return `${perspective}translateZ(${tz}px) ${rotateScale}`;
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem('darkMode') === 'true';
    } catch {
      return false;
    }
  });

  const spacerRef = useRef(null);
  const contentRef = useRef(null);
  const rafRef = useRef(0);
  const layoutRef = useRef({
    layouts: [],
    firstCenter: 0,
    scrollRange: 0,
    columnWidth: 720,
  });

  useEffect(() => {
    try {
      localStorage.setItem('darkMode', String(darkMode));
    } catch {}
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useLayoutEffect(() => {
    const spacer = spacerRef.current;
    const content = contentRef.current;
    if (!spacer || !content) return;

    function measure() {
      content.style.transform = 'none';
      resetAndSplitLineRoots(content);
      content.querySelectorAll(CYL_ALL_BLOCKS).forEach((el) => {
        el.style.transform = 'none';
        el.style.opacity = '';
      });

      const contentRect = content.getBoundingClientRect();
      const mainEl = content.querySelector('main');
      const columnWidth = mainEl
        ? mainEl.getBoundingClientRect().width
        : contentRect.width;

      const plainSectionSelector = '[data-cyl-plain-section]';
      const layouts = Array.from(content.querySelectorAll(CYL_ALL_BLOCKS))
        .filter((el) => !el.closest(plainSectionSelector))
        .filter((el) => el.offsetHeight > 0)
        .map((el) => {
          const rect = el.getBoundingClientRect();
          return {
            el,
            offsetY: rect.top - contentRect.top,
            height: rect.height,
            width: rect.width,
            warp: true,
          };
        })
        .sort((a, b) => a.offsetY - b.offsetY);

      if (layouts.length === 0) return;

      const vh = window.innerHeight;
      const cy = vh / 2;
      const firstCenter = layouts[0].offsetY + layouts[0].height / 2;
      const lastLayoutCenter =
        layouts[layouts.length - 1].offsetY +
        layouts[layouts.length - 1].height / 2;

      const mainBottom = mainEl
        ? mainEl.getBoundingClientRect().bottom - contentRect.top
        : lastLayoutCenter;
      /**
       * When scroll is max, translateY = cy - lastCenter. Content y appears at y + translateY.
       * Bottom of main (mainBottom) should sit near the bottom of the viewport:
       * mainBottom + (cy - lastCenter) <= vh - pad  →  lastCenter >= mainBottom + cy - vh + pad
       */
      const pad = 32;
      const lastCenterNeededForMain = mainBottom + cy - vh + pad;
      const lastCenter = Math.max(lastLayoutCenter, lastCenterNeededForMain);
      const scrollRange = lastCenter - firstCenter;

      spacer.style.height = scrollRange + vh + 'px';
      layoutRef.current = {
        layouts,
        firstCenter,
        scrollRange,
        columnWidth,
      };
    }

    function tick() {
      const { layouts, firstCenter, scrollRange, columnWidth } = layoutRef.current;
      if (layouts.length === 0) return;

      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const cy = vh / 2;
      const scrollAmount = Math.max(0, Math.min(scrollRange, window.scrollY));
      const translateY = cy - firstCenter - scrollAmount;

      content.style.transform = `translateY(${translateY}px)`;

      layouts.forEach(({ el, offsetY, height, width, warp }) => {
        if (!warp) {
          el.style.transform = 'none';
          el.style.opacity = '1';
          return;
        }

        const visualCenter = offsetY + height / 2 + translateY;
        const t = Math.max(-1, Math.min(1, (visualCenter - cy) / cy));

        const isImageStrip = el.hasAttribute('data-cyl-image-strip');
        const imageStripOpts = {
          omitTranslateZ: isImageStrip,
          omitPerspective: isImageStrip,
          imageStripStretch: isImageStrip,
          columnWidth: isImageStrip ? 0 : columnWidth,
          viewportWidth: vw,
          stripColumnWidth: isImageStrip ? width : 0,
        };

        if (Math.abs(visualCenter - cy) > vh * 1.5) {
          el.style.transform = buildWarpTransform(t, imageStripOpts);
          el.style.opacity = '0';
          return;
        }

        el.style.transform = buildWarpTransform(t, imageStripOpts);
        el.style.opacity = '1';
      });
    }

    function onScroll() {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(tick);
    }

    function onResize() {
      measure();
      tick();
    }

    measure();
    tick();

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(onResize);
    });
    ro.observe(content);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('load', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onResize);
    };
  }, [darkMode]);

  return (
    <>
      <div className="w-full" ref={spacerRef} />
      <div className="fixed inset-0 z-[1] h-screen w-full overflow-hidden bg-white dark:bg-[#191f19]">
        <div
          className="cyl-warp-ready mx-auto w-[95%] pt-[8vh] will-change-transform dark:min-h-screen dark:bg-[#191f19] dark:text-white"
          ref={contentRef}
        >
          <Work />
        </div>
      </div>
      <button
        type="button"
        className="fixed right-8 top-5 z-[100] cursor-pointer border-none bg-transparent p-1.5 font-inherit text-[#191f19] hover:opacity-85 dark:text-white max-md:right-[4vw] max-md:top-4"
        onClick={() => setDarkMode((d) => !d)}
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        title={darkMode ? 'Light mode' : 'Dark mode'}
      >
        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} size="lg" />
      </button>
    </>
  );
}

export default App;
