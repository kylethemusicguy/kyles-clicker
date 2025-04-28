// Initial resource counts
let woodCount = 0;
let stoneCount = 0;
let goldCount = 0;

// DOM Elements
const woodCountElement = document.getElementById("woodCount");
const stoneCountElement = document.getElementById("stoneCount");
const goldCountElement = document.getElementById("goldCount");

const woodButton = document.getElementById("woodBtn");
const stoneButton = document.getElementById("stoneBtn");
const goldButton = document.getElementById("goldBtn");

// Functions to update counts
function updateWood() {
    woodCount++;
    woodCountElement.textContent = woodCount;
}

function updateStone() {
    stoneCount++;
    stoneCountElement.textContent = stoneCount;
}

function updateGold() {
    goldCount++;
    goldCountElement.textContent = goldCount;
}

// Event Listeners for the buttons
woodButton.addEventListener("click", updateWood);
stoneButton.addEventListener("click", updateStone);
goldButton.addEventListener("click", updateGold);
