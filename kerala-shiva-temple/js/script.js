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
