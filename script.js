const themeButton = document.querySelector('#theme');
function setTheme(dark) {
  document.body.classList.toggle('dark', dark);
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.innerHTML = `${dark ? '☀' : '☾'} <span>Switch to ${dark ? 'light' : 'dark'} mode</span>`;
}
try { setTheme(localStorage.getItem('portfolio-theme') === 'dark'); } catch { setTheme(false); }
themeButton.addEventListener('click', () => {
  const dark = !document.body.classList.contains('dark');
  setTheme(dark);
  try { localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light'); } catch {}
});
document.querySelector('#year').textContent = new Date().getFullYear();
// Try common image extensions automatically, preserving your supplied filenames.
document.querySelectorAll('img[data-fallback]').forEach(img => {
  const base = img.getAttribute('src').replace(/\.[^.]+$/, '');
  const alternatives = ['.png', '.jpeg', '.webp', '.JPG', '.PNG'];
  let attempt = 0;
  function nextImage() {
    if (attempt < alternatives.length) img.src = base + alternatives[attempt++];
    else {
      const fallback = document.createElement('span');
      fallback.textContent = img.dataset.fallback;
      fallback.className = 'image-fallback';
      img.replaceWith(fallback);
    }
  }
  img.addEventListener('error', nextImage);
  if (img.complete && img.naturalWidth === 0) nextImage();
});
const links = document.querySelectorAll('nav a');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(link => {
      const active = link.hash === '#' + entry.target.id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
