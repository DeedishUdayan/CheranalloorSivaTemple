let testimonialSlideIndex = 1;
showTestimonialSlides(testimonialSlideIndex);

function plusTestimonialSlides(n) {
    showTestimonialSlides(testimonialSlideIndex += n);
}

function showTestimonialSlides(n) {
    let i;
    let slides = document.getElementsByClassName("testimonial-slide");
    if (n > slides.length) { testimonialSlideIndex = 1 }
    if (n < 1) { testimonialSlideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[testimonialSlideIndex - 1].style.display = "flex"; // Use flex to display two cards
}
