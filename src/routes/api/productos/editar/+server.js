import { json } from '@sveltejs/kit';
import { datosGlobales } from '$lib/estado-compartido.js';

export const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { id, nombre, sku, categoria } = body;

    if (!id) {
      return json(
        { error: 'Falta parámetro: id (ID del producto)' },
        { status: 400 }
      );
    }

    // Buscar el producto por ID
    const producto = datosGlobales.productos.find((p) => p.id === Number(id));

    if (!producto) {
      return json(
        { error: `Producto con ID "${id}" no encontrado` },
        { status: 404 }
      );
    }

    // Guardar valores anteriores para el mensaje de confirmación
    const valoresAnteriores = {
      nombre: producto.nombre,
      sku: producto.sku,
      categoria: producto.categoria
    };

    // Actualizar solo los campos proporcionados
    if (nombre && nombre.trim()) {
      producto.nombre = nombre.trim();
    }
    if (sku && sku.trim()) {
      producto.sku = sku.trim().toUpperCase();
    }
    if (categoria && categoria.trim()) {
      producto.categoria = categoria.trim();
    }

    return json({
      success: true,
      producto: producto,
      valoresAnteriores: valoresAnteriores,
      datos: datosGlobales,
      mensaje: `✅ Producto actualizado exitosamente`
    });
  } catch (error) {
    console.error('Error al editar producto:', error);
    return json(
      { error: 'Error al editar producto' },
      { status: 500 }
    );
  }
};
