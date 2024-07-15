import {agregarProducto} from './main.js';
import {listarProductos} from './mostrarProductos.js';

document.querySelector('form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre-producto').value;
    const precio = document.getElementById('precio-producto').value;
    const imagen = document.getElementById('imagen-producto').value;

    await agregarProducto(nombre, precio, imagen);

    
    document.getElementById('nombre-producto').value = '';
    document.getElementById('precio-producto').value = '';
    document.getElementById('imagen-producto').value = '';

    
    await listarProductos();
});