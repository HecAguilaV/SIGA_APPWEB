# 🧪 Testing con Jasmine y Karma - Guía Completa

## � Índice

1. [¿Qué es Testing?](#qué-es-testing)
2. [¿Qué es Jasmine?](#qué-es-jasmine)
3. [¿Qué es Karma?](#qué-es-karma)
4. [Instalación](#instalación)
5. [Ejecutar Tests](#ejecutar-tests)
6. [Escribir tu Primer Test](#escribir-tu-primer-test)
7. [Matchers (Expectativas)](#matchers-expectativas)
8. [Comparativa: Jasmine vs JUnit vs Postman](#comparativa-jasmine-vs-junit-vs-postman)

---

## ¿Qué es Testing?

**Testing** = Verificar que tu código funciona correctamente.

Es como una lista de chequeo para asegurar que:
- ✅ Las funciones retornan lo esperado
- ✅ Los datos se procesan correctamente
- ✅ No hay errores inesperados
- ✅ El código sigue siendo correcto después de cambios

---

## ¿Qué es Jasmine?

**Jasmine** es un framework para escribir **pruebas unitarias en JavaScript**.

### Ventajas:
- 📝 Sintaxis simple y legible
- 🚀 No necesita instalación compleja
- 🎯 Perfecto para JavaScript/TypeScript
- 🔄 Excelente para pruebas de lógica

### No prueba:
- ❌ Interfaces gráficas (UI)
- ❌ Conexiones HTTP
- ❌ Bases de datos

---

## ¿Qué es Karma?

**Karma** es un **test runner** (ejecutor de pruebas).

Su función: Tomar tus tests de Jasmine y ejecutarlos en un navegador real (Chrome, Firefox, etc).

```
Tu código → Jasmine (tests) → Karma (ejecuta en navegador) → Resultado ✅/❌
```

---

## � Instalación

### Ya está configurado en este proyecto

```json
{
  "devDependencies": {
    "jasmine": "latest",
    "karma": "latest",
    "karma-jasmine": "latest",
    "karma-chrome-launcher": "latest",
    "@types/jasmine": "latest"
  }
}
```

**Archivos principales:**
- `karma.conf.js` - Configuración de Karma
- `src/tests/example.spec.js` - Tus tests
- `jsconfig.json` - Tipos de Jasmine

---

## 🚀 Ejecutar Tests

### Opción 1: Una sola ejecución
```bash
npm test
```
Ejecuta los tests una vez y termina.

### Opción 2: Watch mode (desarrollo)
```bash
npm run test:watch
```
Ejecuta los tests automáticamente cada vez que guardas archivos.

### Opción 3: CI/CD (servidores)
```bash
npm run test:ci
```
Usa Chrome headless (sin interfaz gráfica) para CI/CD.

---

## 📝 Escribir tu Primer Test

### Estructura básica:

```javascript
describe('Descripción del grupo', () => {
  
  it('debe hacer algo', () => {
    // Tu código aquí
    expect(resultado).toBe(esperado);
  });
  
});
```

### Ejemplo real:

```javascript
describe('Sumar Números', () => {
  
  it('debe sumar 2 + 2 correctamente', () => {
    const resultado = 2 + 2;
    expect(resultado).toBe(4);
  });
  
});
```

---

## 🎯 Matchers (Expectativas)

Los matchers son los "verificadores" en Jasmine:

### Igualdad
```javascript
expect(5).toBe(5);                    // Exacto
expect({a:1}).toEqual({a:1});         // Profundo
```

### Booleanos
```javascript
expect(true).toBeTruthy();            // Es verdadero
expect(false).toBeFalsy();            // Es falso
expect('texto').toBeTruthy();         // String = truthy
expect('').toBeFalsy();               // String vacío = falsy
```

### Números
```javascript
expect(10).toBeGreaterThan(5);        // Mayor que
expect(3).toBeLessThan(10);           // Menor que
expect(5).toBeGreaterThanOrEqual(5);  // Mayor o igual
```

### Arrays
```javascript
expect([1, 2, 3]).toContain(2);       // Contiene elemento
expect([1, 2, 3]).toHaveLength(3);    // Tiene longitud
```

### Strings
```javascript
expect('hello').toContain('ell');     // Contiene substring
expect('hello').toMatch(/llo/);       // Coincide regex
```

### Errores
```javascript
expect(() => {
  throw new Error('Algo malo pasó');
}).toThrow();
```

### Negación (NOT)
```javascript
expect(5).not.toBe(3);                // NO es igual a 3
expect(false).not.toBeTruthy();       // NO es truthy
```

---

## 🧬 Comparativa: Jasmine vs JUnit vs Postman

### Jasmine (JavaScript)
```javascript
// Frontend/Node.js
describe('Cálculo', () => {
  it('debe sumar correctamente', () => {
    expect(2 + 2).toBe(4);
  });
});
```
- ✅ Prueba **lógica JavaScript**
- ✅ Rápido y ligero
- ❌ NO prueba servidores
- ❌ NO prueba UI

### JUnit (Java)
```java
// Backend
@Test
public void debesumarCorrectamente() {
  assertEquals(4, 2 + 2);
}
```
- ✅ Prueba **lógica Java**
- ✅ Para código backend
- ❌ NO prueba APIs HTTP
- ❌ NO prueba UI

### Postman (Herramienta gráfica)
```
POST /api/sumar
Body: {"a": 2, "b": 2}
Response: {"resultado": 4}
```
- ✅ Prueba **APIs HTTP completas**
- ✅ Interfaz gráfica fácil
- ❌ NO es código
- ❌ NO prueba lógica frontend

---

## � Tabla Comparativa Detallada

| Característica | Jasmine | JUnit | Postman |
|---|---|---|---|
| **Lenguaje** | JavaScript | Java | N/A (Gráfico) |
| **Tipo** | Unit Test | Unit Test | API Test |
| **Entorno** | Frontend/Node | Backend | HTTP/REST |
| **Código?** | ✅ Sí | ✅ Sí | ❌ No |
| **Lógica?** | ✅ Sí | ✅ Sí | ❌ No |
| **APIs?** | ⚠️ Parcial | ❌ No | ✅ Sí |
| **Sincrónico** | ✅ Sí | ✅ Sí | ❌ No |
| **Interfaz** | Terminal | Terminal | 🖥️ Gráfica |
| **Curva aprendizaje** | Fácil | Media | Fácil |

---

## 💡 Ejemplo Práctico SIGA

### Test Jasmine (Lógica):
```javascript
describe('Inventario SIGA', () => {
  
  it('debe restar stock correctamente', () => {
    let stock = 50;
    stock -= 10;
    expect(stock).toBe(40);
  });
  
});
```

### Test Postman (API):
```
POST http://localhost:5173/api/inventario/actualizar

Body:
{
  "producto": "Laptop",
  "local": "Central",
  "nuevoStock": 40
}

Verificar:
✅ Status 200
✅ Response.success === true
✅ Response.stockNuevo === 40
```

---

## 🎓 Próximos Pasos

1. ✅ Leer esta guía
2. ⏭️ Ejecutar: `npm test`
3. ⏭️ Ver los tests pasar ✅
4. ⏭️ Modificar un test y verlo fallar ❌
5. ⏭️ Escribir tus propios tests

---

## 📚 Recursos Adicionales

- [Jasmine Docs](https://jasmine.github.io/)
- [Karma Documentation](https://karma-runner.github.io/)
- [Testing Best Practices](https://en.wikipedia.org/wiki/Unit_testing)

---

**¡Happy Testing! 🎉**

*"Un test que falla es mejor que código sin tests"*

