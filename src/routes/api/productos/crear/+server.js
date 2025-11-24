import { json } from '@sveltejs/kit';
import { datosGlobales } from '$lib/estado-compartido.js';

export const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { nombre, categoria, sku } = body;

    if (!nombre || !categoria) {
      return json(
        { error: 'Falta nombre o categoría' },
        { status: 400 }
      );
    }

    // Generar SKU si no viene
    const skuFinal = sku || `SKU-${Date.now()}`;
    
    // Crear producto con stock 0 en todos los locales
    const stock = /** @type {{ 1: number; 2: number; 3: number; }} */ ({});
    datosGlobales.locales.forEach((local) => {
      stock[/** @type {1|2|3} */ (local.id)] = 0;
    });

    const nuevoProducto = {
      id: Math.max(...datosGlobales.productos.map((p) => p.id), 0) + 1,
      nombre: nombre.trim(),
      sku: skuFinal.trim().toUpperCase(),
      categoria: categoria.trim(),
      activo: true,
      stock
    };

    // Agregar el nuevo producto a la BD en memoria compartida
    datosGlobales.productos.push(nuevoProducto);

    return json({
      success: true,
      producto: nuevoProducto,
      datos: datosGlobales,
      mensaje: `✅ Producto "${nombre}" creado exitosamente en todos los locales`
    });
  } catch (error) {
    console.error('Error creando producto:', error);
    return json(
      { error: 'Error al crear producto' },
      { status: 500 }
    );
  }
};
