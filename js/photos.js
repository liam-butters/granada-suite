// Renders the gallery from data/photos.json, which is regenerated on every
// Netlify build by scripts/generate-photos.js scanning the /photos folder.
// You never need to touch this file to add or remove photos.

(function () {
  const gallery = document.getElementById('gallery');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  let photos = [];
  let current = 0;

  function openLightbox(index) {
    current = index;
    lightboxImg.src = 'photos/' + photos[current];
    lightboxImg.alt = 'Photo ' + (current + 1) + ' of ' + photos.length;
    lightbox.classList.add('open');
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightboxImg.src = '';
  }

  function step(delta) {
    current = (current + delta + photos.length) % photos.length;
    lightboxImg.src = 'photos/' + photos[current];
    lightboxImg.alt = 'Photo ' + (current + 1) + ' of ' + photos.length;
  }

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => step(-1));
  nextBtn.addEventListener('click', () => step(1));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });

  function render() {
    if (!photos.length) {
      gallery.innerHTML = '<p class="gallery-empty">No photos yet — add images to the <code>/photos</code> folder in the repo and redeploy.</p>';
      return;
    }
    gallery.innerHTML = '';
    photos.forEach((file, i) => {
      const btn = document.createElement('button');
      btn.className = 'gallery-item';
      btn.setAttribute('aria-label', 'Open photo ' + (i + 1));
      const img = document.createElement('img');
      img.src = 'photos/' + file;
      img.alt = '';
      img.loading = 'lazy';
      btn.appendChild(img);
      btn.addEventListener('click', () => openLightbox(i));
      gallery.appendChild(btn);
    });
  }

  fetch('data/photos.json', { cache: 'no-store' })
    .then((res) => {
      if (!res.ok) throw new Error('manifest not found');
      return res.json();
    })
    .then((data) => {
      photos = Array.isArray(data) ? data : [];
      render();
    })
    .catch(() => {
      gallery.innerHTML = '<p class="gallery-error">Couldn\'t load the photo list. If this is a fresh deploy, make sure the build command <code>node scripts/generate-photos.js</code> ran successfully.</p>';
    });
})();
