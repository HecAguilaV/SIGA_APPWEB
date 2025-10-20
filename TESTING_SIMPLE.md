# 🧪 TESTING - SIGA Prototipo

## 📋 Resumen

**5 Tests Principales** usando **Jasmine + Karma**

Adaptación de "Clase 8 – Jasmine + Karma" al stack SvelteKit

---

## 🎯 Los 5 Tests

### **TEST 1: Validar nombre NO vacío**
**Archivo:** `src/tests/unit/inventario.spec.js`
**Concepto:** `toThrow()` - Similar a validar contraseña no vacía
```javascript
expect(() => validarNombre("")).toThrow();
```

---

### **TEST 2: Validar SKU formato correcto (LETRAS-NÚMEROS)**
**Archivo:** `src/tests/unit/inventario.spec.js`
**Concepto:** Regex + `toThrow()` - Similar a mayúscula+número+símbolo
```javascript
expect(() => validarSKU("mouse123")).toThrow();
```

---

### **TEST 3: Validar stock POSITIVO**
**Archivo:** `src/tests/unit/inventario.spec.js`
**Concepto:** `Number.isInteger()` + `toThrow()` - Similar a número válido
```javascript
expect(() => validarStock(-5)).toThrow();
```

---

### **TEST 4: CRUD Completo (Create, Read, Update, Delete)**
**Archivo:** `src/tests/integration/crud.spec.js`
**Concepto:** Flujo completo integración
```javascript
// Crear → Leer → Actualizar → Eliminar
```

---

### **TEST 5: Validar Swagger API**
**Archivo:** `src/tests/integration/swagger-api.spec.js`
**Concepto:** `toContain()` - Similar a objeto retorna claves correctas
```javascript
expect(Object.keys(spec.paths)).toContain('/api/productos/crear');
```

---

## 🚀 Cómo Ejecutar

```bash
# Todos los tests
npm run test:ci

# Tests interactivos (modo watch)
npm run test:watch

# Tests en navegador
npm run test
```

**Resultado esperado:**
```
10 SUCCESS ✅
```

**Resultado actual (20 Oct 2025):**
```
Chrome Headless 141.0.0.0 (Windows 10): Executed 10 of 10 SUCCESS (0.001 secs / 0.004 secs)
TOTAL: 10 SUCCESS ✅
```

---

## 📊 Resumen de Tests

| Tipo | Cantidad | Archivo | Estado |
|------|----------|---------|--------|
| **Unit** | 3 | `inventario.spec.js` | ✅ |
| **Integration (CRUD)** | 1 | `crud.spec.js` | ✅ |
| **Integration (IA)** | 1 | `asistente-ia.spec.js` | ✅ |
| **Integration (Swagger)** | 1 | `swagger-api.spec.js` | ✅ |
| **TOTAL** | **5** | - | ✅ 100% PASANDO |

---

## 📖 Documentación Swagger

Después de ejecutar los tests, puedes probar la API en:

```bash
npm run dev
```

Luego abre: `http://localhost:5173/api-docs`

**Endpoints documentados:**
- `POST /api/productos/crear`
- `PUT /api/inventario/actualizar`
- `POST /api/chat` (IA)

---

## 📚 Para Entender Mejor

Lee la guía completa: **`GUIA_TESTING_JASMINE.md`**

Contiene:
- ✅ Explicación de cada test
- ✅ Matchers de Jasmine usados
- ✅ Conceptos clave
- ✅ Analogía con la guía original

---

## ✅ Checklist para Evaluación

- [x] 5 tests escritos
- [x] 0 fallos
- [x] Jasmine + Karma funcionando
- [x] Swagger API documentada
- [x] Código limpio y defendible

---

**Testing realista para segundo año de Ingeniería Informática.** 🎯
