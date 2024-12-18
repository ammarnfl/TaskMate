import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBqMW6ozva8xccC5vau5s4SUBE-vd4BVCc",
    authDomain: "taskmate-94a36.firebaseapp.com",
    projectId: "taskmate-94a36",
    storageBucket: "taskmate-94a36.firebasestorage.app",
    messagingSenderId: "937144601167",
    appId: "1:937144601167:web:5d7dfbdf87998bae9f383a",
    measurementId: "G-K1PYXWSRSD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Get references to form and elements
const pelaksanaApplicationForm = document.getElementById("pelaksanaApplicationForm");
pelaksanaApplicationForm.addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent form from refreshing the page

    const fullName = document.getElementById("fullName").value;
    const dateOfBirth = document.getElementById("dateOfBirth").value;
    const primaryMobileNumber = document.getElementById("primaryMobileNumber").value;
    const emergencyPhoneNumber = document.getElementById("emergencyPhoneNumber").value;
    const idCardPhoto = document.getElementById("idCardPhoto").files[0];
    const profilePhoto = document.getElementById("profilePhoto").files[0];

    // Validate that all required fields are filled
    if (!idCardPhoto || !profilePhoto) {
        alert("Please upload the required files.");
        return;
    }

    try {
        // Get the current user ID
        const user = auth.currentUser;

        if (!user) {
            alert("You need to be logged in to submit this form.");
            return;
        }

        const userId = user.uid;

        // Generate unique names for files if necessary
        const idCardPhotoName = `idCardPhoto-${userId}-${Date.now()}`;
        const profilePhotoName = `profilePhoto-${userId}-${Date.now()}`;

        // Simulate file upload (Implement file upload using Firebase Storage if needed)
        // For this example, we just use dummy paths
        const idCardPhotoPath = `uploads/idCards/${idCardPhotoName}`;
        const profilePhotoPath = `uploads/profiles/${profilePhotoName}`;

        // Prepare data to save
        const applicationData = {
            fullName,
            dateOfBirth,
            primaryMobileNumber,
            emergencyPhoneNumber,
            idCardPhoto: idCardPhotoPath,
            profilePhoto: profilePhotoPath,
            applicationDate: new Date().toISOString(),
        };

        const applicationRef = ref(database, `pelaksana/${userId}`);
        await set(applicationRef, applicationData);

        alert("Application submitted successfully!");
        
        // Display loading animation
        const verificationContainer = document.createElement('div');
        verificationContainer.className = 'verification-container';
        verificationContainer.innerHTML = `
            <div class="verification-content">
                <div class="loader"></div>
                <h2>Verifying your data...</h2>
            </div>
        `;
        document.body.appendChild(verificationContainer);

        // Simulate loading for 5 seconds
        setTimeout(() => {
            verificationContainer.innerHTML = `
                <div class="verification-content">
                    <img src="images/checklist-icon.png" alt="Checklist Icon" class="checklist-icon">
                    <h2>Data Verified Successfully!</h2>
                    <p>Your application has been verified.</p>
                    <button id="okButton">OK</button>
                </div>
            `;

            const okButton = document.getElementById("okButton");
            okButton.addEventListener("click", () => {
                verificationContainer.remove();
                window.location.href = 'pelaksana-quest.html';
            });
        }, 5000); // 5 seconds
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while submitting the form. Please try again.");
    }
});

// if (pelaksanaApplicationForm) {
//     pelaksanaApplicationForm.addEventListener("submit", async function (e) {
//         e.preventDefault();

//         const fullName = document.getElementById("fullName").value;
//         const dateOfBirth = document.getElementById("dateOfBirth").value;
//         const primaryMobileNumber = document.getElementById("primaryMobileNumber").value;
//         const emergencyPhoneNumber = document.getElementById("emergencyPhoneNumber").value;

//         try {
//             const user = auth.currentUser;

//             if (!user) {
//                 alert("You need to be logged in to submit this form.");
//                 return;
//             }

//             const userId = user.uid;

//             const applicationData = {
//                 fullName,
//                 dateOfBirth,
//                 primaryMobileNumber,
//                 emergencyPhoneNumber,
//                 idCardPhoto: idCardPhotoPath,
//                 profilePhoto: profilePhotoPath,
//                 applicationDate: new Date().toISOString(),
//             };

//             const applicationRef = ref(database, `pelaksana/${userId}`);
//             await set(applicationRef, applicationData);

//             // Update registration status to true
//             const userRef = ref(database, `users/${userId}`);
//             await set(userRef, { isRegistered: true }, { merge: true });

//             alert("Application submitted successfully!");
//             window.location.href = 'pelaksana-quest.html';
//         } catch (error) {
//             console.error("Error submitting form:", error);
//             alert("An error occurred while submitting the form. Please try again.");
//         }
//     });
// }