const questList = document.getElementById('questList');
const addQuestBtn = document.getElementById('addQuestBtn');
const addQuestModal = document.getElementById('addQuestModal');
const addQuestForm = document.getElementById('addQuestForm');
const cancelAddQuest = document.getElementById('cancelAddQuest');

// Sampel data quest
const sampleQuests = [
    {
        title: "Membeli Makanan Kucing",
        description: "Tolong beli makanan kucing di Indomaret yang ada di Jalan Tubagus Ismail",
        status: "Pending",
        startDate: "2024-12-15",
        startTime: "08:00",
        endDate: "2024-12-20",
        endTime: "18:00"
    },
    {
        title: "Menyapu Halaman Rumah",
        description: "Tolong sapu halaman rumah saya 20 Hektare",
        status: "Cancelled",
        startDate: "2024-12-14",
        startTime: "09:00",
        endDate: "2024-12-18",
        endTime: "15:00"
    },
    {
        title: "Deliver Package",
        description: "Deliver a package to the main city center safely.",
        status: "Completed",
        startDate: "2024-12-10",
        startTime: "09:00",
        endDate: "2024-12-12",
        endTime: "15:00"
    }
];

// Render quests
function renderQuests(quests) {
    questList.innerHTML = '';
    quests.forEach((quest) => {
        const questElement = document.createElement('div');
        questElement.innerHTML = `
            <div class="quest-container">
                <div class="quest-left">
                    <h3 class="quest-title">${quest.title}</h3>
                    <p class="quest-description">${quest.description}</p>
                    <p class="quest-dates">Start Date: ${quest.startDate} ${quest.startTime}</p>
                    <p class="quest-dates">End Date: ${quest.endDate} ${quest.endTime}</p>
                </div>
                <div class="quest-right">
                    <span class="quest-status ${quest.status.toLowerCase()}">${quest.status}</span>
                    <button class="details-btn" onclick="seeDetails('${quest.title}')">See Details</button>
                </div>
            </div>
        `;
        questList.appendChild(questElement);
    });
}


// Load sampel quests
document.addEventListener('DOMContentLoaded', () => {
    renderQuests(sampleQuests);
});

addQuestBtn.addEventListener('click', () => {
    addQuestModal.style.display = 'block';
});

cancelAddQuest.addEventListener('click', () => {
    addQuestModal.style.display = 'none';
});

addQuestForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('questTitle').value;
    const description = document.getElementById('questDescription').value;
    const startDate = document.getElementById('startDate').value;
    const startTime = document.getElementById('startTime').value;
    const endDate = document.getElementById('endDate').value;
    const endTime = document.getElementById('endTime').value;

    const newQuest = {
        title,
        description,
        status: "Pending",
        startDate,
        startTime,
        endDate,
        endTime
    };
    sampleQuests.push(newQuest);
    renderQuests(sampleQuests);

    addQuestModal.style.display = 'none';
    addQuestForm.reset();
});

function seeDetails(title) {
    alert(`Details for quest: ${title}`);
}
