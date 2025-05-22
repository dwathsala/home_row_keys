// Get the gray bar (the display bar)
const display = document.querySelector(".display");
const myName = document.querySelector(".my_name");

// Variables
let sentence = "";
let gameStarted = false;
let gameInterval = null;
let letterInterval = null;
const letters = ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", " "];

// Start game on space bar press
window.addEventListener("keydown", function(event) {
    if (!gameStarted && event.code === "Space") {
        myName.textContent = ""; // Clear the content inside the bar
        startGame();
    } else if (gameStarted) {
        handleKeyPress(event);
    }
});

// Start game function
function startGame() {
    gameStarted = true;
    sentence = "";
    letterInterval = setInterval(addLetter, 1000); // Add a letter every second
    gameInterval = setInterval(moveSentence, 20); // Move the sentence every 20ms (fast)
}

// Add a letter to the sentence
function addLetter() {
    const letter = letters[Math.floor(Math.random() * letters.length)];
    sentence += letter === " " ? " ␣ " : " " + letter; // Add a space around the letter/symbol
    updateSentence();
}

// Update the moving sentence inside the gray bar
function updateSentence() {
    // Remove any existing moving sentence
    const oldMoving = display.querySelector(".moving_sentence");
    if (oldMoving) display.removeChild(oldMoving);

    // Create and add new moving sentence
    const movingSentence = document.createElement("div");
    movingSentence.className = "moving_sentence";
    movingSentence.textContent = sentence;
    display.appendChild(movingSentence);
}

// Move the sentence to the left
function moveSentence() {
    const movingSentence = display.querySelector(".moving_sentence");
    if (movingSentence) {
        const currentRight = parseInt(movingSentence.style.right || "0");
        movingSentence.style.right = (currentRight + 4) + "px"; // Move 4px left per interval (fast)
        if (currentRight > display.offsetWidth + movingSentence.offsetWidth) {
            endGame();
        }
    }
}

// Handle key press
function handleKeyPress(event) {
    let key = event.key.toUpperCase();
    if (key === " ") key = " ";
    const firstLetter = sentence.trim().split(/\s+/)[0];
    if (firstLetter && (firstLetter === key || (firstLetter === "␣" && key === " "))) {
        sentence = sentence.replace(/^\s*␣\s*/, "").replace(/^\s*[A-Z;]\s*/, "");
        updateSentence();
    }
}

// End game function
function endGame() {
    clearInterval(letterInterval);
    clearInterval(gameInterval);
    gameStarted = false;
    myName.textContent = "Game Over! Press Space Bar to Restart.";
    sentence = "";
    const movingSentence = display.querySelector(".moving_sentence");
    if (movingSentence) display.removeChild(movingSentence);
}
