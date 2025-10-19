# 📚 Guía de Testing para Junior

## ¿Qué es Testing?

El **testing** es el proceso de verificar que tu código hace lo que debería hacer. Imagina que eres QA (quality assurance) comprobando si el software funciona correctamente.

---

## 🧪 JASMINE - Unit Testing (Frontend/JavaScript)

### ¿Qué es Jasmine?

**Jasmine** es un framework para escribir **pruebas unitarias** en JavaScript. Prueba **funciones, lógica, objetos** de tu código.

### Características:
- ✅ Pruebas de **lógica pura** (funciones)
- ✅ Pruebas de **datos** (objetos, arrays)
- ✅ Pruebas de **valores** (números, strings)
- ❌ NO prueba interfaces (UI)
- ❌ NO prueba servidores HTTP

### Sintaxis básica:

```javascript
describe('Descripción del grupo de tests', () => {
  
  it('descripción de lo que debe hacer', () => {
    // Arrange: Preparar datos
    const resultado = 2 + 2;
    
    // Assert: Verificar resultado
    expect(resultado).toBe(4);
  });
  
});
```

### Matchers (expectativas):

```javascript
expect(5).toBe(5);                    // igualdad exacta
expect(true).toBeTruthy();            // es verdadero
expect(false).toBeFalsy();            // es falso
expect(10).toBeGreaterThan(5);        // es mayor que
expect(3).toBeLessThan(10);           // es menor que
expect([1,2,3]).toContain(2);         // contiene elemento
expect('hello').toContain('ell');     // contiene substring
expect([1,2]).toHaveLength(2);        // tiene longitud
expect({a:1}).toEqual({a:1});         // objetos iguales
expect(() => error()).toThrow();      // lanza error
```

---

## 🧬 JUNIT - Unit Testing (Backend/Java)

### ¿Qué es JUnit?

**JUnit** es el equivalente de Jasmine pero para **Java**. Prueba la **lógica del backend**.

### Diferencias con Jasmine:

| Aspecto | Jasmine | JUnit |
|---------|---------|-------|
| **Lenguaje** | JavaScript | Java |
| **Uso** | Frontend/Node.js | Backend |
| **Sintaxis** | `describe()`, `it()` | `@Test` |
| **Assertions** | `expect().toBe()` | `assertEquals()` |

### Ejemplo JUnit:

```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class CalculadoraTest {
  
  @Test
  public void sumarDebeRetornarCorrectamente() {
    // Arrange
    Calculadora calc = new Calculadora();
    
    // Act
    int resultado = calc.sumar(2, 2);
    
    // Assert
    assertEquals(4, resultado);
  }
  
}
```

### Matchers en JUnit:

```java
assertEquals(4, 2 + 2);                    // igualdad
assertTrue(true);                          // es verdadero
assertFalse(false);                        // es falso
assertNotNull(objeto);                     // no es nulo
assertThrows(Exception.class, () -> {});   // lanza excepción
```

---

## 📮 POSTMAN - API Testing (HTTP)

### ¿Qué es Postman?

**Postman** es una **herramienta gráfica** para probar **endpoints HTTP** (APIs). NO es un framework de código, es una app.

### ¿Para qué sirve?

- ✅ Probar **GET, POST, PUT, DELETE**
- ✅ Verificar **status codes** (200, 404, 500)
- ✅ Validar **respuestas JSON**
- ✅ Enviar **headers y parámetros**
- ✅ Simular **cliente HTTP**

### Ejemplo en Postman:

```
POST http://localhost:5173/api/productos/crear
Headers:
  Content-Type: application/json

Body:
{
  "nombre": "Laptop",
  "sku": "LAP-001",
  "categoria": "Electrónica"
}

Response:
{
  "success": true,
  "producto": {...}
}
```

### Comparación visual:

| Herramienta | Tipo | Código? | HTTP? | UI? |
|-------------|------|---------|-------|-----|
| **Jasmine** | Unit Test | ✅ Sí | ❌ No | ❌ No |
| **JUnit** | Unit Test | ✅ Sí | ❌ No | ❌ No |
| **Postman** | API Test | ❌ No | ✅ Sí | ✅ Sí |

---

## 🎯 Pirámide de Testing

