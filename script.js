// ==========================================
// 1. ENGINE CONTROLLER CACHE CONFIGURATIONS
// ==========================================
let selectedItemFile = "";
let selectedItemName = "";

let timerInterval = null;
let timeRemainingSeconds = 25 * 60; 
let isTimerRunning = false;

// Display Panel Interface Framework Handlers
function openMenu() { document.getElementById("menu-modal").style.display = "flex"; }
function openTv() { document.getElementById("tv-modal").style.display = "flex"; }
function openTimer() { document.getElementById("timer-modal").style.display = "flex"; }

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
    if (modalId === 'menu-modal') resetMenuSelections();
}

// ==========================================
// 2. CHECKOUT TRANSACTION PROCEDURES
// ==========================================
function selectItem(element, filename) {
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('selected'));
    element.classList.add('selected');
    selectedItemFile = filename;
    selectedItemName = element.querySelector('.item-name').innerText;
}

function submitOrder() {
    const nameInput = document.getElementById("user-name-input");
    const name = nameInput.value.trim();

    if (!selectedItemFile || !name) {
        alert("Please pick a menu card item and enter your name!");
        return;
    }

    document.getElementById("menu-modal").style.display = "none";

    // Clear previous food asset array deck completely 
    const tableZone = document.getElementById("side-table-zone");
    tableZone.innerHTML = ""; 

    // Instantiate fresh dynamic dish placement directly onto left table deck
    const dishImg = document.createElement("img");
    dishImg.src = selectedItemFile; 
    dishImg.classList.add("served-dish");
    dishImg.alt = selectedItemName;
    tableZone.appendChild(dishImg);

    // Populate log verification data block overlay sheet
    document.getElementById("receipt-details").innerHTML = `
        <p style="margin: 12px 0; font-size: 16px;"><strong>Ordered:</strong> ${selectedItemName}</p>
        <p style="font-size: 18px; color: #8c715c; font-weight: bold; text-transform: uppercase;">✨ ${name} ✨</p>
    `;
    document.getElementById("receipt-modal").style.display = "flex";

    resetMenuSelections();
    nameInput.value = "";
}

function resetMenuSelections() {
    selectedItemFile = ""; selectedItemName = "";
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('selected'));
}

// ==========================================
// 3. TELEVISION STREAMS TRANSLATOR
// ==========================================
function loadYoutubeVideo() {
    const urlInput = document.getElementById("youtube-url-input").value.trim();
    const screenContainer = document.getElementById("tv-screen-container");
    
    if (!urlInput) {
        alert("Please paste a valid YouTube string line!");
        return;
    }

    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = urlInput.match(regExp);

    if (match && match[2].length === 11) {
        const videoId = match[2];
        screenContainer.innerHTML = `<iframe src="https://youtube.com{videoId}?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    } else {
        alert("Could not process this video link. Verify it is a direct YouTube browser string!");
    }
}

// ==========================================
// 4. FOCUS CLOCK DRIVER MATRIX
// ==========================================
function updateTimerInterfaceDisplays() {
    const minutes = Math.floor(timeRemainingSeconds / 60);
    const seconds = timeRemainingSeconds % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    document.getElementById("modal-time-display").innerText = timeString;
    document.getElementById("hud-time-string").innerText = timeString;
}

function setTimerPreset(minutes) {
    pauseTimerExecution();
    timeRemainingSeconds = minutes * 60;
    updateTimerInterfaceDisplays();
}

function toggleTimerRunning() {
    const btn = document.getElementById("start-pause-btn");
    if (isTimerRunning) {
        pauseTimerExecution();
        btn.innerText = "START";
    } else {
        isTimerRunning = true;
        btn.innerText = "PAUSE";
        timerInterval = setInterval(() => {
            if (timeRemainingSeconds > 0) {
                timeRemainingSeconds--;
                updateTimerInterfaceDisplays();
            } else {
                clearInterval(timerInterval);
                isTimerRunning = false;
                btn.innerText = "START";
                alert("Study block complete! Time to stand up and grab an iced latte.");
            }
        }, 1000);
    }
}

function pauseTimerExecution() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    document.getElementById("start-pause-btn").innerText = "START";
}

function resetTimer() {
    pauseTimerExecution();
    timeRemainingSeconds = 25 * 60; 
    updateTimerInterfaceDisplays();
}
