document.addEventListener('DOMContentLoaded', () => {
    const stashList = document.getElementById('stash-list');
    const loadoutList = document.getElementById('loadout-list');
    const startGameBtn = document.getElementById('start-game-btn');
    const mapChoices = document.querySelectorAll('.map-choice');
    const resetBtn = document.getElementById('reset-btn');

    let playerStash = JSON.parse(localStorage.getItem('playerStash')) || ['Tabanca', 'Sıhhiye Çantası', 'Tabanca Mermisi (x15)'];
    let playerLoadout = [];
    let selectedMap = 'sanayi'; // Default map

    function updateLists() {
        stashList.innerHTML = '';
        playerStash.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            li.addEventListener('click', () => moveToLoadout(item));
            stashList.appendChild(li);
        });

        loadoutList.innerHTML = '';
        playerLoadout.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            li.addEventListener('click', () => moveToStash(item));
            loadoutList.appendChild(li);
        });
        localStorage.setItem('playerStash', JSON.stringify(playerStash));
    }

    function moveToLoadout(item) {
        const index = playerStash.indexOf(item);
        if (index > -1) {
            playerStash.splice(index, 1);
            playerLoadout.push(item);
            updateLists();
        }
    }

    function moveToStash(item) {
        const index = playerLoadout.indexOf(item);
        if (index > -1) {
            playerLoadout.splice(index, 1);
            playerStash.push(item);
            updateLists();
        }
    }

    mapChoices.forEach(choice => {
        choice.addEventListener('click', () => {
            mapChoices.forEach(c => c.classList.remove('selected'));
            choice.classList.add('selected');
            selectedMap = choice.dataset.map;
        });
    });
    // Set default selection
    document.getElementById('map-sanayi').classList.add('selected');


    startGameBtn.addEventListener('click', () => {
        sessionStorage.setItem('playerLoadout', JSON.stringify(playerLoadout));
        sessionStorage.setItem('selectedMap', selectedMap);
        window.location.href = 'game.html';
    });

    resetBtn.addEventListener('click', () => {
        if (confirm('Tüm ilerlemen silinecek ve zulandaki her şey kaybolacak. Emin misin?')) {
            localStorage.removeItem('playerStash');
            playerStash = ['Tabanca', 'Sıhhiye Çantası', 'Tabanca Mermisi (x15)'];
            playerLoadout = [];
            updateLists();
        }
    });

    updateLists();
});