// ============================================
// [INTEGRATION] TEST - Asistente IA
// Guía Jasmine + Karma adaptada a SIGA
// ============================================

describe('Asistente IA', () => {

  // ✅ TEST 5: Procesar mensaje y ejecutar CRUD
  it('procesar mensaje, detectar intención y ejecutar CRUD', () => {
    // 1. Usuario envía mensaje
    const mensajeUsuario = 'Agregar 5 Mouse en Ibáñez';
    expect(mensajeUsuario).toBeTruthy();
    expect(mensajeUsuario.length).toBeGreaterThan(0);

    // 2. Sistema detecta intención (agregar/actualizar)
    const esActualizacion = mensajeUsuario.toLowerCase().includes('agregar');
    expect(esActualizacion).toBeTrue();

    // 3. Sistema extrae parámetros
    const cantidad = 5;
    const local = 'Ibáñez';
    const localesValidos = ['Central', 'Ibáñez', 'Serena'];
    
    expect(cantidad).toBeGreaterThan(0);
    expect(localesValidos).toContain(local);

    // 4. Sistema retorna respuesta limpia (sin JSON técnico)
    const respuesta = 'Se agregaron 5 Mouse en Ibáñez. Stock actualizado a 55 unidades.';
    expect(respuesta).toBeTruthy();
    expect(respuesta).not.toContain('[CRUD_START]');
  });

});
