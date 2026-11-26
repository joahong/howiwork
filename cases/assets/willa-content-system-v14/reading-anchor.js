(() => {
  const section = document.getElementById('result');
  const links = [...document.querySelectorAll('.toc-rail a, .article-contents a')];
  if (!section || !links.length) return;
  let scheduled = false;
  function update() {
    scheduled = false;
    const atEnd = scrollY > 0 && scrollY + innerHeight >= document.documentElement.scrollHeight - 2;
    const rect = section.getBoundingClientRect();
    if (!atEnd || rect.top >= innerHeight || rect.bottom <= 0) return;
    links.forEach(link => {
      if (link.hash === '#result') {
        if (link.getAttribute('aria-current') !== 'location') link.setAttribute('aria-current', 'location');
      } else if (link.hasAttribute('aria-current')) link.removeAttribute('aria-current');
    });
  }
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    // Apply after the shared reading indicator has updated its heading threshold.
    requestAnimationFrame(() => requestAnimationFrame(update));
  }
  ['scroll', 'resize', 'hashchange', 'pageshow'].forEach(event => window.addEventListener(event, schedule, {passive: true}));
  document.addEventListener('load', schedule, true);
  document.fonts?.ready.then(schedule);
  // Shared indicators can update after layout settles; reconcile only changed links.
  const observer = new MutationObserver(update);
  links.forEach(link => observer.observe(link, {attributes: true, attributeFilter: ['aria-current']}));
  schedule();
})();
