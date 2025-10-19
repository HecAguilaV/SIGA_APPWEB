// ============================================
// TESTS UNITARIOS - CÁLCULOS MATEMÁTICOS
// ============================================

describe('Tests Unitarios - Cálculos', () => {

  // ✅ TEST 1: Operaciones aritméticas básicas
  describe('Operaciones Matemáticas Básicas', () => {
    
    it('suma debe ser correcta', () => {
      const sumar = (a, b) => a + b;
      expect(sumar(5, 3)).toBe(8);
      expect(sumar(10, 20)).toBe(30);
      expect(sumar(-5, 5)).toBe(0);
    });

    it('resta debe ser correcta', () => {
      const restar = (a, b) => a - b;
      expect(restar(10, 3)).toBe(7);
      expect(restar(50, 20)).toBe(30);
      expect(restar(5, 5)).toBe(0);
    });

    it('multiplicación debe ser correcta', () => {
      const multiplicar = (a, b) => a * b;
      expect(multiplicar(5, 3)).toBe(15);
      expect(multiplicar(4, 4)).toBe(16);
      expect(multiplicar(10, 0)).toBe(0);
    });

    it('división debe ser correcta', () => {
      const dividir = (a, b) => {
        if (b === 0) throw new Error('No se puede dividir por cero');
        return a / b;
      };
      
      expect(dividir(10, 2)).toBe(5);
      expect(dividir(100, 4)).toBe(25);
    });

  });

  // ✅ TEST 2: Cálculos de inventario
  describe('Cálculos de Inventario', () => {
    
    it('calcular total de stock en todos los locales', () => {
      const stock = {
        'Central': 50,
        'Ibáñez': 30,
        'Serena': 20
      };

      const calcularTotal = (stk) => Object.values(stk).reduce((a, b) => a + b, 0);
      expect(calcularTotal(stock)).toBe(100);
    });

    it('calcular promedio de stock por local', () => {
      const stock = {
        'Central': 50,
        'Ibáñez': 30,
        'Serena': 20
      };

      const valores = Object.values(stock);
      const promedio = valores.reduce((a, b) => a + b, 0) / valores.length;
      
      expect(promedio).toBe(33.33333333333333);
    });

    it('encontrar local con más stock', () => {
      const stock = {
        'Central': 50,
        'Ibáñez': 30,
        'Serena': 20
      };

      const localMax = Object.keys(stock).reduce((a, b) => 
        stock[a] > stock[b] ? a : b
      );
      
      expect(localMax).toBe('Central');
    });

  });

  // ✅ TEST 3: Cálculos de precios y descuentos
  describe('Cálculos de Precios', () => {
    
    it('aplicar descuento porcentual', () => {
      const precio = 100;
      const descuento = 0.10; // 10%
      const precioFinal = precio * (1 - descuento);
      
      expect(precioFinal).toBe(90);
    });

    it('calcular IVA', () => {
      const precio = 100;
      const iva = 0.19; // 19%
      const precioConIva = precio * (1 + iva);
      
      expect(precioConIva).toBe(119);
    });

    it('calcular precio final con descuento e IVA', () => {
      const precioBase = 100;
      const descuento = 0.10;
      const iva = 0.19;
      
      const precioConDescuento = precioBase * (1 - descuento);
      const precioFinal = precioConDescuento * (1 + iva);
      
      expect(precioFinal).toBe(107.1);
    });

  });

  // ✅ TEST 4: Rangos y validaciones numéricas
  describe('Validaciones Numéricas', () => {
    
    it('validar que stock esté en rango válido', () => {
      const stock = 50;
      const minimo = 0;
      const maximo = 1000;
      
      expect(stock).toBeGreaterThanOrEqual(minimo);
      expect(stock).toBeLessThanOrEqual(maximo);
    });

    it('detectar stock bajo', () => {
      const stock = 5;
      const minimoAlerta = 10;
      
      const esStockBajo = stock < minimoAlerta;
      expect(esStockBajo).toBe(true);
    });

    it('detectar stock normal', () => {
      const stock = 50;
      const minimoAlerta = 10;
      
      const esStockBajo = stock < minimoAlerta;
      expect(esStockBajo).toBe(false);
    });

  });

});
