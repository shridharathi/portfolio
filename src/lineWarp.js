/**
 * Splits [data-cyl="line-root"] elements into per-line [data-cyl="warp"] blocks
 * using word measurement (same technique as common “text split into lines” demos).
 */

const LINE_TOP_EPS = 2;

function splitWords(text) {
  return text.split(/(\s+)/);
}

function groupWordElementsByLine(wordEls) {
  const lines = [];
  let current = [];
  let lastTop = null;
  wordEls.forEach((el) => {
    const top = el.offsetTop;
    if (lastTop === null || Math.abs(top - lastTop) <= LINE_TOP_EPS) {
      current.push(el);
    } else {
      lines.push(current);
      current = [el];
    }
    lastTop = top;
  });
  if (current.length) lines.push(current);
  return lines;
}

function flushWordsIntoLineBlocks(container, wordEls) {
  if (wordEls.length === 0) return;
  const lines = groupWordElementsByLine(wordEls);
  lines.forEach((group) => {
    const line = document.createElement('span');
    line.setAttribute('data-cyl', 'warp');
    line.className = 'cyl-warp-ready cyl-line-warp';
    line.textContent = group.map((w) => w.textContent).join('');
    container.appendChild(line);
  });
  wordEls.forEach((w) => w.remove());
}

/** Plain text (or only whitespace); replaces content with line spans. */
export function splitPlainTextElement(el) {
  const raw = el.textContent;
  if (!raw.trim()) return;

  const tokens = splitWords(raw);
  el.textContent = '';
  const wordEls = [];
  tokens.forEach((tok) => {
    if (!tok) return;
    const span = document.createElement('span');
    span.className = 'cyl-w-line-measure';
    span.textContent = tok;
    span.setAttribute('aria-hidden', 'true');
    el.appendChild(span);
    wordEls.push(span);
  });

  void el.offsetHeight;
  flushWordsIntoLineBlocks(el, wordEls);
}

/** Paragraph-like flow: text nodes and <br> only (e.g. experience description). */
export function splitFlowElement(el) {
  const segments = [];
  let acc = '';
  const pushAcc = () => {
    if (acc) segments.push(acc);
    acc = '';
  };

  el.childNodes.forEach((node) => {
    if (node.nodeName === 'BR') {
      pushAcc();
    } else if (node.nodeType === Node.TEXT_NODE) {
      acc += node.textContent;
    }
  });
  pushAcc();

  el.textContent = '';
  segments.forEach((seg, i) => {
    const holder = document.createElement('span');
    holder.className = 'cyl-flow-seg';
    holder.textContent = seg;
    el.appendChild(holder);
    if (seg.trim()) {
      splitPlainTextElement(holder);
    }
    if (i < segments.length - 1) {
      el.appendChild(document.createElement('br'));
    }
  });
}

/** Rich project description: split each top-level <p> (text + <br> only inside). */
export function splitDescriptionLineRoot(div) {
  const children = Array.from(div.children);
  if (children.length === 0) {
    splitPlainTextElement(div);
    return;
  }
  if (children.every((c) => c.tagName === 'P')) {
    children.forEach((p) => {
      const hasOnlyTextAndBr = Array.from(p.childNodes).every(
        (n) =>
          n.nodeType === Node.TEXT_NODE ||
          (n.nodeType === Node.ELEMENT_NODE && n.nodeName === 'BR')
      );
      if (hasOnlyTextAndBr) {
        splitFlowElement(p);
      } else {
        wrapWholeAsWarp(p);
      }
    });
    return;
  }
  splitPlainTextElement(div);
}

function wrapWholeAsWarp(el) {
  const w = document.createElement('span');
  w.setAttribute('data-cyl', 'warp');
  const useBundle = el.hasAttribute('data-cyl-warp-bundle');
  w.className = useBundle
    ? 'cyl-warp-ready cyl-warp-bundle'
    : 'cyl-warp-ready cyl-line-warp';
  while (el.firstChild) {
    w.appendChild(el.firstChild);
  }
  el.appendChild(w);
}

function splitLineRootElement(el) {
  const mode = el.getAttribute('data-cyl-line-mode');

  if (mode === 'description') {
    splitDescriptionLineRoot(el);
    return;
  }

  const kids = Array.from(el.childNodes).filter(
    (n) => n.nodeType !== Node.COMMENT_NODE
  );

  const onlyText =
    kids.length > 0 &&
    kids.every((n) => n.nodeType === Node.TEXT_NODE);
  if (onlyText) {
    splitPlainTextElement(el);
    return;
  }

  const onlyTextAndBr =
    kids.length > 0 &&
    kids.every(
      (n) =>
        n.nodeType === Node.TEXT_NODE ||
        (n.nodeType === Node.ELEMENT_NODE && n.nodeName === 'BR')
    );
  if (onlyTextAndBr) {
    splitFlowElement(el);
    return;
  }

  if (
    kids.length === 1 &&
    kids[0].nodeType === Node.ELEMENT_NODE &&
    kids[0].tagName === 'A' &&
    Array.from(kids[0].childNodes).every((n) => n.nodeType === Node.TEXT_NODE)
  ) {
    splitPlainTextElement(kids[0]);
    return;
  }

  if (kids.length === 1 && kids[0].nodeType === Node.ELEMENT_NODE) {
    const inner = kids[0];
    const innerKids = Array.from(inner.childNodes).filter(
      (n) => n.nodeType !== Node.COMMENT_NODE
    );
    const innerPlain =
      innerKids.length > 0 &&
      innerKids.every((n) => n.nodeType === Node.TEXT_NODE);
    if (innerPlain) {
      splitPlainTextElement(inner);
      return;
    }
  }

  wrapWholeAsWarp(el);
}

/**
 * Restore original markup from data-cyl-orig, then split into line warps.
 * Call at the start of each layout pass so line breaks stay correct on resize.
 */
export function resetAndSplitLineRoots(container) {
  container.querySelectorAll('[data-cyl="line-root"]').forEach((el) => {
    const orig = el.getAttribute('data-cyl-orig');
    if (orig !== null) {
      el.innerHTML = orig;
    } else {
      el.setAttribute('data-cyl-orig', el.innerHTML);
    }
    splitLineRootElement(el);
  });
}
