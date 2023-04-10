'use strict';

const check = document.querySelector('.check');
const guess = document.querySelector('.guess');
const number = document.querySelector('.number');
const message = document.querySelector('.message');
const score = document.querySelector('.score');

//Calculate score 
function minusScore(score) {
	return --score;
}

//check losing game
function loseGame(score){
	if (score <= 0) {
		message.textContent = "😴 You lose the Game";
		score = 0;
		return true;
	}
	return false;
}

//save High Score
function saveHighscore(score) {
	if(score > highscore) {
		highscore = score;
		document.querySelector('.highscore').
			textContent = highscore;
	}
}

/*Check no input, blank value function*/ 
function isValue() {
	if(!guess.value) {
		message.textContent = '💢 No Number';
		return false;
	}
	return true;
}

/*show value*/
function endGame(correctValue) {
	if(loseGame(actualScore)){
		return;
	}

	if(correctValue) {
		number.textContent = rand;
	}else {
		//actualScore = minusScore(actualScore);
		//score.textContent = minusScore(actualScore);
		actualScore = minusScore(actualScore);
		score.textContent = actualScore;
		console.log(loseGame(actualScore));
	}
}

/*Game Logic*/
function gameLogic(value, guess) {
	if(!isValue()) {
		return false;
	}
	if(value === guess) {
		message.textContent = '✅ Correct Number';
		saveHighscore(actualScore);
		winGame();
		return true;
	}else if(value > guess) {
		message.textContent = "💔 Too Low";
	}else if(value < guess) {
		message.textContent = "💘 Too High";
	}
	return false;
}

/*Generate number function*/
function generateNumber(num)  {
	const rand = Math.random() * num;
	return Math.trunc(rand) + 1;
	//Math.round() || floor() || 
}

/*Manupulate css file*/
function winGame() {
	document.querySelector('body').style.backgroundColor = '#210062';
	document.querySelector('.number').style.width = '30rem';
}

//main application
let rand = generateNumber(20);
let highscore = 0;
let actualScore = 20;

check.addEventListener('click',function() {
	const guessValue = Number(guess.value);
	console.log("checked");
	endGame(gameLogic(rand, guessValue));
});

//replay the game
document.querySelector('.again').addEventListener('click', function() {
	//reset value
	actualScore = 20;
	rand = generateNumber(20);

	score.textContent  = actualScore;
	message.textContent = 'Start guessing...';
	number.textContent = '?';
	guess.value = '';

	document.querySelector('body').style.backgroundColor = '#222';
	document.querySelector('.number').style.width = '15rem';
});
