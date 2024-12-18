const auth = firebase.auth();
const database = firebase.database();

const pelaksanaApplicationForm = document.getElementById('pelaksanaApplicationForm');

pelaksanaApplicationForm.addEventListener('submit', (e) => {
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
    const idCardPhoto = document.getElementById('idCardPhoto').files[0];
    const profilePhoto = document.getElementById('profilePhoto').files[0];

    // Here you would typically upload the files to Firebase Storage
    // For simplicity, we'll just store the file names
    database.ref('pelaksana/' + user.uid).set({
        fullName: fullName,
        dateOfBirth: dateOfBirth,
        primaryMobileNumber: primaryMobileNumber,
        emergencyPhoneNumber: emergencyPhoneNumber,
        idCardPhoto: idCardPhoto ? idCardPhoto.name : null,
        profilePhoto: profilePhoto ? profilePhoto.name : null
    }).then(() => {
        alert('Application submitted successfully!');
        window.location.href = 'pelaksana-quest.html';
    }).catch((error) => {
        alert('Failed to submit application: ' + error.message);
    });
});