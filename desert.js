// initial desert resource counts
let cactusCount = 0;
let sandstoneCount = 0;
let sunstoneCount = 0;
let pickaxeCount = 0;
let chiselCount = 0;
let isUnlocked = false;

// dom elements
const cactusCountElement = document.getElementById("cactusCount");
const sandstoneCountElement = document.getElementById("sandstoneCount");
const sunstoneCountElement = document.getElementById("sunstoneCount");
const pickaxeCountElement = document.getElementById("pickaxeCount");
const chiselCountElement = document.getElementById("chiselCount");

const cactusButton = document.getElementById("cactusBtn");
const sandstoneButton = document.getElementById("sandstoneBtn");
const sunstoneButton = document.getElementById("sunstoneBtn");
const pickaxeButton = document.getElementById("pickaxeBtn");
const chiselButton = document.getElementById("chiselBtn");

const secretCodeInput = document.getElementById("secretCode");
const unlockButton = document.getElementById("unlockBtn");
const craftMessage = document.getElementById("craftMessage");
const darkmodeToggle = document.getElementById("darkmodeToggle");

// animation + update funcs
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

function updateCactus() {
    cactusCount++;
    animateCount(cactusCountElement, cactusCount);
    checkPickaxeAvailability();
}

function updateSandstone() {
    if (pickaxeCount > 0 || isUnlocked) {
        sandstoneCount++;
        animateCount(sandstoneCountElement, sandstoneCount);
        checkChiselAvailability();
    } else {
        alert("you need a pickaxe to gather sandstone! 🪓");
    }
}

function updateSunstone() {
    if (chiselCount > 0 || isUnlocked) {
        sunstoneCount++;
        animateCount(sunstoneCountElement, sunstoneCount);
        showSparkle();
    } else {
        alert("you need a chisel to mine sunstone! 🔨");
    }
}

function craftPickaxe() {
    if (cactusCount >= 5) {
        pickaxeCount++;
        cactusCount -= 5;
        animateCount(cactusCountElement, cactusCount);
        animateCount(pickaxeCountElement, pickaxeCount);
        checkPickaxeAvailability();
        unlockSandstoneButton();
        showCraftAnimation("pickaxe");
    }
}

function craftChisel() {
    if (sandstoneCount >= 100) {
        chiselCount++;
        sandstoneCount -= 100;
        animateCount(sandstoneCountElement, sandstoneCount);
        animateCount(chiselCountElement, chiselCount);
        checkChiselAvailability();
        unlockSunstoneButton();
        showCraftAnimation("chisel");
    }
}

function checkPickaxeAvailability() {
    pickaxeButton.disabled = cactusCount < 5;
}

function checkChiselAvailability() {
    chiselButton.disabled = sandstoneCount < 100;
}

function unlockSandstoneButton() {
    sandstoneButton.classList.remove("locked");
}

function unlockSunstoneButton() {
    sunstoneButton.classList.remove("locked");
}

function showCraftAnimation(toolName) {
    craftMessage.textContent = `you crafted a ${toolName}! 🎉`;
    craftMessage.style.display = "block";
    setTimeout(() => {
        craftMessage.style.display = "none";
    }, 2000);
}

function unlockEverything() {
    if (secretCodeInput.value.toLowerCase() === "sandstorm") {
        isUnlocked = true;
        pickaxeButton.disabled = false;
        chiselButton.disabled = false;
        cactusButton.disabled = false;
        sandstoneButton.disabled = false;
        sunstoneButton.disabled = false;
        sandstoneButton.classList.remove("locked");
        sunstoneButton.classList.remove("locked");
        alert("desert resources unlocked!");
    } else {
        alert("wrong desert code.");
    }
}

function showSparkle() {
    const sparkle = document.createElement("div");
    sparkle.textContent = "✨";
    sparkle.classList.add("sparkle");
    document.body.appendChild(sparkle);
    sparkle.style.left = (sunstoneButton.getBoundingClientRect().left + Math.random() * 50) + "px";
    sparkle.style.top = (sunstoneButton.getBoundingClientRect().top - 20) + "px";
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// event listeners
cactusButton.addEventListener("click", updateCactus);
sandstoneButton.addEventListener("click", updateSandstone);
sunstoneButton.addEventListener("click", updateSunstone);
pickaxeButton.addEventListener("click", craftPickaxe);
chiselButton.addEventListener("click", craftChisel);
unlockButton.addEventListener("click", unlockEverything);

// dark mode
darkmodeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkmodeToggle.classList.toggle("slide");
    darkmodeToggle.textContent = document.body.classList.contains("dark-mode") ? "🌙" : "☀️";
});

