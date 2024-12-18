import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
// import { app } from "firebase-config";

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
function checkAuthState() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      if (window.location.pathname.includes('index.html') || window.location.pathname.includes('register.html')) {
        window.location.href = 'pemesan-quest.html'; // Redirect to main page if already logged in
      }
    } else {
      // User is signed out
      if (!window.location.pathname.includes('index.html') && !window.location.pathname.includes('register.html')) {
        window.location.href = 'index.html'; // Redirect to login page if not logged in
      }
    }
  });
}

// Call the function to check auth state
// checkAuthState();

// Login
const loginButton = document.getElementById('loginButton');
loginButton.addEventListener("click", function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem("loggedInUserId", user.uid);
            alert('Login successful!');
            window.location.href = role === 'Pemesan' ? 'pemesan-quest.html' : 'pelaksana-quest.html';
        })
        .catch((error) => {
            alert('Incorrect Email or Password');
        });
});

// Register
const registerButton = document.getElementById('registerButton');
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

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return database.ref('users/' + user.uid).set({
                email: email,
                phoneNumber: phoneNumber,
                username: username,
                role: role
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

// Logout
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = 'index.html';
    }).catch((error) => {
        console.error('Logout failed:', error);
    });
});