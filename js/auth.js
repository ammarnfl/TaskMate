document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                // Autentikasi pengguna di Firebase Authentication
                const userCredential = await auth.signInWithEmailAndPassword(email, password);
                const user = userCredential.user;

                // Ambil data role dari Firestore atau Realtime Database
                const db = firebase.firestore();
                const doc = await db.collection('users').doc(user.uid).get();

                if (doc.exists) {
                    const role = doc.data().role;

                    // Redirect sesuai role
                    if (role === 'pemesan') {
                        window.location.href = 'pemesan-quest.html';
                    } else if (role === 'pelaksana') {
                        window.location.href = 'pelaksana-quest.html';
                    } else {
                        showNotification('Invalid user role', 'error');
                    }
                } else {
                    showNotification('User data not found', 'error');
                }
            } catch (error) {
                showNotification(error.message, 'error');
            }
        });
    }
});
