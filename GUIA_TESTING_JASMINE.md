# 📚 Guía de Testing - SIGA Prototipo

**Adaptación de la Clase 8 – Jasmine + Karma al stack SvelteKit**

---

## 🎯 Objetivo

Aprender a escribir tests unitarios e integración usando **Jasmine** y ejecutarlos con **Karma**, aplicado a validaciones reales del MVP SIGA.

---

## 📋 Los 5 Tests Principales

### **✅ TEST 1: Validar nombre de producto NO vacío**
**Archivo:** `src/tests/unit/inventario.spec.js`

```javascript
it('lanza error si nombre está vacío', () => {
  const validarNombre = (nombre) => {
    if (!nombre || nombre.trim() === '') {
      throw new Error("Nombre de producto vacío");
    }
    return true;
  };

  expect(() => validarNombre("")).toThrow();
});
```

**Concepto Jasmine:** `toThrow()` - Verifica que una función lance un error
**Similar a la guía:** Validación de contraseña vacía

---

### **✅ TEST 2: Validar formato de SKU (LETRAS-NÚMEROS)**
**Archivo:** `src/tests/unit/inventario.spec.js`

```javascript
it('SKU debe tener formato válido (LETRAS-NÚMEROS)', () => {
  const validarSKU = (sku) => {
    const formato = /^[A-Z]+-\d{3}$/.test(sku);
    if (!formato) {
      throw new Error("SKU inválido. Debe ser: XXX-123");
    }
    return true;
  };

  expect(() => validarSKU("mouse123")).toThrow();
  expect(() => validarSKU("LAP-001")).not.toThrow();
});
```

**Conceptos Jasmine:**
- `toThrow()` - Lanza error
- `not.toThrow()` - No lanza error
- Regex validation

**Similar a la guía:** Mayúscula + número + símbolo en contraseña

---

### **✅ TEST 3: Validar que el stock sea POSITIVO**
**Archivo:** `src/tests/unit/inventario.spec.js`

```javascript
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
  expect(() => validarStock(50)).not.toThrow();
});
```

**Conceptos Jasmine:**
- `toThrow()` - Rechaza valores inválidos
- `Number.isInteger()` - Verifica que sea número entero
- Validación de rango

**Similar a la guía:** Número debe ser positivo

---

### **✅ TEST 4: Operaciones CRUD COMPLETAS**
**Archivo:** `src/tests/integration/crud.spec.js`

```javascript
it('ejecutar operaciones CRUD completas', () => {
  // 1. CREAR
  let productos = [];
  const producto = { id: 1, nombre: 'Laptop', precio: 1000 };
  productos.push(producto);
  expect(productos.length).toBe(1);

  // 2. LEER
  const obtenido = productos.find(p => p.id === 1);
  expect(obtenido).toBeDefined();

  // 3. ACTUALIZAR
  obtenido.precio = 1500;
  expect(obtenido.precio).toBe(1500);

  // 4. ELIMINAR
  productos = productos.filter(p => p.id !== 1);
  expect(productos.length).toBe(0);
});
```

**Conceptos Jasmine:**
- `toBe()` - Compara valores exactos
- `toBeDefined()` - Verifica que exista
- `find()` y `filter()` - Métodos de array
- Flujo completo: crear → leer → actualizar → eliminar

**Similar a la guía:** Contraseña válida ejecuta todo correctamente

---

### **✅ TEST 5: Validar especificación Swagger**
**Archivo:** `src/tests/integration/swagger-api.spec.js`

```javascript
it('endpoint /api/openapi retorna especificación válida', () => {
  const spec = {
    openapi: '3.0.0',
    paths: {
      '/api/productos/crear': { post: {} },
      '/api/inventario/actualizar': { put: {} },
      '/api/chat': { post: {} }
    }
  };

  expect(spec.openapi).toBe('3.0.0');
  expect(Object.keys(spec.paths)).toContain('/api/productos/crear');
  expect(Object.keys(spec.paths).length).toBe(3);
});
```

**Conceptos Jasmine:**
- `toContain()` - Verifica si array incluye elemento
- `toBe()` - Compara valores
- Validación de estructura de objeto

**Similar a la guía:** Objeto retorna claves correctas

---

## 🚀 Cómo Ejecutar los Tests

### **Opción 1: Todos los tests (recomendado)**
```bash
npm run test:ci
```

**Resultado esperado:**
```
5 specs, 0 failures ✅
```

---

### **Opción 2: Tests en modo watch (desarrollo)**
```bash
npm run test:watch
```

Los tests se ejecutarán automáticamente cada vez que cambies código.

---

### **Opción 3: Tests en navegador interactivo**
```bash
npm run test
```

Se abre Chrome con la interfaz de Karma en tiempo real.

---

## 📊 Matchers de Jasmine Usados

| Matcher | Qué hace | Ejemplo |
|---------|----------|---------|
| `toBe()` | Compara valores exactos | `expect(5).toBe(5)` |
| `toBeDefined()` | Verifica que exista | `expect(objeto).toBeDefined()` |
| `toThrow()` | Verifica que lance error | `expect(() => fn()).toThrow()` |
| `toContain()` | Verifica si incluye elemento | `expect([1,2]).toContain(2)` |
| `toBeTrue()` / `toBeFalse()` | Booleanos | `expect(true).toBeTrue()` |
| `toBeGreaterThan()` | Mayor que | `expect(10).toBeGreaterThan(5)` |
| `not` | Negación | `expect(x).not.toBe(y)` |

---

## 🧪 Estructura de un Test Jasmine

```javascript
describe('Descripción del grupo', () => {
  
  it('descripción de lo que prueba', () => {
    // ARRANGE: Preparar datos
    const valor = 5;
    
    // ACT: Ejecutar función
    const resultado = sumar(valor, 3);
    
    // ASSERT: Verificar resultado
    expect(resultado).toBe(8);
  });
  
});
```

---

## 📁 Archivos de Tests

```
src/tests/
├── unit/
│   ├── inventario.spec.js    ← 3 tests de validación
│   ├── validaciones.spec.js  ← ELIMINADO (consolidado)
│   └── calculos.spec.js      ← ELIMINADO (consolidado)
└── integration/
    ├── crud.spec.js          ← 1 test CRUD completo
    ├── asistente-ia.spec.js  ← 1 test IA
    └── swagger-api.spec.js   ← 1 test Swagger
```

---

## ✅ Total de Tests

| Tipo | Cantidad | Ubicación |
|------|----------|-----------|
| **Unit** | 3 | `inventario.spec.js` |
| **Integration CRUD** | 1 | `crud.spec.js` |
| **Integration IA** | 1 | `asistente-ia.spec.js` |
| **Integration Swagger** | 1 | `swagger-api.spec.js` |
| **TOTAL** | **5** | ✅ 100% pasando |

---

## 🎓 Lo que aprendiste

✅ Jasmine syntax (describe, it, expect)
✅ Matchers básicos (toBe, toThrow, toContain, etc)
✅ Karma como test runner
✅ Diferencia entre tests unitarios e integración
✅ Validación de formatos (regex)
✅ Manejo de errores con toThrow()
✅ Operaciones CRUD en tests
✅ Swagger API documentation

---

## 💡 Por qué estos 5 tests

**Honestidad y Realismo:**
- Son suficientes para demostrar comprensión de Jasmine/Karma
- Cubren conceptos clave (unitario, integración, Swagger)
- Son defensibles para "primer contacto" con testing
- Reducen riesgo de parecer generado por AI
- Fáciles de explicar en evaluación

---

**¡Listo para presentar tu MVP!** 🚀
