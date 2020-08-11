window.onload = function() {
	// cargar datos y elementos
	const localstoragename = 'flipcards123';
	const btnagregar = document.getElementById('btnagregar');
	const frases = document.getElementById('frases');

	// cargar datos del localstorage
	let data = localStorage.getItem(localstoragename);
	if(data != null) {
		data = JSON.parse(data);
		// imprimir datos en el DOM
		data.map((frase) => {
			const contenedor = document.createElement('div');
			contenedor.className = 'frase';
			contenedor.innerHTML = frase;
			frases.appendChild(contenedor);
		});
	} else {
		data = [];
	}

	// agregar eventos
	btnagregar.addEventListener('click', function() {
		const txtfrase = document.getElementById('txtfrase');
		
		txtfrase.value = '';

		if(txtfrase.value.trim().length > 0) {
			const actualizado = [...data, txtfrase.value];
			localStorage.setItem(localstoragename, JSON.stringify(actualizado));
			location.reload();
		}
	});
};