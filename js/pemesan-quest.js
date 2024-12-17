document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout-btn');
    const addQuestBtn = document.getElementById('add-quest-btn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Simulate logout (replace with actual logout logic)
            setTimeout(() => {
                showNotification('Logged out successfully');
                window.location.href = 'index.html';
            }, 1000);
        });
    }

    if (addQuestBtn) {
        addQuestBtn.addEventListener('click', () => {
            // Implement add quest functionality
            showNotification('Add quest functionality to be implemented');
        });
    }
});