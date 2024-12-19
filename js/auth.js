import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

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

// Auth Status
// function checkAuthState() {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // User is signed in
//         if (window.location.pathname.includes('index.html') || window.location.pathname.includes('register.html') || window.location.pathname.includes('terms.html')) {
//           window.location.href = role === 'Pemesan' ? 'pemesan-quest.html' : 'pelaksana-quest.html';
//         }
//       } else {
//         // User is signed out
//         if (!window.location.pathname.includes('index.html') && !window.location.pathname.includes('register.html') && !window.location.pathname.includes('terms.html')) {
//           window.location.href = 'index.html';
//         }
//       }
//     });
//   }

// Auth Status
function checkAuthState() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            const role = localStorage.getItem('userRole'); // Retrieve stored role
            if (window.location.pathname.includes('index.html') || window.location.pathname.includes('register.html') || window.location.pathname.includes('terms.html')) {
                // Navigate based on the role and status
                const userRef = ref(database, 'users/' + user.uid);
                get(userRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        const userData = snapshot.val();
                        const role = userData.role;

                        // Check if the user has completed the application
                        const applicationRef = ref(database, `${role.toLowerCase()}/${user.uid}`);
                        get(applicationRef).then((appSnapshot) => {
                            if (appSnapshot.exists()) {
                                // User has completed the application, navigate to quest
                                window.location.href = role === 'Pemesan' ? 'pemesan-quest.html' : 'pelaksana-quest.html';
                            } else {
                                // User has not completed the application, navigate to application page
                                window.location.href = role === 'Pemesan' ? 'pemesan-application.html' : 'pelaksana-application.html';
                            }
                        }).catch((error) => {
                            console.error('Error checking application status:', error);
                        });
                    }
                }).catch((error) => {
                    console.error('Error fetching user data:', error);
                });
            }
        } else {
            // User is signed out
            if (!window.location.pathname.includes('index.html') && !window.location.pathname.includes('register.html') && !window.location.pathname.includes('terms.html')) {
                window.location.href = 'index.html';
            }
        }
    });
}

// Call the function to check auth state
checkAuthState();

// Login
const loginButton = document.getElementById('loginButton');
if (loginButton) {
    loginButton.addEventListener("click", function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                // Retrieve user role from the Realtime Database
                const userRef = ref(database, 'users/' + user.uid);
                get(userRef)
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            const userData = snapshot.val();
                            const role = userData.role;

                            // Store userId and role in localStorage (optional)
                            localStorage.setItem("loggedInUserId", user.uid);
                            localStorage.setItem("userRole", role);

                            alert('Login successful!');

                            window.location.href = role === 'Pemesan' ? 'pemesan-quest.html' : 'pelaksana-quest.html';
                        } else {
                            alert('User data not found in database.');
                        }
                    })
                    .catch((error) => {
                        console.error('Error fetching user data:', error);
                        alert('An error occurred while retrieving user role.');
                    });
            })
            .catch((error) => {
                alert('Incorrect Email or Password');
            });
    });
}

// Register
const registerButton = document.getElementById('registerButton');
// if (registerButton) {
//     registerButton.addEventListener("click", function(e) {
//         e.preventDefault();
//         const email = document.getElementById('email').value;
//         const password = document.getElementById('password').value;
//         const confirmPassword = document.getElementById('confirmPassword').value;
//         const phoneNumber = document.getElementById('phoneNumber').value;
//         const username = document.getElementById('username').value;
//         const role = document.getElementById('role').value;
//         const agreeTerms = document.getElementById('agreeTerms').checked;

//         if (password !== confirmPassword) {
//             alert('Passwords do not match');
//             return;
//         }

//         if (!agreeTerms) {
//             alert('You must agree to the Terms & Conditions');
//             return;
//         }

//         createUserWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                 const user = userCredential.user;
//                 const userRef = ref(database, 'users/' + user.uid);
//                 return set(userRef, {
//                     email: email,
//                     phoneNumber: phoneNumber,
//                     username: username,
//                     role: role
//                 });
//             })
//             .then(() => {
//                 alert('Registration successful!');
//                 window.location.href = role === 'Pemesan' ? 'pemesan-application.html' : 'pelaksana-application.html';
//             })
//             .catch((error) => {
//                 alert('Registration failed: ' + error.message);
//             });
//     });
// }
if (registerButton) {
    registerButton.addEventListener("click", function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const username = document.getElementById('username').value;
        const role = document.getElementById('role').value;
        const agreeTerms = document.getElementById('agreeTerms').checked;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        if (!agreeTerms) {
            alert('You must agree to the Terms & Conditions');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const userRef = ref(database, `users/${user.uid}`);
                return set(userRef, {
                    email: email,
                    phoneNumber: phoneNumber,
                    username: username,
                    role: role,
                    isRegistered: false // Set initial registration status to false
                });
            })
            .then(() => {
                alert('Registration successful!');
                window.location.href = role === 'Pemesan' ? 'pemesan-application.html' : 'pelaksana-application.html';
            })
            .catch((error) => {
                alert('Registration failed: ' + error.message);
            });
    });
}

// Logout
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        signOut(auth).then(() => {
            window.location.href = 'index.html';
        }).catch((error) => {
            console.error('Logout failed:', error);
        });
    });
}
