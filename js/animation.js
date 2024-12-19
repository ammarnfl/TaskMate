// Show the loading animation
function showLoading() {
    const loadingOverlay = document.getElementById('loadingAnimation');
    loadingOverlay.classList.remove('hidden');
}

// Hide the loading animation
function hideLoading() {
    const loadingOverlay = document.getElementById('loadingAnimation');
    loadingOverlay.classList.add('hidden');
}

// Add event listeners for page transitions
document.addEventListener("DOMContentLoaded", () => {
    // Hide loading animation after page load
    hideLoading();

    // Show loading animation on link click
    const links = document.querySelectorAll("a");
    links.forEach(link => {
        link.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (href && !href.startsWith("#")) { // Avoid anchors or empty links
                e.preventDefault();
                showLoading();
                setTimeout(() => {
                    window.location.href = href;
                }, 500); // Adjust timeout if needed
            }
        });
    });
});
