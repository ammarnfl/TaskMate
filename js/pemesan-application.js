document.addEventListener('DOMContentLoaded', () => {
    const pemesanForm = document.getElementById('pemesan-application-form');

    if (pemesanForm) {
        pemesanForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullName = document.getElementById('full-name').value;
            const dateOfBirth = document.getElementById('date-of-birth').value;
            const primaryMobile = document.getElementById('primary-mobile').value;
            const emergencyPhone = document.getElementById('emergency-phone').value;

            if (!validatePhoneNumber(primaryMobile) || !validatePhoneNumber(emergencyPhone)) {
                showNotification('Please enter valid phone numbers', 'error');
                return;
            }

            // Simulate form submission (replace with actual submission logic)
            setTimeout(() => {
                showNotification('Application submitted successfully!');
                window.location.href = 'pemesan-quest.html';
            }, 1000);
        });
    }
});