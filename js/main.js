let contadorId = 1;

async function listarProductos() {
    try {
        const conexion = await fetch('http://localhost:3000/productos');
        if (!conexion.ok) {
            throw new Error('Error al obtener productos');
        }
        const conexionConvertida = await conexion.json();
        
        if (conexionConvertida.length > 0) {
            const maxId = Math.max(...conexionConvertida.map(producto => parseInt(producto.id, 10)));
            contadorId = maxId + 1;
        }
        
        return conexionConvertida;
    } catch (error) {
        console.error('Error al listar productos:', error);
        return [];
    }
}

export const conexionAPI = {
    listarProductos
};

export async function agregarProducto(nombre, precio, imagen) {
    try {
        const nuevoProducto = {
            id: contadorId.toString(),
            nombre,
            precio,
            imagen
        };

        const response = await fetch('http://localhost:3000/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoProducto),
        });

        if (!response.ok) {
            throw new Error('Error al agregar producto');
        }

        console.log('Producto agregado exitosamente:', nuevoProducto);
        contadorId++;
        return response.json();
    } catch (error) {
        console.error('Error al agregar producto:', error);
    }
}

export async function eliminarProducto(id) {
    try {
        const response = await fetch(`http://localhost:3000/productos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el producto');
        }

        console.log('Producto eliminado exitosamente:', id);
        return response.json();
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        throw error;
    }
}
