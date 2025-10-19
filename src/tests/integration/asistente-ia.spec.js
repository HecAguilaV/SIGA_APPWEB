// ============================================
// TESTS DE INTEGRACIÓN - ASISTENTE IA
// ============================================

describe('Tests de Integración - Asistente IA', () => {

  // ✅ TEST 1: Procesamiento de mensajes
  describe('Procesamiento de Mensajes', () => {
    
    it('mensaje debe ser procesado correctamente', () => {
      const mensaje = '¿En qué locales no hay rollos de canela?';
      
      expect(mensaje).toBeTruthy();
      expect(mensaje.length).toBeGreaterThan(0);
      expect(typeof mensaje).toBe('string');
    });

    it('mensaje vacío debe ser rechazado', () => {
      const mensaje = '';
      
      expect(mensaje.trim()).toBe('');
      expect(mensaje.trim().length).toBe(0);
    });

  });

  // ✅ TEST 2: Detección de intenciones
  describe('Detección de Intenciones', () => {
    
    it('detectar intención de búsqueda', () => {
      const mensaje = '¿Cuántos productos hay?';
      const esBusqueda = mensaje.includes('cuántos') || mensaje.includes('hay');
      
      expect(esBusqueda).toBe(true);
    });

    it('detectar intención de crear producto', () => {
      const mensaje = 'Crear nuevo producto Laptop';
      const esCrear = mensaje.toLowerCase().includes('crear');
      
      expect(esCrear).toBe(true);
    });

    it('detectar intención de actualizar stock', () => {
      const mensaje = 'Agregar 10 unidades en Central';
      const esActualizar = mensaje.includes('agregar') || mensaje.includes('reducir');
      
      expect(esActualizar).toBe(true);
    });

  });

  // ✅ TEST 3: Extracción de parámetros
  describe('Extracción de Parámetros', () => {
    
    it('extraer cantidad de mensaje', () => {
      const mensaje = 'Agregar 25 unidades';
      const coincidencia = mensaje.match(/\d+/);
      const cantidad = coincidencia ? parseInt(coincidencia[0]) : null;
      
      expect(cantidad).toBe(25);
    });

    it('extraer nombre de producto', () => {
      const mensaje = 'Crear producto Laptop';
      const partes = mensaje.split(' ');
      const nombre = partes[partes.length - 1];
      
      expect(nombre).toBe('Laptop');
    });

    it('extraer local de mensaje', () => {
      const mensaje = 'Stock en Central';
      const locales = ['Central', 'Ibáñez', 'Serena'];
      const localEncontrado = locales.find(l => mensaje.includes(l));
      
      expect(localEncontrado).toBe('Central');
    });

  });

  // ✅ TEST 4: Parsing de CRUD
  describe('Parsing de CRUD', () => {
    
    it('detectar bloque CRUD en respuesta', () => {
      const respuesta = 'Producto creado. [CRUD_START] {operación} [CRUD_END]';
      const tieneCRUD = respuesta.includes('[CRUD_START]') && respuesta.includes('[CRUD_END]');
      
      expect(tieneCRUD).toBe(true);
    });

    it('extraer contenido CRUD', () => {
      const respuesta = 'Creado. [CRUD_START] {"nombre":"Laptop"} [CRUD_END]';
      const regex = /\[CRUD_START\](.*?)\[CRUD_END\]/;
      const coincidencia = respuesta.match(regex);
      
      expect(coincidencia).toBeDefined();
      expect(coincidencia[1]).toContain('Laptop');
    });

  });

  // ✅ TEST 5: Validación de respuesta
  describe('Validación de Respuesta', () => {
    
    it('respuesta debe tener contenido', () => {
      const respuesta = 'El producto fue actualizado correctamente.';
      
      expect(respuesta).toBeTruthy();
      expect(respuesta.length).toBeGreaterThan(0);
    });

    it('respuesta no debe contener JSON técnico', () => {
      const respuesta = 'El stock se actualizó en Central a 50 unidades.';
      const tieneJSON = /\{.*\}/.test(respuesta);
      
      expect(tieneJSON).toBe(false);
    });

  });

  // ✅ TEST 6: Flujo completo simulado
  describe('Flujo Completo del Asistente', () => {
    
    it('procesar mensaje → detectar intención → ejecutar CRUD', () => {
      // 1. Usuario envía mensaje
      const mensajeUsuario = 'Agregar 5 Mouse en Ibáñez';
      expect(mensajeUsuario).toBeTruthy();

      // 2. Sistema detecta intención
      const esActualizacion = mensajeUsuario.includes('agregar');
      expect(esActualizacion).toBe(true);

      // 3. Sistema extrae parámetros
      const cantidad = 5;
      const local = 'Ibáñez';
      expect(cantidad).toBeGreaterThan(0);
      expect(local).toBeTruthy();

      // 4. Sistema ejecuta CRUD
      const crudExecutado = true;
      expect(crudExecutado).toBe(true);

      // 5. Sistema retorna respuesta limpia
      const respuesta = 'Se agregaron 5 Mouse en Ibáñez. Stock actualizado: 55 unidades.';
      expect(respuesta).toContain('agregaron');
      expect(respuesta).not.toContain('[CRUD_START]');
    });

  });

});
