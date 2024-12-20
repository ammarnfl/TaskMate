const questList = document.getElementById('questList');

function loadQuests() {
    const questsRef = database.ref('quests');
    questsRef.on('value', (snapshot) => {
        const data = snapshot.val();
        questList.innerHTML = '';
        if (data) {
            Object.entries(data).forEach(([userId, userQuests]) => {
                Object.entries(userQuests).forEach(([questId, quest]) => {
                    const questElement = document.createElement('div');
                    questElement.className = 'quest-item';
                    questElement.innerHTML = `
                        <h3>${quest.title}</h3>
                        <p>${quest.description}</p>
                        <button onclick="acceptQuest('${userId}', '${questId}')">Accept Quest</button>
                    `;
                    questList.appendChild(questElement);
                });
            });
        } else {
            questList.innerHTML = '<p>No quest here yet</p><p>Check back soon for updates!</p>';
        }
    });
}

function acceptQuest(userId, questId) {
    const user = auth.currentUser;
    if (!user) return;

    // Here you would typically implement the logic for accepting a quest
    // For simplicity, we'll just show an alert
    alert('Quest accepted!');
}