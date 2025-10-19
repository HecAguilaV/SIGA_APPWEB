# 🧪 TESTING - SIGA Prototipo

## 📋 Resumen

Hay **2 tipos de tests** principales:

### 1️⃣ **Test: Jasmine & Karma** ✅
**¿Qué prueba?** Lógica de negocio (inventario, CRUD, validaciones)
**¿Cuántos?** ~35 tests
**¿Cómo ejecutar?**
```bash
npm run test:ci
```
**Resultado esperado:** `TOTAL: 35+ SUCCESS`

**Ubicación de tests:**
- `src/tests/unit/` → Tests de componentes individuales
- `src/tests/integration/` → Tests de flujos completos

---

### 2️⃣ **Test: Swagger API Docs** 📖
**¿Qué prueba?** Documentación de endpoints (crear producto, actualizar stock, etc.)
**¿Dónde?** `http://localhost:5173/api-docs`
**¿Cómo acceder?**
```bash
npm run dev
```
Luego abre navegador en: `http://localhost:5173/api-docs`

**Endpoints documentados:**
- `POST /api/productos/crear` - Crear nuevo producto
- `PUT /api/inventario/actualizar` - Actualizar stock
- `GET /api/openapi` - Especificación OpenAPI

---

## 🚀 Scripts Disponibles

```bash
npm run test:ci          # Ejecuta tests (sin interfaz gráfica)
npm test                 # Ejecuta tests (con Chrome interactivo)
npm run dev              # Inicia servidor local (puerto 5173)
npm run build            # Build para producción
```

## 🎓 Nombres de Tests

Los tests tienen prefijos para identificar su tipo:

- `[UNIT]` → Test unitario (prueba un componente)
- `[INTEGRATION]` → Test de integración (prueba flujos completos)
- `[CREATE]` → Crea algo
- `[VALIDATE]` → Valida datos
- `[SEARCH]` → Busca/filtra
- `[UPDATE]` → Actualiza algo
- `[DELETE]` → Elimina algo

**Ejemplo:**
```javascript
it('[UNIT] [CREATE] Producto debe tener nombre y SKU', () => {
  // Test aquí
});
```

---

## ✅ Checklist para Dev Trainer

- [ ] ¿Tests pasando? → `npm run test:ci` debe mostrar "TOTAL: SUCCESS"
- [ ] ¿Swagger funciona? → Abre `/api-docs` en el navegador
- [ ] ¿Cada test es claro? → Nombres con prefijos descriptivos
- [ ] ¿Entiendes cada test? → Lean, enfocados, fáciles de mantener

---

**Fin. Dos tipos de tests. Limpio. Defendi­ble.** 🎯
