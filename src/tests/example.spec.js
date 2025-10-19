// ============================================
// TESTS BÁSICOS PARA JUNIOR - JASMINE
// ============================================

// ✅ TEST 1: PRUEBAS DE IGUALDAD (toBe)
describe('Pruebas de Igualdad', () => {
  
  it('2 + 2 debe ser igual a 4', () => {
    const resultado = 2 + 2;
    expect(resultado).toBe(4);
  });

  it('el nombre debe ser "SIGA"', () => {
    const nombre = 'SIGA';
    expect(nombre).toBe('SIGA');
  });

});

// ✅ TEST 2: PRUEBAS BOOLEANAS (toBeTruthy / toBeFalsy)
describe('Pruebas Booleanas', () => {
  
  it('un valor true debería ser truthy', () => {
    const esValido = true;
    expect(esValido).toBeTruthy();
  });

  it('un string vacío debería ser falsy', () => {
    const nombre = '';
    expect(nombre).toBeFalsy();
  });

  it('un numero 0 debería ser falsy', () => {
    const cantidad = 0;
    expect(cantidad).toBeFalsy();
  });

  it('un numero 5 debería ser truthy', () => {
    const cantidad = 5;
    expect(cantidad).toBeTruthy();
  });

});

// ✅ TEST 3: PRUEBAS NUMÉRICAS (toBeGreaterThan, toBeLessThan)
describe('Pruebas Numéricas', () => {
  
  it('10 es mayor que 5', () => {
    expect(10).toBeGreaterThan(5);
  });

  it('3 es menor que 8', () => {
    expect(3).toBeLessThan(8);
  });

  it('el precio debe estar entre 100 y 1000', () => {
    const precio = 500;
    expect(precio).toBeGreaterThan(100);
    expect(precio).toBeLessThan(1000);
  });

});

// ✅ TEST 4: PRUEBAS CON ARRAYS (toContain, toHaveLength)
describe('Pruebas con Arrays', () => {
  
  it('el array debe contener "Electrónica"', () => {
    const categorias = ['Electrónica', 'Ropa', 'Alimentos'];
    expect(categorias).toContain('Electrónica');
  });

  it('el array debe tener 3 elementos', () => {
    const items = ['item1', 'item2', 'item3'];
    expect(items.length).toBe(3);
  });

});

// ✅ TEST 5: PRUEBAS CON OBJETOS (toEqual)
describe('Pruebas con Objetos', () => {
  
  it('el producto debe tener nombre y precio', () => {
    const producto = {
      nombre: 'Laptop',
      precio: 1000
    };
    
    expect(producto.nombre).toBe('Laptop');
    expect(producto.precio).toBe(1000);
  });

  it('dos objetos iguales deben ser iguales', () => {
    const obj1 = { id: 1, nombre: 'SIGA' };
    const obj2 = { id: 1, nombre: 'SIGA' };
    
    expect(obj1).toEqual(obj2);
  });

});

// ✅ TEST 6: PRUEBAS DE VALIDACIÓN (NOT)
describe('Pruebas Negadas (NOT)', () => {
  
  it('5 NO debe ser menor que 3', () => {
    expect(5).not.toBeLessThan(3);
  });

  it('el nombre NO debe ser "Admin"', () => {
    const nombre = 'User';
    expect(nombre).not.toBe('Admin');
  });

});

// ✅ TEST 7: PRUEBAS DE FUNCIONES
describe('Pruebas de Funciones', () => {
  
  it('sumar 5 + 3 debe retornar 8', () => {
    const sumar = (a, b) => a + b;
    expect(sumar(5, 3)).toBe(8);
  });

  it('multiplicar 4 * 5 debe retornar 20', () => {
    const multiplicar = (a, b) => a * b;
    expect(multiplicar(4, 5)).toBe(20);
  });

  it('obtener nombre debe retornar "Usuario"', () => {
    const obtenerNombre = () => 'Usuario';
    expect(obtenerNombre()).toBe('Usuario');
  });

});

// ✅ TEST 8: PRUEBAS DE ERRORES (toThrow)
describe('Pruebas de Errores', () => {
  
  it('dividir por cero debe lanzar error', () => {
    const dividir = (a, b) => {
      if (b === 0) throw new Error('No se puede dividir por cero');
      return a / b;
    };
    
    expect(() => dividir(10, 0)).toThrow();
  });

});

// ✅ TEST 9: PRUEBAS DE INVENTARIO (caso real SIGA)
describe('Sistema de Inventario SIGA', () => {
  
  it('crear producto con stock inicial', () => {
    const producto = {
      id: 1,
      nombre: 'Teclado',
      sku: 'TEC-001',
      stock: 50,
      activo: true
    };
    
    expect(producto.nombre).toBe('Teclado');
    expect(producto.stock).toBeGreaterThan(0);
    expect(producto.activo).toBeTruthy();
  });

  it('actualizar stock debe restar correctamente', () => {
    let stock = 50;
    const restar = (cantidad) => stock -= cantidad;
    
    restar(10);
    expect(stock).toBe(40);
    
    restar(5);
    expect(stock).toBe(35);
  });

  it('validar que no exista stock negativo', () => {
    const stock = -5;
    expect(stock).toBeLessThan(0);
    // En producción: if(stock < 0) throw Error()
  });

});
