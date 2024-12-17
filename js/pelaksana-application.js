document.addEventListener('DOMContentLoaded', () => {
    const pelaksanaForm = document.getElementById('pelaksana-application-form');

    if (pelaksanaForm) {
        pelaksanaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullName = document.getElementById('full-name').value;
            const dateOfBirth = document.getElementById('date-of-birth').value;
            const primaryMobile = document.getElementById('primary-mobile').value;
            const emergencyPhone = document.getElementById('emergency-phone').value;
            const idCard = document.getElementById('id-card').files[0];
            const profilePhoto = document.getElementById('profile-photo').files[0];

            if (!validatePhoneNumber(primaryMobile) || !validatePhoneNumber(emergencyPhone)) {
                showNotification('Please enter valid phone numbers', 'error');
                return;
            }

            if (!idCard || idCard.type !== 'application/pdf') {
                showNotification('Please upload a valid PDF file for ID Card', 'error');
                return;
            }

            if (!profilePhoto || !['image/jpeg', 'image/png'].includes(profilePhoto.type)) {
                showNotification('Please upload a valid JPG or PNG file for Profile Photo', 'error');
                return;
            }

            // Simulate form submission (replace with actual submission logic)
            setTimeout(() => {
                showNotification('Application submitted successfully!');
                window.location.href = 'pelaksana-quest.html';
            }, 1000);
        });
    }
});