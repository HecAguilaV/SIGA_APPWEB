// ============================================
// [INTEGRATION] TEST - CRUD Básico
// Guía Jasmine + Karma adaptada a SIGA
// ============================================

describe('Operaciones CRUD de Inventario', () => {

  // ✅ TEST 4: Crear, Leer, Actualizar, Eliminar
  // Similar a: "contraseña válida ejecuta todo"
  it('ejecutar operaciones CRUD completas', () => {
    // 1. CREAR producto
    let productos = [];
    const producto = { 
      id: 1, 
      nombre: 'Laptop', 
      sku: 'LAP-001',
      precio: 1000 
    };
    productos.push(producto);
    
    expect(productos.length).toBe(1);
    expect(productos[0].nombre).toBe('Laptop');

    // 2. LEER producto
    const obtenido = productos.find(p => p.id === 1);
    expect(obtenido).toBeDefined();
    
    if (obtenido) {
      expect(obtenido.nombre).toBe('Laptop');

      // 3. ACTUALIZAR precio
      obtenido.precio = 1500;
      expect(obtenido.precio).toBe(1500);
    }

    // 4. ELIMINAR producto
    productos = productos.filter(p => p.id !== 1);
    expect(productos.length).toBe(0);
  });

});
