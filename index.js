window.onload = function() {
	// cargar datos y elementos
	const localstoragename = 'flipcards123';
	const btnagregar = document.getElementById('btnagregar');
	const frases = document.getElementById('frases');
	const colores = ['#f2f2f2', '#e0e0e0'];

	// cargar datos del localstorage
	let data = localStorage.getItem(localstoragename);
	if(data != null) {
		data = JSON.parse(data);
		// imprimir datos en el DOM
		data.map((frase, index) => {
			const contenedor = document.createElement('div');
			const texto = document.createElement('div');
			const acciones = document.createElement('div');
			const borrar = document.createElement('span');
			const editar = document.createElement('span');

			contenedor.className = 'frase';
			texto.className = 'texto';
			acciones.className = 'acciones';
			texto.innerHTML = frase;
			borrar.innerHTML = 'borrar';
			contenedor.style.background = colores[index%2];

			acciones.appendChild(borrar);
			contenedor.appendChild(texto);
			contenedor.appendChild(acciones);
			frases.appendChild(contenedor);

			borrar.addEventListener('click', function() {
				if(confirm('¿Seguro que quieres borrarla?')) {
					data.splice(index, 1);
					localStorage.setItem(localstoragename, JSON.stringify(data));
					location.reload();
				}
			});
		});
	} else {
		data = [];
	}

	// agregar eventos
	btnagregar.addEventListener('click', function() {
		const txtfrase = document.getElementById('txtfrase');

		if(txtfrase.value.trim().length > 0) {
			const actualizado = [...data, txtfrase.value];
			localStorage.setItem(localstoragename, JSON.stringify(actualizado));
			txtfrase.value = '';
			location.reload();
		}
	});
};