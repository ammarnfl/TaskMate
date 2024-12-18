const auth = firebase.auth();
const database = firebase.database();

const pemesanApplicationForm = document.getElementById('pemesanApplicationForm');

pemesanApplicationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
        alert('User not authenticated');
        return;
    }

    const fullName = document.getElementById('fullName').value;
    const dateOfBirth = document.getElementById('dateOfBirth').value;
    const primaryMobileNumber = document.getElementById('primaryMobileNumber').value;
    const emergencyPhoneNumber = document.getElementById('emergencyPhoneNumber').value;

    database.ref('pemesan/' + user.uid).set({
        fullName: fullName,
        dateOfBirth: dateOfBirth,
        primaryMobileNumber: primaryMobileNumber,
        emergencyPhoneNumber: emergencyPhoneNumber
    }).then(() => {
        alert('Application submitted successfully!');
        window.location.href = 'pemesan-quest.html';
    }).catch((error) => {
        alert('Failed to submit application: ' + error.message);
    });
});