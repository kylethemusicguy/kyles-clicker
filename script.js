// initial resource counts
let woodCount = 0;
let stoneCount = 0;
let goldCount = 0;
let pickaxeCount = 0;
let chiselCount = 0;
let minersCount = 0;
let currentWorld = 1;
let isUnlocked = false;

// dom elements
const woodCountElement = document.getElementById("woodCount");
const stoneCountElement = document.getElementById("stoneCount");
const goldCountElement = document.getElementById("goldCount");
const pickaxeCountElement = document.getElementById("pickaxeCount");
const chiselCountElement = document.getElementById("chiselCount");
const minersCountElement = document.getElementById("minersCount");
const worldDisplay = document.getElementById("worldDisplay");

const woodButton = document.getElementById("woodBtn");
const stoneButton = document.getElementById("stoneBtn");
const goldButton = document.getElementById("goldBtn");
const pickaxeButton = document.getElementById("pickaxeBtn");
const chiselButton = document.getElementById("chiselBtn");
const minersButton = document.getElementById("minersBtn");

const secretCodeInput = document.getElementById("secretCode");
const unlockButton = document.getElementById("unlockBtn");

const darkmodeToggle = document.getElementById("darkmodeToggle");
const craftMessage = document.getElementById("craftMessage");

// animation
function animateCount(element, newValue) {
    const current = parseInt(element.textContent);
    const increment = (newValue - current) / 10;
    let count = 0;
    const interval = setInterval(() => {
        if (count >= 10) {
            clearInterval(interval);
            element.textContent = newValue;
        } else {
            element.textContent = Math.round(current + increment * count);
            count++;
        }
    }, 20);
}

// main update funcs
function updateWood() {
    woodCount++;
    animateCount(woodCountElement, woodCount);
    checkPickaxeAvailability();
}

function updateStone() {
    if (pickaxeCount > 0 || isUnlocked) {
        stoneCount++;
        animateCount(stoneCountElement, stoneCount);
        checkChiselAvailability();
    } else {
        alert("you need a pickaxe to mine stone! 🪓");
    }
}

function updateGold() {
    if (chiselCount > 0 || isUnlocked) {
        goldCount++;
        animateCount(goldCountElement, goldCount);
        spawnSparkle();
    } else {
        alert("you need a chisel to mine gold! 🔨");
    }
}

function checkPickaxeAvailability() {
    pickaxeButton.disabled = woodCount < 5;
}

function checkChiselAvailability() {
    chiselButton.disabled = stoneCount < 100;
}

function craftPickaxe() {
    if (woodCount >= 5) {
        pickaxeCount++;
        woodCount -= 5;
        animateCount(woodCountElement, woodCount);
        animateCount(pickaxeCountElement, pickaxeCount);
        checkPickaxeAvailability();
        unlockStoneButton();
        showCraftAnimation("pickaxe");
    }
}

function craftChisel() {
    if (stoneCount >= 100) {
        chiselCount++;
        stoneCount -= 100;
        animateCount(stoneCountElement, stoneCount);
        animateCount(chiselCountElement, chiselCount);
        checkChiselAvailability();
        unlockGoldButton();
        showCraftAnimation("chisel");
    }
}

function unlockStoneButton() {
    stoneButton.classList.remove("locked");
}

function unlockGoldButton() {
    goldButton.classList.remove("locked");
}

function showCraftAnimation(toolName) {
    craftMessage.textContent = `you crafted a ${toolName}! 🎉`;
    craftMessage.style.display = "block";
    setTimeout(() => {
        craftMessage.style.display = "none";
    }, 2000);
}

function unlockEverything() {
    if (secretCodeInput.value.toLowerCase() === "purple") {
        isUnlocked = true;
        [woodButton, stoneButton, goldButton, pickaxeButton, chiselButton].forEach(btn => btn.disabled = false);
        stoneButton.classList.remove("locked");
        goldButton.classList.remove("locked");
        alert("you unlocked everything!");
    } else {
        alert("incorrect secret code.");
    }
}

// sparkle emoji
function spawnSparkle() {
    const sparkle = document.createElement("div");
    sparkle.textContent = "✨";
    sparkle.classList.add("sparkle");
    document.body.appendChild(sparkle);
    sparkle.style.left = (goldButton.getBoundingClientRect().left + Math.random() * 50) + "px";
    sparkle.style.top = (goldButton.getBoundingClientRect().top - 20) + "px";
    setTimeout(() => sparkle.remove(), 1000);
}

// miner logic
function buyMiner() {
    if (goldCount >= 50) {
        minersCount++;
        goldCount -= 50;
        animateCount(goldCountElement, goldCount);
        animateCount(minersCountElement, minersCount);
    } else {
        alert("not enough gold! need 50 to hire a miner ⛏️");
    }
}

setInterval(() => {
    if (minersCount >= 10) {
        const batches = Math.floor(minersCount / 10);
        woodCount += batches;
        stoneCount += batches;
        goldCount += batches;
        updateAllUI();
    }
}, 1000);

function updateAllUI() {
    woodCountElement.textContent = woodCount;
    stoneCountElement.textContent = stoneCount;
    goldCountElement.textContent = goldCount;
    pickaxeCountElement.textContent = pickaxeCount;
    chiselCountElement.textContent = chiselCount;
    minersCountElement.textContent = minersCount;
    worldDisplay.textContent = `world ${currentWorld}`;
}

// dark mode toggle
darkmodeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkmodeToggle.classList.toggle("slide");
    darkmodeToggle.textContent = document.body.classList.contains("dark-mode") ? "🌙" : "☀️";
});

// save + load
function saveGame() {
    const gameState = {
        woodCount, stoneCount, goldCount,
        pickaxeCount, chiselCount, minersCount,
        currentWorld, isUnlocked,
        darkMode: document.body.classList.contains("dark-mode")
    };
    localStorage.setItem("clickerSave", JSON.stringify(gameState));
}

function loadGame() {
    const data = JSON.parse(localStorage.getItem("clickerSave"));
    if (!data) return;
    woodCount = data.woodCount || 0;
    stoneCount = data.stoneCount || 0;
    goldCount = data.goldCount || 0;
    pickaxeCount = data.pickaxeCount || 0;
    chiselCount = data.chiselCount || 0;
    minersCount = data.minersCount || 0;
    currentWorld = data.currentWorld || 1;
    isUnlocked = data.isUnlocked || false;

    if (data.darkMode) {
        document.body.classList.add("dark-mode");
        darkmodeToggle.textContent = "🌙";
    }
    updateAllUI();
}

setInterval(saveGame, 5000);
window.addEventListener("load", loadGame);

// event listeners
woodButton.addEventListener("click", updateWood);
stoneButton.addEventListener("click", updateStone);
goldButton.addEventListener("click", updateGold);
pickaxeButton.addEventListener("click", craftPickaxe);
chiselButton.addEventListener("click", craftChisel);
minersButton.addEventListener("click", buyMiner);
unlockButton.addEventListener("click", unlockEverything);
