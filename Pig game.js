'use strict';
/*  elements set up  */
const player0E = document.querySelector('.player--0');
const player1E = document.querySelector('.player--1');

const scoreEl0 = document.querySelector('#score--0');
const scoreEl1 = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

scoreEl0.textContent = 0;
scoreEl1.textContent = 0;


let scores, currentScore, activePlayer, playing;
const init = function(){

    scoreEl0.textContent = 0;
    scoreEl1.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    player0E.classList.remove('player--winner');
    player1E.classList.remove('player--winner');
    player0E.classList.add ('player--active');
    player1E.classList.remove('player--active');
    
    scores =[0,0]
    diceEl.classList.add('hidden');
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    
};
init();

// switch player function
const switchPlayer = function()
{
   
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1: 0;
    currentScore = 0;
    player0E.classList.toggle('player--active');
    player1E.classList.toggle('player--active');
};
    
    
// rolling dice function.
btnRoll.addEventListener('click', function(){
    if(playing){// this code to see if the game is still on
    let dice = Math.trunc(Math.random() * 6) + 1;
    // display the random dice. 
    diceEl.classList.remove('hidden');
    diceEl.src = `Images/dice-${dice}.png`;
    // Possible a change of a player
    if(dice !==1){
        // add the dice to current score
        document.getElementById(`current--${activePlayer}`).textContent = currentScore
        currentScore += dice 
    }else{
    //  Switch to the other player
switchPlayer();
    }
}
});  
// HOLD btn
btnHold.addEventListener('click', function(){
    if(playing){
scores[activePlayer]+= currentScore;
document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

// check for winner
if(scores[activePlayer] >= 20 ){
    playing = false;
    diceEl.classList.add('hidden')
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
}else{
switchPlayer();
       }
    }
});
btnNew.addEventListener('click', init);
