import { json } from '@sveltejs/kit';
import { datosGlobales } from '$lib/estado-compartido.js';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request }) {
  try {
    const { id } = await request.json();

    if (!id) {
      return json({ success: false, mensaje: 'ID del producto requerido' }, { status: 400 });
    }

    // Buscar el producto por ID
    const indiceProducto = datosGlobales.productos.findIndex((p) => p.id === id);

    if (indiceProducto === -1) {
      return json(
        { success: false, mensaje: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    // Marcar como desactivado o eliminar
    // Opción 1: Desactivar (recomendado para mantener historial)
    datosGlobales.productos[indiceProducto].activo = false;

    // Opción 2: Eliminar completamente (descomentar si prefieres eliminar)
    // const productoEliminado = datosGlobales.productos.splice(indiceProducto, 1)[0];

    const productoDesactivado = datosGlobales.productos[indiceProducto];

    console.log(`✅ Producto desactivado: ${productoDesactivado.nombre} (ID: ${id})`);

    return json({
      success: true,
      mensaje: `Producto "${productoDesactivado.nombre}" ha sido desactivado`,
      producto: productoDesactivado,
      datos: datosGlobales
    });
  } catch (error) {
    console.error('Error al desactivar producto:', error);
    return json(
      { success: false, mensaje: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
