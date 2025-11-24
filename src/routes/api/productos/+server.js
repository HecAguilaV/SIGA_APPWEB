import { json } from '@sveltejs/kit';

export async function GET() {
    // Lista de productos de ejemplo (puedes reemplazar por tu lógica real)
    const productos = [
        { id: 'prod-001', nombre: 'Laptop desde API', categoria: 'Electrónica', sku: 'LAP-API-001', estado: 'activo' },
        { id: 'prod-002', nombre: 'Teclado desde API', categoria: 'Accesorios', sku: 'TEC-API-002', estado: 'activo' },
    ];

    // Crear la respuesta con los datos
    const response = json(productos);

    // Añadir cabeceras CORS
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;
}
