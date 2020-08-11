window.onload = function() {
	const flipcards = document.getElementsByClassName('tarjeta');    

	for(let i=0; i<flipcards.length; i++) {
		flipcards[i].addEventListener('click', function() {
			flipcards[i].classList.toggle('flip');
		});
	}
};