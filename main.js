const display = document.querySelector(".display");
const myName = document.querySelector(".my_name");

let sentence = "";
let gameStarted = false;
let gameInterval = null;
let letterInterval = null;
const letters = ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", " "];
let startTime = 0;
let correctKeystrokes = 0;
let incorrectKeystrokes = 0;
let totalKeystrokes = 0;
let movingSentence = null;

window.addEventListener("keydown", function(event) {
    if (!gameStarted && event.code === "Space") {
        myName.textContent = "";
        startGame();
    } else if (gameStarted) {
        handleKeyPress(event);
    }
});

function startGame() {
    gameStarted = true;
    sentence = "";
    startTime = Date.now();
    correctKeystrokes = 0;
    incorrectKeystrokes = 0;
    totalKeystrokes = 0;
    movingSentence = document.createElement("div");
    movingSentence.className = "moving_sentence";
    display.appendChild(movingSentence);
    letterInterval = setInterval(addLetter, 1000);
    gameInterval = setInterval(moveSentence, 20);
}

function addLetter() {
    const letter = letters[Math.floor(Math.random() * letters.length)];
    sentence += letter === " " ? " ␣ " : " " + letter;
    updateSentence();
}

function updateSentence() {
    movingSentence.textContent = sentence;
}

function moveSentence() {
    if (!movingSentence) return;
    const currentTranslate = parseInt(movingSentence.style.transform?.replace(/[^-\d.]/g, '') || "0");
    movingSentence.style.transform = `translateX(${currentTranslate - 2}px)`; // Move left by 2px each frame
    // If the sentence moves off the left edge, end the game
    if (-currentTranslate > movingSentence.offsetWidth + display.offsetWidth) {
        endGame();
    }
}

function handleKeyPress(event) {
    let key = event.key.toUpperCase();
    if (key === " ") key = " ";
    const firstLetter = sentence.trim().split(/\s+/)[0];
    totalKeystrokes++;
    if (firstLetter && (firstLetter === key || (firstLetter === "␣" && key === " "))) {
        correctKeystrokes++;
        sentence = sentence.replace(/^\s*␣\s*/, "").replace(/^\s*[A-Z;]\s*/, "");
        updateSentence();
    } else {
        incorrectKeystrokes++;
    }
}

function showStats() {
    const timeElapsed = (Date.now() - startTime) / 1000;
    const wpm = Math.round((correctKeystrokes / 5) / (timeElapsed / 60));
    const accuracy = Math.round((correctKeystrokes / totalKeystrokes) * 100) || 0;
    myName.textContent = `WPM: ${wpm} | Accuracy: ${accuracy}%`;
}

function endGame() {
    clearInterval(letterInterval);
    clearInterval(gameInterval);
    gameStarted = false;
    showStats();
    sentence = "";
    if (movingSentence) display.removeChild(movingSentence);
    movingSentence = null;
}
