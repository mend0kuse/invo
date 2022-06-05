let tar;

document.addEventListener('DOMContentLoaded', (e) => {
	document.addEventListener('keydown', (e) => {
		tar = e.code;
	})
})
/*----------------Подсказка----------------------*/
let prompt = document.querySelector('.prompt__img');
let promptButton = document.querySelector('.prompt');
promptButton.addEventListener('click', (e) => {
	prompt.classList.toggle('show');
	if (prompt.classList.contains('show')) {
		promptButton.textContent = 'Скрыть подсказку';
	} else {
		promptButton.textContent = 'Показать подсказку';
	}
})
/*-----------------без повторений скиллов---------------------*/
let cout = -1;
let unique;
/*--------------------------------------*/

let active;//активный спел
let combo;//комбо сфер
let streakScore = 0;

let popup = document.querySelector('.popup')
let startBtn = document.querySelector('.start');
let spells = document.querySelectorAll('.spell li');
let score = document.querySelectorAll('.score');
let streakName = document.querySelector('.streak');
let exit = document.querySelector('.exit')
let restart = document.querySelector('.restart')
/*------------Отсчет--------------------------*/
let revCout = document.querySelector('.timer span')
function tickReverse() {
	let revCoutS = +revCout.innerHTML;
	revCout.innerHTML = revCoutS - 1
	if (revCout.innerHTML < 1) {
		clearInterval(intervalRev)
		endGame();
		popup.classList.add('popup__show')
	}
}
let intervalRev;
/*--------------------------------------*/
startBtn.onclick = startGame;
exit.addEventListener('click', (e) => {
	popup.classList.remove('popup__show')
})
restart.addEventListener('click', (e) => {
	popup.classList.remove('popup__show')
	startGame()
})
/*--------------------------------------*/
function showSpell() {
	unique = true;
	spells.forEach(el => {
		el.classList.remove('vis')
	})
	function randomInteger() {
		return Math.floor(0 + Math.random() * 10);
	}
	let num = randomInteger();
	while (unique) {
		if (cout == num) {
			num = randomInteger()
		}
		else {
			unique = false;
		}
	}
	cout = num;
	spells[cout].classList.add('vis')
}
function checkCast() {
	let quas = 0;
	let wex = 0;
	let exort = 0;
	let sphers = document.querySelectorAll('.spell__panel li');
	sphers.forEach(el => {
		if (el.classList.contains('quas')) {
			quas++;
		}
		if (el.classList.contains('wex')) {
			wex++;
		}
		if (el.classList.contains('exort')) {
			exort++;
		}
	})
	return '' + quas + wex + exort
}
function addSpher(name) {
	let spheras = document.querySelectorAll('.spell__panel li');
	if (spheras.length > 2) {
		spheras[0].remove();
	}
	let liFirst = document.createElement('li');
	liFirst.classList.add(`${name}`);
	document.querySelector('.spell__panel').append(liFirst);

}
function plusScore(c) {
	score.forEach(el => {
		el.textContent = +el.textContent + c;
	})
}
function checkCombo() {
	if (streakScore >= 15) {
		streakName.textContent = 'X10'
		plusScore(1000)
	} else if (streakScore >= 10) {
		streakName.textContent = 'X5'
		plusScore(500)
	} else if (streakScore >= 5) {
		streakName.textContent = 'X2'
		plusScore(200)
	} else {
		plusScore(100)
	}
}
function play() {
	if (tar == "Enter") {
		e.preventDefault();
	}
	if (tar == "KeyQ") {
		addSpher('quas');
	}
	if (tar == "KeyW") {
		addSpher('wex');
	}
	if (tar == "KeyE") {
		addSpher('exort');
	}
	if (tar == "KeyR") {
		active = document.querySelector('.vis')
		combo = checkCast()
		function checkSpell() {
			if ((active.classList.contains('tornado')) && (combo == '120')) {
				return true;
			}
			if ((active.classList.contains('strike')) && (combo == '003')) {
				return true;
			}
			if ((active.classList.contains('invis')) && (combo == '210')) {
				return true;
			}
			if ((active.classList.contains('forge')) && (combo == '102')) {
				return true;
			}
			if ((active.classList.contains('blast')) && (combo == '111')) {
				return true;
			}
			if ((active.classList.contains('meteor')) && (combo == '012')) {
				return true;
			}
			if ((active.classList.contains('alacrity')) && (combo == '021')) {
				return true;
			}
			if ((active.classList.contains('wall')) && (combo == '201')) {
				return true;
			}
			if ((active.classList.contains('emp')) && (combo == '030')) {
				return true;
			}
			if ((active.classList.contains('snap')) && (combo == '300')) {
				return true;
			}
			return false
		}
		if (checkSpell() == true) {
			showSpell();
			checkCombo();
			streakScore++;
		} else {
			streakScore = 0;
			streakName.textContent = '';
		}
	}
}
function startGame() {
	endGame();
	startBtn.textContent = 'Заново';
	score.forEach(el => {
		el.textContent = 0;
	})
	showSpell();
	intervalRev = setInterval(tickReverse, 1000);
	document.addEventListener('keydown', play)
}
function endGame() {
	spells.forEach(el => {
		el.classList.remove('vis')
	})
	clearInterval(intervalRev)
	revCout.textContent = 30;
	document.removeEventListener('keydown', play)
	let sphersss = document.querySelectorAll('.spell__panel li');
	sphersss.forEach(el => {
		el.remove();
	})
	streakScore = 0;
	streakName.textContent = '';
}