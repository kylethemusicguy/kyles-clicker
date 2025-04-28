// Initial resource counts
let woodCount = 0;
let stoneCount = 0;
let goldCount = 0;
let pickaxeCount = 0;
let chiselCount = 0;

// Unlock flag
let isUnlocked = false;

// DOM Elements
const woodCountElement = document.getElementById("woodCount");
const stoneCountElement = document.getElementById("stoneCount");
const goldCountElement = document.getElementById("goldCount");
const pickaxeCountElement = document.getElementById("pickaxeCount");
const chiselCountElement = document.getElementById("chiselCount");

const woodButton = document.getElementById("woodBtn");
const stoneButton = document.getElementById("stoneBtn");
const goldButton = document.getElementById("goldBtn");
const pickaxeButton = document.getElementById("pickaxeBtn");
const chiselButton = document.getElementById("chiselBtn");

const secretCodeInput = document.getElementById("secretCode");
const unlockButton = document.getElementById("unlockBtn");

// Functions to update counts
function updateWood() {
    woodCount++;
    woodCountElement.textContent = woodCount;
    checkPickaxeAvailability();
}

function updateStone() {
    if (pickaxeCount > 0 || isUnlocked) {
        stoneCount++;
        stoneCountElement.textContent = stoneCount;
        checkChiselAvailability();
    } else {
        alert("you need a pickaxe to mine stone! 🪓");
    }
}

function updateGold() {
    if (chiselCount > 0 || isUnlocked) {
        goldCount++;
        goldCountElement.textContent = goldCount;
    } else {
        alert("you need a chisel to mine gold! 🔨");
    }
}

function checkPickaxeAvailability() {
    if (woodCount >= 5) {
        pickaxeButton.disabled = false;
    }
}

function checkChiselAvailability() {
    if (stoneCount >= 100) {
        chiselButton.disabled = false;
    }
}

function craftPickaxe() {
    if (woodCount >= 5) {
        pickaxeCount++;
        woodCount -= 5;
        woodCountElement.textContent = woodCount;
        pickaxeCountElement.textContent = pickaxeCount;
        checkPickaxeAvailability();
    }
}

function craftChisel() {
    if (stoneCount >= 100) {
        chiselCount++;
        stoneCount -= 100;
        stoneCountElement.textContent = stoneCount;
        chiselCountElement.textContent = chiselCount;
        checkChiselAvailability();
    }
}

function unlockEverything() {
    if (secretCodeInput.value.toLowerCase() === "purple") {
        isUnlocked = true;
        // Enable all buttons
        pickaxeButton.disabled = false;
        chiselButton.disabled = false;
        woodButton.disabled = false;
        stoneButton.disabled = false;
        goldButton.disabled = false;
        alert("You unlocked everything!");
    } else {
        alert("Incorrect secret code.");
    }
}

// Event Listeners for the buttons
woodButton.addEventListener("click", updateWood);
stoneButton.addEventListener("click", updateStone);
goldButton.addEventListener("click", updateGold);
pickaxeButton.addEventListener("click", craftPickaxe);
chiselButton.addEventListener("click", craftChisel);
unlockButton.addEventListener("click", unlockEverything);
