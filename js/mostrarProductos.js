import { conexionAPI, eliminarProducto } from './main.js';

const sectionTarjetas = document.querySelector("[data-tarjeta]");

function crearProducto(id, nombre, precio, imagen) {
    const tarjetaProducto = document.createElement("div");
    tarjetaProducto.className = "producto";
    tarjetaProducto.innerHTML = `
        <img id="foto-producto" src="${imagen}" alt="${nombre}" />
        <div class="tarjeta-informacion">
            <p>${nombre}</p>
            <div class="tarjeta-precio">
                <p>$ ${precio}</p>
                <img class="papelera" src="../img/icono-papelera.png" alt="Eliminar" data-id="${id}" />
            </div>
        </div>`;

    const iconoPapelera = tarjetaProducto.querySelector('.papelera');
    iconoPapelera.addEventListener('click', async function () {
        await eliminarProducto(id);
        await listarProductos();
    });

    return tarjetaProducto;
}

export async function listarProductos() {
    const listaAPI = await conexionAPI.listarProductos();
    sectionTarjetas.innerHTML = '';
    listaAPI.forEach(producto => sectionTarjetas.appendChild(crearProducto(producto.id, producto.nombre, producto.precio, producto.imagen)));
}

listarProductos();


