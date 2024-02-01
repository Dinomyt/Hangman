let randomWord = "";

let letterArray = [];

let guessCount = 0;

let maxGuesses = 6;

let endWords = document.getElementById("endWords");

let gameBox = document.getElementById("gameBox");

let attempts = document.getElementById("attempts");

let displayWord = document.getElementById("displayWord");

let startBtn = document.getElementById("startBtn");

let endBtn = document.getElementById("endBtn");

let customButtons = document.querySelectorAll('.custom-button');

disableBtns();

function disableBtns() {
    customButtons.forEach(button => {
        button.disabled = true;
    });
}

function enableBtns() {
    customButtons.forEach(button => {
        button.disabled = false;
        button.style.backgroundImage = "";
    });
}

customButtons.forEach(button => {
  button.addEventListener('click', function () {
    button.disabled = true;
    let guess = button.innerHTML.toLowerCase();
    if(randomWord.includes(guess))
        {
            for(let i = 0; i < randomWord.length; i++)
            {
                if (randomWord[i].toLowerCase() === guess)
                {
                    letterArray[i] = guess;
                }
            }
        }
        else
        {
            button.style.backgroundImage = "url('../imgs/x-button.png')";
            guessCount++;
        }
        updateGameState();
        gameEnd();
  });
});


startBtn.addEventListener("click", function(){
    resetGame();
    dataCall();
    startBtn.disabled = true;
})

endBtn.addEventListener("click", function(){
    startBtn.disabled = false;
    gameLost();
})


function dataCall(){
    fetch("../data/data.json").then(response => response.json()).then (data=> {
        let rndNum = Math.floor(Math.random() * data.words.length)
        randomWord = data.words[rndNum];
        console.log(randomWord);
        startGame(randomWord);
        
    })
}

function startGame(word){
    letterArray = [];
    guessCount = 0;
    for(let i = 0; i < word.length; i++){
        letterArray[i] = "_";
        updateGameState();
    }
    attempts.innerHTML = maxGuesses - guessCount;
    endWords.textContent = "";
    enableBtns();
    endBtn.disabled = false;
}

function updateGameState(){
    displayWord.textContent = letterArray.join(" ");
    attempts.innerHTML = maxGuesses - guessCount;
}

function resetGame(){
    randomWord = "";
    letterArray = [];
    guessCount = 0;
    displayWord.textContent = "";
    startBtn.disabled = false;
    endWords.textContent = "";
    attempts.innerHTML = "";
    startBtn.textContent = "Start Game";
    disableBtns();
}

function gameEnd(){
    if (guessCount == maxGuesses)
    {
        gameLost();
    }
    else if(randomWord === letterArray.join("") && randomWord != "")
    {
        gameWon();
    }
}

function gameLost(){
    endWords.textContent = "You Lost! Your word was " + randomWord;
    disableBtns();
    startBtn.textContent = "Restart";
    startBtn.disabled = false;
    endBtn.disabled = true;
}

function gameWon(){
    endWords.textContent = "You Won! Your word was " + randomWord;
    disableBtns();
    startBtn.textContent = "Restart";
    startBtn.disabled = false;
    endBtn.disabled = true;
}