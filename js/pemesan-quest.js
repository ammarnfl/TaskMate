const auth = firebase.auth();
const database = firebase.database();

const questList = document.getElementById('questList');
const addQuestBtn = document.getElementById('addQuestBtn');
const addQuestModal = document.getElementById('addQuestModal');
const addQuestForm = document.getElementById('addQuestForm');
const cancelAddQuest = document.getElementById('cancelAddQuest');

auth.onAuthStateChanged((user) => {
    if (user) {
        loadQuests(user.uid);
    } else {
        window.location.href = 'index.html';
    }
});

function loadQuests(userId) {
    const questsRef = database.ref('quests/' + userId);
    questsRef.on('value', (snapshot) => {
        const data = snapshot.val();
        questList.innerHTML = '';
        if (data) {
            Object.entries(data).forEach(([key, quest]) => {
                const questElement = document.createElement('div');
                questElement.className = 'quest-item';
                questElement.innerHTML = `
                    <h3>${quest.title}</h3>
                    <p>${quest.description}</p>
                `;
                questList.appendChild(questElement);
            });
        } else {
            questList.innerHTML = '<p>No quest submitted yet</p><p>Start creating your task now!</p>';
        }
    });
}

addQuestBtn.addEventListener('click', () => {
    addQuestModal.style.display = 'block';
});

cancelAddQuest.addEventListener('click', () => {
    addQuestModal.style.display = 'none';
});

addQuestForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;

    const title = document.getElementById('questTitle').value;
    const description = document.getElementById('questDescription').value;

    const newQuestRef = database.ref('quests/' + user.uid).push();
    newQuestRef.set({
        title: title,
        description: description
    }).then(() => {
        addQuestModal.style.display = 'none';
        addQuestForm.reset();
    }).catch((error) => {
        alert('Failed to add quest: ' + error.message);
    });
});