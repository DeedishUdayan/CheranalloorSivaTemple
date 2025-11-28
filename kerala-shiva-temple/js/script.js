// This is a placeholder for JavaScript functionality.

let slideIndex = 1;
// showSlides(slideIndex);

// Automatic slide show
function autoSlides() {
  slideIndex++;
  showSlides(slideIndex);
  setTimeout(autoSlides, 5000); // Change image every 5 seconds
}

// Start the automatic slideshow
autoSlides();

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const closeButton = mobileMenuOverlay.querySelector('.close-button');

    if (mobileMenuToggle && mobileMenuOverlay && closeButton) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuOverlay.style.display = 'flex';
        });

        closeButton.addEventListener('click', function() {
            mobileMenuOverlay.style.display = 'none';
        });

        // Close menu if a link is clicked
        const mobileMenuLinks = mobileMenuOverlay.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuOverlay.style.display = 'none';
            });
        });
    }
});

// Available Poojas Carousel functionality (Old, redundant block - REMOVED)
/*
document.addEventListener('DOMContentLoaded', function() {
    const pujaCarousel = document.querySelector('.puja-carousel');
    const pujaDots = document.querySelectorAll('.pagination-dots-puja .dot-puja');

    if (pujaCarousel && pujaDots.length > 0) {
        const updateDots = () => {
            const scrollLeft = pujaCarousel.scrollLeft;
            const cardWidth = pujaCarousel.querySelector('.puja-card-item').offsetWidth + 20; // Card width + gap
            const activeIndex = Math.round(scrollLeft / cardWidth);

            pujaDots.forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };

        pujaCarousel.addEventListener('scroll', updateDots);

        pujaDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                const cardWidth = pujaCarousel.querySelector('.puja-card-item').offsetWidth + 20; // Card width + gap
                pujaCarousel.scrollTo({
                    left: index * cardWidth,
                    behavior: 'smooth'
                });
            });
        });

        // Initial update of dots
        // updateDots(); // Remove redundant initial call
    }
});
*/
let pujaSlideIndex = 0; // Start with the first slide

function getCardsPerPage() {
    const section = document.getElementById('available-poojas-section');
    if (!section) return 1; // Default to 1 if section not found
    const style = getComputedStyle(section);
    return parseInt(style.getPropertyValue('--puja-cards-per-view'));
}

function updatePujaDots() {
    const pujaCarouselWrapper = document.querySelector('.puja-carousel-wrapper');
    const pujaCarousel = document.querySelector('.puja-carousel');
    const pujaCards = document.querySelectorAll('.puja-carousel .puja-card-item');
    const pujaDotsContainer = document.querySelector('.pagination-dots-puja');
    const cardsPerPage = getCardsPerPage();

    if (!pujaCarouselWrapper || !pujaCarousel || !pujaDotsContainer || pujaCards.length === 0) return;

    const totalPages = Math.ceil(pujaCards.length / cardsPerPage);

    // Clear existing dots and create new ones based on totalPages
    pujaDotsContainer.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot-puja');
        if (i === pujaSlideIndex) {
            dot.classList.add('active');
        }
        // Re-add event listener for dynamically created dots
        dot.addEventListener('click', () => {
            pujaSlideIndex = i;
            plusPujaSlides(0); // Trigger slide to this page
        });
        pujaDotsContainer.appendChild(dot);
    }
}

function plusPujaSlides(n) {
    const pujaCarouselWrapper = document.querySelector('.puja-carousel-wrapper');
    const pujaCarousel = document.querySelector('.puja-carousel');
    const pujaCards = document.querySelectorAll('.puja-carousel .puja-card-item');

    if (!pujaCarouselWrapper || !pujaCarousel || pujaCards.length === 0) return; // Add a safeguard

    const cardsPerPage = getCardsPerPage();
    const totalCards = pujaCards.length;
    const totalPages = Math.ceil(totalCards / cardsPerPage);

    // Get the actual width of a single card and the gap between cards
    const firstCard = pujaCards[0];
    const cardWidth = firstCard.offsetWidth; // Actual rendered width of a card

    const carouselComputedStyle = getComputedStyle(pujaCarousel);
    const gap = parseFloat(carouselComputedStyle.gap) || 0;

    // Calculate the width of one 'page' (cardsPerPage cards + gaps between them)
    // This is the amount the carousel should move for one page turn.
    const slideAmount = (cardWidth * cardsPerPage) + (gap * (cardsPerPage - 1));
    
    pujaSlideIndex += n;

    if (pujaSlideIndex < 0) {
        pujaSlideIndex = totalPages - 1; // Loop to last page
    } else if (pujaSlideIndex >= totalPages) {
        pujaSlideIndex = 0; // Loop to first page
    }

    // Calculate the total content width and the maximum scrollable distance
    const totalCarouselContentWidth = pujaCarousel.scrollWidth; // Total width of all items + gaps
    const visibleWrapperWidth = pujaCarouselWrapper.offsetWidth; // Visible area of the carousel
    const maxTranslateX = Math.max(0, totalCarouselContentWidth - visibleWrapperWidth); // Max scrollable distance

    // Calculate the target translate X for the current page
    let targetTranslateX = pujaSlideIndex * slideAmount;

    // Clamp the targetTranslateX to ensure it does not exceed the maximum scroll amount
    if (targetTranslateX > maxTranslateX) {
        targetTranslateX = maxTranslateX;
    } else if (targetTranslateX < 0) {
        targetTranslateX = 0;
    }
    
    pujaCarousel.style.transform = `translateX(-${targetTranslateX}px)`;

    updatePujaDots();
}

// Initialize carousel and dots on load
document.addEventListener('DOMContentLoaded', function() {
    // Existing mobile menu functionality (keep as is)
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const closeButton = mobileMenuOverlay.querySelector('.close-button');

    if (mobileMenuToggle && mobileMenuOverlay && closeButton) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuOverlay.style.display = 'flex';
        });

        closeButton.addEventListener('click', function() {
            mobileMenuOverlay.style.display = 'none';
        });

        const mobileMenuLinks = mobileMenuOverlay.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuOverlay.style.display = 'none';
            });
        });
    }

    // Puja Carousel Initialization
    const pujaCarouselWrapper = document.querySelector('.puja-carousel-wrapper');
    const pujaCarousel = document.querySelector('.puja-carousel');
    const prevButton = document.querySelector('.prev-puja');
    const nextButton = document.querySelector('.next-puja');

    if (pujaCarouselWrapper && pujaCarousel) {
        // Defer initial setup with requestAnimationFrame for stable layout calculations
        requestAnimationFrame(() => {
            pujaCarousel.style.transform = `translateX(0px)`;
            updatePujaDots(); // Initialize dots based on current view
        });

        // Event listeners for navigation buttons
        if (prevButton) {
            prevButton.addEventListener('click', () => plusPujaSlides(-1));
        }
        if (nextButton) {
            nextButton.addEventListener('click', () => plusPujaSlides(1));
        }

        // Recalculate dots and slide position on window resize
        window.addEventListener('resize', () => {
            requestAnimationFrame(() => {
                // Re-calculate targetTranslateX for the current pujaSlideIndex after resize
                plusPujaSlides(0);
            });
        });
    }
});


// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slider-slide");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
