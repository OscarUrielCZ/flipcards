window.onload = function() {
	// cargar datos y elementos
	const localstoragename = 'flipcards123';
	const container = document.querySelector('.container');

	// cargar datos del localstorage
	let data = localStorage.getItem(localstoragename);
	
	if(data == null) {
		data = [];
		const sincartas = document.createElement('div');
		const mensaje = document.createElement('p');
		const ainicio = document.createElement('a');
		const btninicio = document.createElement('button');
		
		sincartas.className = 'empty';
		mensaje.textContent = 'No hay cartas por mostrar';
		ainicio.href = 'index.html';
		btninicio.textContent = 'Ir a inicio';
		
		ainicio.appendChild(btninicio);
		sincartas.appendChild(mensaje);
		sincartas.appendChild(ainicio);
		container.appendChild(sincartas);
	} else {
		data = JSON.parse(data);

		for(let i=0; i<data.length; i++) {
			const divtarjeta = document.createElement('div');
			const divcontenidotarjeta = document.createElement('div');
			const divfront = document.createElement('div');
			const divback = document.createElement('div');

			divtarjeta.className = 'tarjeta';
			divcontenidotarjeta.className = 'contenido-tarjeta';
			divfront.className = 'front';
			divback.className = 'back';

			divfront.textContent = i+1;
			divback.textContent = data[i];

			divcontenidotarjeta.appendChild(divfront);
			divcontenidotarjeta.appendChild(divback);
			divtarjeta.appendChild(divcontenidotarjeta);
			divtarjeta.addEventListener('click', function() {
				divtarjeta.classList.toggle('flip');
			});
			container.appendChild(divtarjeta);
		}
	}
	console.log(data);
};