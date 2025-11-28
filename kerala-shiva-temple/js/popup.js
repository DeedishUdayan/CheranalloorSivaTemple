document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('event-popup');
    const closeButton = popup.querySelector('.close-button');

    // Show popup on page load
    setTimeout(() => {
        popup.classList.add('active');
    }, 1000); // Show after 1 second

    // Hide popup when close button is clicked
    closeButton.addEventListener('click', function() {
        popup.classList.remove('active');
    });

    // Hide popup when clicking outside the content
    popup.addEventListener('click', function(event) {
        if (event.target === popup) {
            popup.classList.remove('active');
        }
    });
});
