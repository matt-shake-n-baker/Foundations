/* eslint-disable indent */
/* eslint-disable no-console */

const submitButton = document.getElementById("submit-number-button");
const resetButton = document.getElementById("reset-button");
const hintButton = document.getElementById("hint-button");
let correctNumber = Math.floor(Math.random() * 100) + 1;
let numberOfGuesses = 0;
let wins = 0;
let losses = 0;
let ratio = 0;

const clearList = () => {
    numberOfGuesses = 0;
    const guesses = document.getElementById("guess-list").getElementsByTagName("li").length;
    for (let i=1;i<=guesses;i++){
        document.getElementById(`guess-${i}`).innerHTML="";
    }
    correctNumber = Math.floor(Math.random() * 100) + 1;
};

const updateWinLoss = () => {
    ratio = wins/(wins+losses);
    document.getElementById("win-loss").innerHTML = `Wins: ${wins} - Losses: ${losses}`;
    document.getElementById("win-loss-ratio").innerHTML = `W/R ratio: ${ratio}`;
};

const getInputAndUpdate = (inputElement) => {
    numberOfGuesses += 1;
	const guess = parseInt(inputElement.value);

    if (numberOfGuesses < 5){
        if (guess === correctNumber){
            wins += 1;
            alert("YOU GUESSED IT");
            updateWinLoss();
            clearList();
        } else if (guess < correctNumber){
            document.getElementById(`guess-${numberOfGuesses}`).innerHTML = guess + `-> Too low, go higher!`;
        } else {
            document.getElementById(`guess-${numberOfGuesses}`).innerHTML = guess + `-> Too high, go lower!`;
        }
    } else {
        document.getElementById(`guess-${numberOfGuesses}`).innerHTML = guess + `-> You lose... the correct answer was ${correctNumber}`;
        losses += 1;
        updateWinLoss();
    }
    inputElement.value = "";
};

submitButton.addEventListener("click", function() {
    if (numberOfGuesses === 5){
        clearList();
    }
    const guess = document.querySelector("input").value;
    guess < 1 || guess > 100 ? alert("invalid guess! guess between 1-100") : getInputAndUpdate(document.querySelector("input"));
});
resetButton.addEventListener("click", function() {
    clearList();
});
hintButton.addEventListener("click", function() {
    let hint1 = Math.floor(Math.random() * 100) + 1;
    let hint2 = Math.floor(Math.random() * 100) + 1;
    if (hint1===correctNumber || hint2===correctNumber){
        hint1 = Math.floor(Math.random() * 100) + 1;
        hint2 = Math.floor(Math.random() * 100) + 1;
    }
    alert(`The correct number is one of the following: ${hint1}, ${hint2}, ${correctNumber}`)
});