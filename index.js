window.onload = function() {
	// cargar datos y elementos
	const localstoragename = 'flipcards123';
	const btnagregar = document.getElementById('btn-agregar');
	const colores = ['#f2f2f2', '#e0e0e0'];
	const frases = document.getElementById('preguntas');


	// cargar datos del localstorage
	let data = localStorage.getItem(localstoragename);
	if(data != null) {
		data = JSON.parse(data);
		// imprimir datos en el DOM
		console.log(data);
		data.map((objeto, index) => {
			const contenedor = document.createElement('div');
			const texto = document.createElement('div');
			const acciones = document.createElement('div');
			const pregunta = document.createElement('span');
			const respuesta = document.createElement('span');
			const borrar = document.createElement('span');

			contenedor.className = 'frase';
			texto.className = 'texto';
			pregunta.className = 'pregunta';
			respuesta.className = 'respuesta';
			acciones.className = 'acciones';
			pregunta.innerHTML = (objeto.pregunta.esimagen ? 'imagen: ': '') + objeto.pregunta.contenido;
			respuesta.innerHTML = (objeto.respuesta.esimagen ? 'imagen: ': '') + objeto.respuesta.contenido;
			borrar.innerHTML = 'borrar';
			contenedor.style.background = colores[index%2];

			texto.appendChild(pregunta);
			texto.appendChild(respuesta);
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
		const txtpregunta = document.getElementById('txt-pregunta');
		const imgpregunta = document.getElementById('img-pregunta');
		const txtrespuesta = document.getElementById('txt-respuesta');
		const imgrespuesta = document.getElementById('img-respuesta');

		if((txtpregunta.value.trim() || imgpregunta.value) && (txtrespuesta.value.trim() || imgrespuesta.value)) {
			const pregunta = {
				pregunta: {
					contenido: txtpregunta.value.trim() ? txtpregunta.value.trim() : getfilename(imgpregunta.value),
					esimagen: txtpregunta.value.trim() == ""
				},
				respuesta: {
					contenido: txtrespuesta.value.trim() ? txtrespuesta.value.trim() : getfilename(imgrespuesta.value),
					esimagen: txtrespuesta.value.trim() == ""
				}
			};

			const actualizado = [...data, pregunta];
			localStorage.setItem(localstoragename, JSON.stringify(actualizado));
			txtpregunta.value = '';
			txtrespuesta.value = '';
			imgpregunta.value = '';
			imgrespuesta.value = '';
			location.reload();
		}
	});
};

const getfilename = pathfile => {
	const array = pathfile.split('\\');
	return array[array.length-1];
};