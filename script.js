// initial resource counts
let woodCount = getCookie("woodCount") || 0;
let stoneCount = getCookie("stoneCount") || 0;
let goldCount = getCookie("goldCount") || 0;
let pickaxeCount = getCookie("pickaxeCount") || 0;
let chiselCount = getCookie("chiselCount") || 0;
let minerCount = getCookie("minerCount") || 0;
let isUnlocked = getCookie("isUnlocked") === "true"; // store as true/false string

// dom elements
const woodCountElement = document.getElementById("woodCount");
const stoneCountElement = document.getElementById("stoneCount");
const goldCountElement = document.getElementById("goldCount");
const pickaxeCountElement = document.getElementById("pickaxeCount");
const chiselCountElement = document.getElementById("chiselCount");
const minerCountElement = document.getElementById("minerCount");

const woodButton = document.getElementById("woodBtn");
const stoneButton = document.getElementById("stoneBtn");
const goldButton = document.getElementById("goldBtn");
const pickaxeButton = document.getElementById("pickaxeBtn");
const chiselButton = document.getElementById("chiselBtn");
const minerButton = document.getElementById("minerBtn");

const secretCodeInput = document.getElementById("secretCode");
const unlockButton = document.getElementById("unlockBtn");

const darkmodeToggle = document.getElementById("darkmodeToggle");
const craftMessage = document.getElementById("craftMessage");

// functions
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const decodedCookies = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookies.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length + 1, cookie.length);
        }
    }
    return "";
}

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

function updateWood() {
    woodCount++;
    animateCount(woodCountElement, woodCount);
    setCookie("woodCount", woodCount, 7);
    checkPickaxeAvailability();
}

function updateStone() {
    if (pickaxeCount > 0 || isUnlocked) {
        stoneCount++;
        animateCount(stoneCountElement, stoneCount);
        setCookie("stoneCount", stoneCount, 7);
        checkChiselAvailability();
    } else {
        alert("you need a pickaxe to mine stone! 🪓");
    }
}

function updateGold() {
    if (chiselCount > 0 || isUnlocked) {
        goldCount++;
        animateCount(goldCountElement, goldCount);
        setCookie("goldCount", goldCount, 7);
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

function checkMinerAvailability() {
    // Need 10 wood, 10 stone, and 10 gold to craft a miner
    minerButton.disabled = woodCount < 10 || stoneCount < 10 || goldCount < 10;
}

function craftPickaxe() {
    if (woodCount >= 5) {
        pickaxeCount++;
        woodCount -= 5;
        animateCount(woodCountElement, woodCount);
        animateCount(pickaxeCountElement, pickaxeCount);
        setCookie("woodCount", woodCount, 7);
        setCookie("pickaxeCount", pickaxeCount, 7);
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
        setCookie("stoneCount", stoneCount, 7);
        setCookie("chiselCount", chiselCount, 7);
        checkChiselAvailability();
        unlockGoldButton();
        showCraftAnimation("chisel");
    }
}

function craftMiner() {
    if (woodCount >= 10 && stoneCount >= 10 && goldCount >= 10) {
        minerCount++;
        woodCount -= 10;
        stoneCount -= 10;
        goldCount -= 10;
        animateCount(woodCountElement, woodCount);
        animateCount(stoneCountElement, stoneCount);
        animateCount(goldCountElement, goldCount);
        animateCount(minerCountElement, minerCount);
        setCookie("woodCount", woodCount, 7);
        setCookie("stoneCount", stoneCount, 7);
        setCookie("goldCount", goldCount, 7);
        setCookie("minerCount", minerCount, 7);
        checkMinerAvailability();
        showCraftAnimation("miner");
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
        setCookie("isUnlocked", "true", 7);
        pickaxeButton.disabled = false;
        chiselButton.disabled = false;
        woodButton.disabled = false;
        stoneButton.disabled = false;
        goldButton.disabled = false;
        stoneButton.classList.remove("locked");
        goldButton.classList.remove("locked");
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

    sparkle.style.left = (goldButton.getBoundingClientRect().left + Math.random() * 50) + "px";
    sparkle.style.top = (goldButton.getBoundingClientRect().top - 20) + "px";

    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// miners: every second, we will update the resources based on the miner count
function autoMine() {
    setInterval(() => {
        if (minerCount >= 10) {
            woodCount += 1;
            stoneCount += 1;
            goldCount += 1;

            animateCount(woodCountElement, woodCount);
            animateCount(stoneCountElement, stoneCount);
            animateCount(goldCountElement, goldCount);

            setCookie("woodCount", woodCount, 7);
            setCookie("stoneCount", stoneCount, 7);
            setCookie("goldCount", goldCount, 7);
        }
    }, 1000); // every second
}

// event listeners
woodButton.addEventListener("click", updateWood);
stoneButton.addEventListener("click", updateStone);
goldButton.addEventListener("click", updateGold);
pickaxeButton.addEventListener("click", craftPickaxe);
chiselButton.addEventListener("click", craftChisel);
unlockButton.addEventListener("click", unlockEverything);
minerButton.addEventListener("click", craftMiner);

// dark mode toggle
darkmodeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkmodeToggle.classList.toggle("slide");

    if (document.body.classList.contains("dark-mode")) {
        darkmodeToggle.textContent = "🌙";
    } else {
        darkmodeToggle.textContent = "☀️";
    }
});

// start auto-mining when page loads
autoMine();
