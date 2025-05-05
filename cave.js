// cave.js

let ironCount = 0;
let diamondCount = 0;
let pickaxeCount = 0;
let chiselCount = 0;
let minersCount = 0;
let isUnlocked = false;

const ironCountElement = document.getElementById("ironCount");
const diamondCountElement = document.getElementById("diamondCount");
const pickaxeCountElement = document.getElementById("pickaxeCount");
const chiselCountElement = document.getElementById("chiselCount");
const minersCountElement = document.getElementById("minersCount");
const worldElement = document.getElementById("worldElement");

const ironButton = document.getElementById("ironBtn");
const diamondButton = document.getElementById("diamondBtn");
const pickaxeButton = document.getElementById("pickaxeBtn");
const chiselButton = document.getElementById("chiselBtn");
const minersButton = document.getElementById("minersBtn");

const secretCodeInput = document.getElementById("secretCode");
const unlockButton = document.getElementById("unlockBtn");

const darkmodeToggle = document.getElementById("darkmodeToggle");
const craftMessage = document.getElementById("craftMessage");

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

function mineIron() {
    if (pickaxeCount > 0 || isUnlocked) {
        ironCount++;
        animateCount(ironCountElement, ironCount);
        checkChiselAvailability();
    } else {
        alert("you need a pickaxe to mine iron! 🪓");
    }
}

function mineDiamond() {
    if (chiselCount > 0 || isUnlocked) {
        diamondCount++;
        animateCount(diamondCountElement, diamondCount);
        spawnSparkle();
    } else {
        alert("you need a chisel to mine diamond! 💎");
    }
}

function checkPickaxeAvailability() {
    pickaxeButton.disabled = ironCount < 5;
}

function checkChiselAvailability() {
    chiselButton.disabled = ironCount < 100;
}

function craftPickaxe() {
    if (ironCount >= 5) {
        pickaxeCount++;
        ironCount -= 5;
        animateCount(ironCountElement, ironCount);
        animateCount(pickaxeCountElement, pickaxeCount);
        unlockIronButton();
        showCraftAnimation("pickaxe");
        checkPickaxeAvailability();
    }
}

function craftChisel() {
    if (ironCount >= 100) {
        chiselCount++;
        ironCount -= 100;
        animateCount(ironCountElement, ironCount);
        animateCount(chiselCountElement, chiselCount);
        unlockDiamondButton();
        showCraftAnimation("chisel");
        checkChiselAvailability();
    }
}

function buyMiner() {
    if (ironCount >= 50) {
        minersCount++;
        ironCount -= 50;
        animateCount(ironCountElement, ironCount);
        animateCount(minersCountElement, minersCount);
    }
}

function unlockIronButton() {
    ironButton.classList.remove("locked");
}

function unlockDiamondButton() {
    diamondButton.classList.remove("locked");
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
        pickaxeButton.disabled = false;
        chiselButton.disabled = false;
        ironButton.disabled = false;
        diamondButton.disabled = false;
        ironButton.classList.remove("locked");
        diamondButton.classList.remove("locked");
        alert("you unlocked everything!");
    } else {
        alert("incorrect secret code.");
    }
}

function spawnSparkle() {
    const sparkle = document.createElement("div");
    sparkle.textContent = "✨";
    sparkle.classList.add("sparkle");
    document.body.appendChild(sparkle);

    sparkle.style.left = (diamondButton.getBoundingClientRect().left + Math.random() * 50) + "px";
    sparkle.style.top = (diamondButton.getBoundingClientRect().top - 20) + "px";

    setTimeout(() => sparkle.remove(), 1000);
}

// miner automation (basic idle gen)
setInterval(() => {
    if (minersCount >= 1) {
        ironCount += minersCount;
        animateCount(ironCountElement, ironCount);
        checkPickaxeAvailability();
        checkChiselAvailability();
    }
}, 1000);

// events
ironButton.addEventListener("click", mineIron);
diamondButton.addEventListener("click", mineDiamond);
pickaxeButton.addEventListener("click", craftPickaxe);
chiselButton.addEventListener("click", craftChisel);
minersButton.addEventListener("click", buyMiner);
unlockButton.addEventListener("click", unlockEverything);

// dark mode
darkmodeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkmodeToggle.classList.toggle("slide");

    darkmodeToggle.textContent = document.body.classList.contains("dark-mode") ? "🌙" : "☀️";
});

