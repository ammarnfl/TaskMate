document.addEventListener('DOMContentLoaded', () => {
    const agreeTerms = document.getElementById('agree-terms');
    const doneBtn = document.getElementById('done-btn');

    if (agreeTerms && doneBtn) {
        agreeTerms.addEventListener('change', () => {
            doneBtn.disabled = !agreeTerms.checked;
        });

        doneBtn.addEventListener('click', () => {
            if (agreeTerms.checked) {
                window.location.href = 'register.html';
            }
        });
    }
});