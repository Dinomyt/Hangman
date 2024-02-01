let randomWord = "";

let letterArray = [];

let guessCount = 0;

let maxGuesses = 6;

let attempts = document.getElementById("attempts");

let displayWord = document.getElementById("displayWord");

let startBtn = document.getElementById("startBtn");

let restartBtn = document.getElementById("restartBtn");

let customButtons = document.querySelectorAll('.custom-button');

customButtons.forEach(button => {
    button.disabled = true;
});

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
            guessCount++;
        }
        updateGameState();
        gameEnd();
  });
});


startBtn.addEventListener("click", function(){
    dataCall();
})

restartBtn.addEventListener("click", function(){
    resetGame();
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
    for(let i = 0; i < word.length; i++){
        letterArray[i] = "_";
        updateGameState();
    }
    attempts.innerHTML = maxGuesses - guessCount;
    customButtons.forEach(button => {
        button.disabled = false;
    });
}

function updateGameState(){
    displayWord.textContent = letterArray.join(" ");
    attempts.innerHTML = maxGuesses - guessCount;
}

function resetGame(){
    randomWord = "";
    letterArray = [];
    guessCount = 0;
    displayWord.textContent = "Display Word";
    customButtons.forEach(button => {
        button.disabled = false;
    });

    attempts.innerHTML = "";


}

function gameEnd(){
    //you lost the game
    if (guessCount == maxGuesses)
    {
        alert(`You Lost! Your word was ${randomWord}`);
        resetGame();
    }
    else if(randomWord === letterArray.join("") && randomWord != "")
    {
        alert(`You Won! Your word was ${randomWord}`);
        resetGame();
    }

}