/*-----------------без повторений скиллов---------------------*/
let cout = -1;
let unique;
/*--------------------------------------*/

let active;//активный спел
let combo;//комбо сфер

let spells = document.querySelectorAll('.spell li');
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

/*------------Отсчет--------------------------*/
let revCout = document.querySelector('.timer span')
function tickReverse() {
	let revCoutS = +revCout.innerHTML;
	revCout.innerHTML = revCoutS - 1
	if (revCout.innerHTML < 1) {
		clearInterval(intervalRev)
	}
}
let intervalRev;


/*--------------------------------------*/
document.querySelector('.start').addEventListener('click', (e) => {
	showSpell()
	intervalRev = setInterval(tickReverse, 1000)
	document.addEventListener('keydown', (e) => {
		if (e.code == "Enter") {
			e.preventDefault();
		}
		if (e.code == "KeyQ") {
			addSpher('quas');
		}
		if (e.code == "KeyW") {
			addSpher('wex');
		}
		if (e.code == "KeyE") {
			addSpher('exort');
		}
		if (e.code == "KeyR") {
			active = document.querySelector('.vis')
			combo = checkCast()
			function nextSpell() {
				if ((active.classList.contains('tornado')) && (combo == '120')) {
					showSpell()
				}
				if ((active.classList.contains('strike')) && (combo == '003')) {
					showSpell()
				}
				if ((active.classList.contains('invis')) && (combo == '210')) {
					showSpell()
				}
				if ((active.classList.contains('forge')) && (combo == '102')) {
					showSpell()
				}
				if ((active.classList.contains('blast')) && (combo == '111')) {
					showSpell()
				}
				if ((active.classList.contains('meteor')) && (combo == '012')) {
					showSpell()
				}
				if ((active.classList.contains('alacrity')) && (combo == '021')) {
					showSpell()
				}
				if ((active.classList.contains('wall')) && (combo == '201')) {
					showSpell()
				}
				if ((active.classList.contains('emp')) && (combo == '030')) {
					showSpell()
				}
				if ((active.classList.contains('snap')) && (combo == '300')) {
					showSpell()
				}
			}
			nextSpell();
		}
	})
})
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
	console.log('' + quas + wex + exort);
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