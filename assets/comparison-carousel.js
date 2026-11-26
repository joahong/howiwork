document.querySelectorAll('[data-comparison-carousel]').forEach((carousel) => {
  const slides = [...carousel.querySelectorAll('[data-comparison-slide]')];
  const controls = carousel.querySelector('.comparison-controls');
  const previous = carousel.querySelector('[data-comparison-prev]');
  const next = carousel.querySelector('[data-comparison-next]');
  const status = carousel.querySelector('[data-comparison-status]');
  let current = 0;

  function show(index) {
    current = Math.max(0, Math.min(slides.length - 1, index));
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    previous.setAttribute('aria-disabled', String(current === 0));
    next.setAttribute('aria-disabled', String(current === slides.length - 1));
    status.textContent = `${current + 1} / ${slides.length}`;
  }

  previous.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));
  controls.addEventListener('keydown', (event) => {
    const positions = { ArrowLeft: current - 1, ArrowRight: current + 1, Home: 0, End: slides.length - 1 };
    if (!(event.key in positions)) return;
    event.preventDefault();
    show(positions[event.key]);
  });

  show(0);
  controls.hidden = false;
});
