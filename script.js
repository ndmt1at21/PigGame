'use strict';

// DECLE
// Variable
let scores;
let currentScore;
let playerActive;
let isPlaying;

// Player element
const player0Ele = document.querySelector('.player--0');
const player1Ele = document.querySelector('.player--1');

// Image Dice
const diceImgEle = document.querySelector('.dice');

// Player 1 element
const score0Ele = document.getElementById('score--0');
const name0Ele = document.getElementById('name--0');
const current0Ele = document.getElementById('current--0');

//Player 2 element
const score1Ele = document.getElementById('score--1');
const name1Ele = document.getElementById('name--1');
const current1Ele = document.getElementById('current--1');

// btn element
const btnNew = document.querySelector('.btn.btn--new');
const btnRoll = document.querySelector('.btn.btn--roll');
const btnHold = document.querySelector('.btn.btn--hold');

// FUNCTIONS
const initGame = function() {
    scores = [0, 0];
    currentScore = 0;
    playerActive = 0;

    score0Ele.textContent = 0;
    current0Ele.textContent = 0;
    score1Ele.textContent = 0;
    current1Ele.textContent = 0;
    isPlaying = true;

    diceImgEle.classList.add('hidden');
    player0Ele.classList.remove('player--winner');
    player1Ele.classList.remove('player--winner');
    player0Ele.classList.add('player--active');
    player1Ele.classList.remove('player--active');
}

const randDice = function() {
    let randNum = Math.trunc(Math.random() * 5) + 1;
    return randNum;
}

const switchPlayer = function() {
    currentScore = 0;
    document.getElementById(`current--${playerActive}`).textContent = 0;
    player0Ele.classList.toggle('player--active');
    player1Ele.classList.toggle('player--active');

    playerActive = playerActive === 0 ? 1 : 0;
}

const checkScore = function() {
    if (scores[playerActive] >= 100) {
        document.querySelector(`.player--${playerActive}`).classList.add('player--winner');
        isPlaying = false;
    }
}


initGame();

btnRoll.addEventListener('click', function() {
    if (isPlaying) {
        let diceNumber = randDice();
        let nameImgSrc = `dice-${diceNumber}.png`;
        
        diceImgEle.classList.remove('hidden');
        diceImgEle.src = nameImgSrc;
    
        if (diceNumber === 1) {
            currentScore = 0;
            switchPlayer();
        } else {
            currentScore += diceNumber;
            document.getElementById(`current--${playerActive}`).textContent = currentScore;    
        }
    }
})

btnHold.addEventListener('click', function() {
    if (isPlaying) {
        scores[playerActive] += currentScore;
        document.getElementById(`score--${playerActive}`).textContent = scores[playerActive];
    
        checkScore();
        switchPlayer();
    }
})

btnNew.addEventListener('click', initGame);