```
        ┌─────────┐
        │   E2E   │  (End-to-End)
        │ (5%)    │  Pruebas completas con UI
        ├─────────┤
        │  API    │  (20%)
        │ Tests   │  Postman, REST Assured
        ├─────────┤
        │ Unit    │  (75%)
        │ Tests   │  Jasmine, JUnit, Jest
        └─────────┘
```

---

## 📋 EJEMPLO PRÁCTICO CON SIGA

### Test Unitario (Jasmine):

```javascript
// Prueba la lógica de cálculo de descuento
describe('Cálculo de Descuento', () => {
  
  it('debe aplicar 10% de descuento', () => {
    const precioOriginal = 100;
    const descuento = 0.10;
    const precioFinal = precioOriginal * (1 - descuento);
    
    expect(precioFinal).toBe(90);
  });
  
});
```

### Test de API (Postman):

```
POST /api/productos/crear
{
  "nombre": "Mouse",
  "precio": 50
}

✅ Status: 200
✅ Response tiene "success": true
✅ Response tiene producto.id
```

### Test JUnit (Backend):

```java
@Test
public void crearProductoDebeGuardarEnBD() {
  ProductoService service = new ProductoService();
  Producto producto = service.crear("Mouse", 50);
  
  assertEquals("Mouse", producto.getNombre());
  assertEquals(50, producto.getPrecio());
  assertNotNull(producto.getId());
}
```

---

## 🚀 Comando para ejecutar Tests

### Jasmine/Karma:
```bash
npm test           # Una sola ejecución
npm run test:watch # Monitoreo continuo
```

### JUnit (Maven):
```bash
mvn test           # Ejecutar todos los tests
mvn test -Dtest=MiTest  # Test específico
```

### Postman:
```bash
# Desde CLI (Newman)
newman run coleccion.json
```

---

## ✅ Buenas prácticas para Junior

### 1️⃣ **Naming claro**
```javascript
// ✅ BIEN
it('sumar dos números positivos debe retornar suma correcta', () => {})

// ❌ MAL
it('suma', () => {})
```

### 2️⃣ **Arrange-Act-Assert (AAA)**
```javascript
it('debe calcular total correcto', () => {
  // Arrange: Preparar datos
  const items = [10, 20, 30];
  
  // Act: Ejecutar acción
  const total = items.reduce((a, b) => a + b, 0);
  
  // Assert: Verificar resultado
  expect(total).toBe(60);
});
```

### 3️⃣ **Un assert por test (normalmente)**
```javascript
// ✅ BIEN
it('debe sumar 2 + 2', () => {
  expect(2 + 2).toBe(4);
});

it('debe restar 5 - 2', () => {
  expect(5 - 2).toBe(3);
});

// ❌ EVITAR (múltiples asserts)
it('hacer matemáticas', () => {
  expect(2 + 2).toBe(4);
  expect(5 - 2).toBe(3);
  expect(3 * 4).toBe(12);
});
```

### 4️⃣ **Grouping con describe()**
```javascript
describe('Inventario', () => {
  
  describe('Crear Producto', () => {
    it('...', () => {});
  });
  
  describe('Actualizar Stock', () => {
    it('...', () => {});
  });
  
});
```

---

## 📊 Resumen Comparativo

```
┌──────────────┬──────────┬──────────┬─────────┬──────────┐
│ Tipo         │ Framework│ Lenguaje │ Compila │ HTTP?    │
├──────────────┼──────────┼──────────┼─────────┼──────────┤
│ Unit Test    │ Jasmine  │ JS       │ No      │ No       │
│ Unit Test    │ JUnit    │ Java     │ Sí      │ No       │
│ Integration  │ Jest     │ JS       │ No      │ No       │
│ API Test     │ Postman  │ Gráfico  │ N/A     │ Sí       │
│ E2E Test     │ Cypress  │ JS       │ No      │ Sí (UI)  │
└──────────────┴──────────┴──────────┴─────────┴──────────┘
```

---

## 🎓 Próximos Pasos

1. ✅ Entender tests básicos (Jasmine) ← **AQUÍ ESTÁS**
2. ⏭️ Escribir tests para SIGA
3. ⏭️ Aprender mocks y spies (Jasmine)
4. ⏭️ Probar APIs con Postman
5. ⏭️ Tests E2E con Cypress

---

**¡Happy Testing! 🎉**

*Recuerda: Un test que falla es mejor que código sin tests.*
