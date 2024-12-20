const questList = document.getElementById('questList');

// Sample data to simulate quests from Firebase
const sampleQuests = {
    'user1': {
        'quest1': {
            title: "Membeli Makanan Kucing",
            description: "Tolong beli makanan kucing di Indomaret yang ada di Jalan Tubagus Ismail",
            status: "Available",
            startDate: "2024-12-15",
            startTime: "08:00",
            endDate: "2024-12-20",
            endTime: "18:00"
        },
        'quest2': {
            title: "Menyapu Halaman Rumah",
            description: "Tolong sapu halaman rumah saya 20 Hektare",
            status: "Available",
            startDate: "2024-12-14",
            startTime: "09:00",
            endDate: "2024-12-18",
            endTime: "15:00"
        }
    },
    'user2': {
        'quest3': {
            title: "Deliver Package",
            description: "Deliver a package to the main city center safely.",
            status: "Available",
            startDate: "2024-12-10",
            startTime: "09:00",
            endDate: "2024-12-12",
            endTime: "15:00"
        }
    }
};

function loadQuests() {
    questList.innerHTML = '';
    if (Object.keys(sampleQuests).length > 0) {
        Object.entries(sampleQuests).forEach(([userId, userQuests]) => {
            Object.entries(userQuests).forEach(([questId, quest]) => {
                const questElement = document.createElement('div');
                questElement.className = 'quest-container';
                questElement.innerHTML = `
                    <div class="quest-left">
                        <h3 class="quest-title">${quest.title}</h3>
                        <p class="quest-description">${quest.description}</p>
                        <p class="quest-dates">Start: ${quest.startDate} ${quest.startTime}</p>
                        <p class="quest-dates">End: ${quest.endDate} ${quest.endTime}</p>
                    </div>
                    <div class="quest-right">
                        <span class="quest-status ${quest.status.toLowerCase()}">${quest.status}</span>
                        ${quest.status === "Available" 
                            ? `<button class="accept-btn" onclick="acceptQuest('${userId}', '${questId}')">Accept Quest</button>`
                            : `<button class="cancel-btn" onclick="cancelQuest('${userId}', '${questId}')">Cancel Quest</button>`
                        }
                    </div>
                `;
                questList.appendChild(questElement);
            });
        });
    } else {
        questList.innerHTML = '<p>No quests available at the moment.</p><p>Check back soon for updates!</p>';
    }
}

function acceptQuest(userId, questId) {
    // For now, we'll just update the local data and re-render
    if (sampleQuests[userId] && sampleQuests[userId][questId]) {
        sampleQuests[userId][questId].status = "Accepted";
        alert(`Quest "${sampleQuests[userId][questId].title}" accepted!`);
        loadQuests(); // Re-render the quest list
    }
}

function cancelQuest(userId, questId) {
    if (sampleQuests[userId] && sampleQuests[userId][questId]) {
        sampleQuests[userId][questId].status = "Available";
        alert(`Quest "${sampleQuests[userId][questId].title}" cancelled and is now available again.`);
        loadQuests(); // Re-render the quest list
    }
}

// Load quests when the page is ready
document.addEventListener('DOMContentLoaded', loadQuests);

