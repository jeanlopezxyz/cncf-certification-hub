export function getCurrentPath(): string {
  try {
    return window.location.pathname;
  } catch {
    return '';
  }
}

export function onAstroPageLoad(handler: () => void): () => void {
  document.addEventListener('astro:page-load', handler);
  return () => document.removeEventListener('astro:page-load', handler);
}
