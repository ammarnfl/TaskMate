document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;

            try {
                // Registrasi pengguna di Firebase Authentication
                const userCredential = await auth.createUserWithEmailAndPassword(email, password);
                const user = userCredential.user;

                // Simpan role pengguna ke Firestore atau Realtime Database
                const userId = user.uid;
                const db = firebase.firestore(); // Pastikan Firestore diaktifkan di proyek Firebase
                await db.collection('users').doc(userId).set({
                    email: email,
                    role: role,
                });

                showNotification('Registration successful!');
                window.location.href = 'index.html';
            } catch (error) {
                showNotification(error.message, 'error');
            }
        });
    }
});
