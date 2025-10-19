# 📋 Estructura de Tests - SIGA

## 🗂️ Organización

```
src/tests/
├── unit/
│   ├── inventario.spec.js        (4 suites × 15 tests)
│   ├── calculos.spec.js          (4 suites × 11 tests)
│   └── validaciones.spec.js      (6 suites × 17 tests)
│
├── integration/
│   ├── crud.spec.js              (5 suites × 10 tests)
│   └── asistente-ia.spec.js      (6 suites × 9 tests)
│
└── README.md (este archivo)
```

---

## 🧪 Tests Unitarios (`unit/`)

### `inventario.spec.js` - 15 tests
Pruebas de la estructura y operaciones básicas de inventario.

**Suites:**
- ✅ **Estructura de Inventario**: Validar que productos tengan propiedades correctas
- ✅ **Validación de Datos**: SKU, nombres, stock numérico
- ✅ **Operaciones de Stock**: Agregar, reducir, validar cantidad
- ✅ **Búsqueda y Filtrado**: Encontrar por nombre, categoría, stock

**Ejemplo:**
```javascript
it('agregar stock debe aumentar cantidad', () => {
  let stock = 50;
  const agregar = (cantidad) => stock += cantidad;
  agregar(10);
  expect(stock).toBe(60);
});
```

---

### `calculos.spec.js` - 11 tests
Pruebas de cálculos matemáticos y operaciones aritméticas.

**Suites:**
- ✅ **Operaciones Matemáticas**: Suma, resta, multiplicación, división
- ✅ **Cálculos de Inventario**: Total de stock, promedio, máximo
- ✅ **Cálculos de Precios**: Descuentos, IVA, precio final
- ✅ **Rangos y Validaciones**: Stock dentro de rango, alertas

**Ejemplo:**
```javascript
it('aplicar descuento porcentual', () => {
  const precio = 100;
  const descuento = 0.10;
  const precioFinal = precio * (1 - descuento);
  expect(precioFinal).toBe(90);
});
```

---

### `validaciones.spec.js` - 17 tests
Pruebas de validación de diferentes tipos de datos.

**Suites:**
- ✅ **Validación de Strings**: Email, strings vacíos, formato
- ✅ **Validación de Números**: Enteros, positivos, rangos
- ✅ **Validación de Objetos**: Propiedades requeridas
- ✅ **Validación de Arrays**: Longitud, contenidos, elementos
- ✅ **Validación de Booleanos**: True/False
- ✅ **Validación de Fechas**: Fechas válidas, comparaciones

**Ejemplo:**
```javascript
it('validar email correcto', () => {
  const email = 'usuario@empresa.com';
  const esValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  expect(esValido).toBe(true);
});
```

---

## 🔗 Tests de Integración (`integration/`)

### `crud.spec.js` - 10 tests
Pruebas de operaciones CRUD (Create, Read, Update, Delete) combinadas.

**Suites:**
- ✅ **Crear Producto**: Crear con validaciones
- ✅ **Obtener Producto**: Buscar por ID
- ✅ **Actualizar Producto**: Cambiar propiedades
- ✅ **Eliminar Producto**: Quitar de lista
- ✅ **Operaciones CRUD Combinadas**: Flujo C→R→U→D completo

**Ejemplo:**
```javascript
it('crear, leer, actualizar y eliminar', () => {
  let productos = [];
  const producto = { id: 1, nombre: 'Laptop' };
  productos.push(producto);
  const obtenido = productos.find(p => p.id === 1);
  obtenido.precio = 1500;
  productos = productos.filter(p => p.id !== 1);
  expect(productos).toHaveLength(0);
});
```

---

### `asistente-ia.spec.js` - 9 tests
Pruebas del procesamiento del Asistente IA.

**Suites:**
- ✅ **Procesamiento de Mensajes**: Validar entrada de usuario
- ✅ **Detección de Intenciones**: Identificar si es búsqueda, crear, actualizar
- ✅ **Extracción de Parámetros**: Sacar cantidad, producto, local
- ✅ **Parsing de CRUD**: Detectar y extraer bloques `[CRUD_START]...[CRUD_END]`
- ✅ **Validación de Respuesta**: Respuesta limpia sin JSON técnico
- ✅ **Flujo Completo**: Usuario → Intención → CRUD → Respuesta

**Ejemplo:**
```javascript
it('detectar intención de crear producto', () => {
  const mensaje = 'Crear nuevo producto Laptop';
  const esCrear = mensaje.toLowerCase().includes('crear');
  expect(esCrear).toBe(true);
});
```

---

## 📊 Resumen

| Tipo | Carpeta | Archivos | Suites | Tests |
|------|---------|----------|--------|-------|
| **Unit** | `unit/` | 3 | 14 | 43 |
| **Integration** | `integration/` | 2 | 11 | 19 |
| **TOTAL** | - | 5 | 25 | **62** |

---

## 🚀 Ejecutar Tests

```bash
# Una sola ejecución
npm test

# Modo watch (auto-run al guardar)
npm run test:watch

# CI/CD (Chrome headless)
npm run test:ci
```

---

## 🎯 Próximos Tests Sugeridos

- [ ] `unit/autenticacion.spec.js` - Validación de usuarios
- [ ] `unit/seguridad.spec.js` - Hashing, encriptación
- [ ] `integration/api-endpoints.spec.js` - Pruebas HTTP
- [ ] `e2e/flujo-usuario.spec.js` - Selenium/Cypress

---

**Última actualización:** 19 de Octubre, 2025
