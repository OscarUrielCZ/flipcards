window.onload = function() {
	// cargar datos y elementos
	const localstoragename = 'flipcards123';
	const btnagregar = document.getElementById('btn-agregar');
	const frases = document.getElementById('preguntas');
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
		const txtpregunta = document.getElementById('txt-pregunta').value.trim();
		const imgpregunta = document.getElementById('img-pregunta').value; 
		const txtrespuesta = document.getElementById('txt-respuesta').value.trim();
		const imgrespuesta = document.getElementById('img-respuesta').value; 

		if((txtpregunta || imgpregunta) && (txtrespuesta || imgrespuesta)) {
			const pregunta = {
				pregunta: {
					contenido: txtpregunta ? txtpregunta : getfilename(imgpregunta),
					esimagen: txtpregunta == ""
				},
				respuesta: {
					contenedor: txtrespuesta ? txtrespuesta : getfilename(imgrespuesta),
					esimagen: txtrespuesta == ""
				}
			};

			const actualizado = [...data, pregunta];
			localStorage.setItem(localstoragename, JSON.stringify(actualizado));
			txtpregunta.value = '';
			location.reload();
		}
	});
};

const getfilename = pathfile => {
	const array = pathfile.split('\\');
	return array[array.length-1];
};