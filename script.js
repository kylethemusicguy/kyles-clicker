// Initial resource counts
let woodCount = 0;
let stoneCount = 0;
let goldCount = 0;
let pickaxeCount = 0;
let chiselCount = 0;
let minersCount = 0;
let currentWorld = 1; // Start at World 1
let isUnlocked = false;

// DOM Elements
const woodCountElement = document.getElementById("woodCount");
const stoneCountElement = document.getElementById("stoneCount");
const goldCountElement = document.getElementById("goldCount");
const pickaxeCountElement = document.getElementById("pickaxeCount");
const chiselCountElement = document.getElementById("chiselCount");
const minersCountElement = document.getElementById("minersCount");
const worldElement = document.getElementById("worldElement");

const woodButton = document.getElementById("woodBtn");
const stoneButton = document.getElementById("stoneBtn");
const goldButton = document.getElementById("goldBtn");
const pickaxeButton = document.getElementById("pickaxeBtn");
const chiselButton = document.getElementById("chiselBtn");
const minersButton = document.getElementById("minersBtn");

const secretCodeInput = document.getElementById("secretCode");
const unlockButton = document.getElementById("unlockBtn");

// Save and load game data from localStorage
function loadGame() {
    if (localStorage.getItem('playerData')) {
        const savedData = JSON.parse(localStorage.getItem('playerData'));
        woodCount = savedData.woodCount;
        stoneCount = savedData.stoneCount;
        goldCount = savedData.goldCount;
        pickaxeCount = savedData.pickaxeCount;
        chiselCount = savedData.chiselCount;
        minersCount = savedData.minersCount;
        currentWorld = savedData.currentWorld;
        updateUI();
    }
}

// Save the game to localStorage
function saveGame() {
    const playerData = {
        woodCount,
        stoneCount,
        goldCount,
        pickaxeCount,
        chiselCount,
        minersCount,
        currentWorld
    };
    localStorage.setItem('playerData', JSON.stringify(playerData));
}

// Update UI elements
function updateUI() {
    woodCountElement.textContent = woodCount;
    stoneCountElement.textContent = stoneCount;
    goldCountElement.textContent = goldCount;
    pickaxeCountElement.textContent = pickaxeCount;
    chiselCountElement.textContent = chiselCount;
    minersCountElement.textContent = minersCount;
    worldElement.textContent = `World: ${currentWorld}`;
    saveGame();
}

// Unlock worlds
function unlockWorld() {
    if (woodCount >= 100 && currentWorld === 1) {
        currentWorld = 2;
        alert("You unlocked the Desert World!");
        saveGame();
        updateUI();
    }

    if (stoneCount >= 200 && currentWorld === 2) {
        currentWorld = 3;
        alert("You unlocked the Mountain World!");
        saveGame();
        updateUI();
    }

    // More worlds can be added with similar conditions
}

// Mine Wood
function updateWood() {
    woodCount++;
    updateUI();
    checkPickaxeAvailability();
}

// Mine Stone
function updateStone() {
    if (pickaxeCount > 0 || isUnlocked) {
        stoneCount++;
        updateUI();
        checkChiselAvailability();
    } else {
        alert("You need a pickaxe to mine stone! 🪓");
    }
}

// Mine Gold
function updateGold() {
    if (chiselCount > 0 || isUnlocked) {
        goldCount++;
        updateUI();
    } else {
        alert("You need a chisel to mine gold! 🔨");
    }
}

// Buy Pickaxe
function craftPickaxe() {
    if (woodCount >= 5) {
        pickaxeCount++;
        woodCount -= 5;
        updateUI();
        unlockStoneButton();
    }
}

// Buy Chisel
function craftChisel() {
    if (stoneCount >= 100) {
        chiselCount++;
        stoneCount -= 100;
        updateUI();
        unlockGoldButton();
    }
}

// Buy Miners
function buyMiners() {
    if (woodCount >= 50) {
        minersCount++;
        woodCount -= 50;
        updateUI();
    } else {
        alert("You need 50 wood to buy a miner!");
    }
}

// Unlock Stone Button
function unlockStoneButton() {
    stoneButton.classList.remove("locked");
}

// Unlock Gold Button
function unlockGoldButton() {
    goldButton.classList.remove("locked");
}

// Unlock Everything (Secret Code)
function unlockEverything() {
    if (secretCodeInput.value.toLowerCase() === "purple") {
        isUnlocked = true;
        pickaxeButton.disabled = false;
        chiselButton.disabled = false;
        woodButton.disabled = false;
        stoneButton.disabled = false;
        goldButton.disabled = false;
        stoneButton.classList.remove("locked");
        goldButton.classList.remove("locked");
        alert("You unlocked everything!");
        saveGame();
    } else {
        alert("Incorrect secret code.");
    }
}

// Event listeners for buttons
woodButton.addEventListener("click", updateWood);
stoneButton.addEventListener("click", updateStone);
goldButton.addEventListener("click", updateGold);
pickaxeButton.addEventListener("click", craftPickaxe);
chiselButton.addEventListener("click", craftChisel);
minersButton.addEventListener("click", buyMiners);
unlockButton.addEventListener("click", unlockEverything);

// Load game when the page loads
window.onload = loadGame;

// Unlock worlds
setInterval(unlockWorld, 1000); // Check every second
