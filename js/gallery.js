document.addEventListener('DOMContentLoaded', () => {
    const items = Array.from(document.querySelectorAll('.gallery-item'));
    const dots = Array.from(document.querySelectorAll('.gallery-dots .dot'));
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');

    const ITEMS_PER_PAGE = 8;
    const totalPages = Math.max(dots.length, Math.ceil(items.length / ITEMS_PER_PAGE));
    let currentPage = 0;

    const openLightbox = (src, caption, alt) => {
        lightboxImage.src = src;
        lightboxImage.alt = alt || caption || 'Gallery image';
        lightboxCaption.textContent = caption || '';
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        lightboxImage.src = '';
        document.body.style.overflow = '';
    };

    const showPage = pageIndex => {
        currentPage = pageIndex;
        const start = pageIndex * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;

        items.forEach((item, idx) => {
            if (idx >= start && idx < end) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });

        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === pageIndex);
        });
    };

    // Attach click handlers for gallery items (lightbox)
    items.forEach(item => {
        item.addEventListener('click', () => {
            openLightbox(
                item.dataset.image,
                item.dataset.caption,
                item.querySelector('img')?.alt
            );
        });
    });

    // Attach click handlers for dots (pagination)
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            if (idx < totalPages) {
                showPage(idx);
            }
        });
    });

    // Initialise first page
    showPage(0);

    // Lightbox controls
    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', event => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});

