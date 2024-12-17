document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout-btn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Simulate logout (replace with actual logout logic)
            setTimeout(() => {
                showNotification('Logged out successfully');
                window.location.href = 'index.html';
            }, 1000);
        });
    }

    // Implement quest list functionality here
});