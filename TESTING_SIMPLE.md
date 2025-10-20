# 🧪 TESTING - SIGA Prototipo

## 📋 Resumen

Hay **1 tipo de test real** + **1 documentación interactiva**:

### 1️⃣ **TEST REAL: Jasmine & Karma** ✅
**¿Qué prueba?** Lógica de negocio (inventario, CRUD, validaciones)
**¿Cuántos?** ~35 tests unitarios + integración
**¿Cómo ejecutar?**
```bash
npm run test:ci
```
**Resultado esperado:** `TOTAL: 35+ SUCCESS`

**Ubicación de tests:**
- `src/tests/unit/` → Tests de componentes individuales
- `src/tests/integration/` → Tests de flujos completos

---

### 2️⃣ **NO ES TEST: Swagger API Docs** 📖
**¿Qué es?** Documentación interactiva (no es un test)
**¿Dónde?** `http://localhost:5173/api-docs`
**¿Cómo acceder?**
```bash
npm run dev
```
Luego abre navegador en: `http://localhost:5173/api-docs`

**Para qué sirve:**
- Ver todos los endpoints disponibles
- Probar endpoints directamente desde el navegador
- Documentación automática de APIs

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
- [ ] ¿Swagger funciona? → Abre `/api-docs` en el navegador (es solo documentación, no test)
- [ ] ¿Cada test es claro? → Nombres con prefijos descriptivos
- [ ] ¿Entiendes cada test? → Lean, enfocados, fáciles de mantener

---

**Fin. Un tipo de test. Documentación clara. Defendible.** 🎯
