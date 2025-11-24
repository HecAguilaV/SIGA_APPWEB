// ============================================
// [UNIT] TESTS - Validación de Inventario
// Guía Jasmine + Karma adaptada a SIGA
// ============================================

describe('Validador de Inventario', () => {

  // ✅ TEST 1: Validar que el nombre NO esté vacío
  // Similar a: "contraseña no vacía"
  describe('Validación de Nombre de Producto', () => {
    
    it('lanza error si nombre está vacío', () => {
      // toThrow: espera que la función lance un error
      const validarNombre = (nombre) => {
        if (!nombre || nombre.trim() === '') {
          throw new Error("Nombre de producto vacío");
        }
        return true;
      };

      expect(() => validarNombre("")).toThrow();
      expect(() => validarNombre("   ")).toThrow();
    });

    it('acepta nombre válido', () => {
      const nombre = 'Laptop Dell';
      expect(nombre.trim().length).toBeGreaterThan(0);
      expect(nombre).toBeTruthy();
    });

  });

  // ✅ TEST 2: Validar SKU con formato correcto
  // Similar a: "mayúscula + número + símbolo"
  describe('Validación de SKU', () => {
    
    it('SKU debe tener formato válido (LETRAS-NÚMEROS)', () => {
      const validarSKU = (sku) => {
        const formato = /^[A-Z]+-\d{3}$/.test(sku);
        if (!formato) {
          throw new Error("SKU inválido. Debe ser: XXX-123");
        }
        return true;
      };

      // toThrow: rechaza formato inválido
      expect(() => validarSKU("mouse123")).toThrow();
      expect(() => validarSKU("LAP-99")).toThrow();
      expect(() => validarSKU("lap-001")).toThrow();
    });

    it('acepta SKU con formato correcto', () => {
      const sku = 'LAP-001';
      const esValido = /^[A-Z]+-\d{3}$/.test(sku);
      expect(esValido).toBeTrue(); // toBeTrue: verdadero
    });

    it('rechaza SKU inválido', () => {
      const sku = 'mouse123';
      const esValido = /^[A-Z]+-\d{3}$/.test(sku);
      expect(esValido).toBeFalse(); // toBeFalse: falso
    });

  });

  // ✅ TEST 3: Validar que el stock sea positivo
  // Similar a: "número válido"
  describe('Validación de Stock', () => {
    
    it('stock debe ser número positivo', () => {
      const validarStock = (stock) => {
        const esNumero = Number.isInteger(stock);
        const esPositivo = stock >= 0;
        
        if (!esNumero || !esPositivo) {
          throw new Error("Stock debe ser un número positivo");
        }
        return true;
      };

      expect(() => validarStock(-5)).toThrow();
      expect(() => validarStock("50")).toThrow();
      expect(() => validarStock(50)).not.toThrow();
    });

    it('retorna objeto con estructura correcta', () => {
      const resultado = {
        stockValido: true,
        cantidad: 50,
        local: 'Central'
      };

      // toContain: verifica si incluye clave
      expect(Object.keys(resultado)).toContain("stockValido");
      expect(Object.keys(resultado)).toContain("cantidad");
      
      // toEqual: compara arrays
      expect(Object.keys(resultado)).toEqual([
        "stockValido", "cantidad", "local"
      ]);
    });

  });

});
