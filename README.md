# SIGA - Sistema Inteligente de Gestión de Activos

MVP interactivo para SIGA, construido con **SvelteKit 5**, **Gemini 2.5 Pro**, **Bulma CSS** y **Chart.js**. Incluye gestión de inventario en tiempo real, IA conversacional con voz, y operaciones CRUD automáticas.

## ✨ Características principales

### 🎙️ Asistente Inteligente con Voz
- **Entrada multimodal**: Voz (español-ES) + texto + teclado
- **Procesamiento natural**: Entiende frases incompletas y contexto
- **Operaciones CRUD automáticas**: Crear productos, agregar/reducir stock
- **Panel flotante draggable**: 320x450px con soporte Enter key
- **Auto-focus**: Cursor permanece en input después de enviar

### 📊 Gestión de Inventario
- Tabla reactiva con actualización en tiempo real
- Filtrado por local, producto, categoría y stock
- Ordenamiento multicampo
- Estado compartido entre todos los endpoints

### 🧠 Backend inteligente
- **Gemini 2.5 Pro API** con contexto completo de inventario
- **Endpoints CRUD** con fuzzy matching
- **Estado centralizado** sincroniza todos los servicios

## 🧰 Tecnologías

| Capa | Tecnología |
|------|-----------|
| **Frontend** | SvelteKit 5 + Vite + Bulma CSS |
| **Backend** | Node.js + SvelteKit endpoints |
| **IA** | Gemini 2.5 Pro API |
| **Voz** | Web Speech API (reconocimiento español) |
| **Visualizaciones** | Chart.js |
| **Estado** | Svelte stores + shared state |
| **Despliegue** | Vercel Serverless Functions |

## 🚀 Puesta en marcha rápida

### ⚡ Comandos principales

```bash
# Setup inicial
npm install

# Iniciar servidor de desarrollo
npm run dev                 # http://localhost:5173

# Ejecutar tests
npm test                    # Jasmine + Karma (10/10 tests)

# Compilar para producción
npm run build
```

---

### 📋 Todos los comandos disponibles

| Comando | Descripción |
|---------|------------|
| `npm run dev` | Servidor desarrollo en localhost:5173 |
| `npm test` | Ejecuta tests UNA VEZ (10 tests) |
| `npm run test:watch` | Ejecuta tests en modo watch continuo |
| `npm run build` | Compila para producción |
| `npm run preview` | Vista previa del build compilado |
| `npm run check` | Verifica tipos TypeScript |

---

## 📁 Estructura del proyecto

```
SIGA_PROTOTIPO/
├── 📄 package.json             ← Dependencias
├── 📄 karma.conf.cjs           ← Configuración tests
├── 📄 README.md                ← Este archivo
├── 📄 ERS.md                   ← Especificación requisitos
├── 📄 COBERTURA_TESTING.md     ← Cobertura tests
│
├── 🧪 src/tests/               ← 10 Tests Jasmine
│   ├── unit/                   (inventario, validaciones)
│   └── integration/            (CRUD, asistente IA)
│
├── 🎨 src/routes/              ← Páginas y Endpoints
│   ├── +page.svelte            (Inventario - tabla principal)
│   └── api/                    (Endpoints CRUD)
│
└── 🧠 src/lib/                 ← Lógica compartida
    ├── components/             (Componentes reutilizables)
    └── stores/                 (Svelte stores)
```

## 🤖 Cómo funciona la IA

### Flujo de entrada
```
Usuario: "¿En qué locales no hay rollos de canela?"
IA: "No hay rollos de canela en Ibáñez y Serena"

Usuario: "Agrega 3 y 3"
IA: Interpreta "3 en Ibáñez y 3 en Serena"
    → Crea CRUD automático
    → Actualiza tabla en tiempo real
```

### Procesamiento backend
1. Recibe mensaje en `/api/chat`
2. Construye contexto RAG con inventario actual
3. Consulta Gemini 2.5 Pro
4. Parsea respuesta buscando `[CRUD_START]...[CRUD_END]`
5. Ejecuta operaciones en endpoints dedicados
6. Actualiza `datosGlobales` (shared state)
7. Devuelve respuesta limpia sin JSON técnico

## 📊 Endpoints API

### `POST /api/chat` - Procesamiento inteligente
Entrada: `{ "mensaje": "string" }`
Salida: `{ "respuesta": "string", "datos": {...} }`

### `POST /api/productos/crear` - Crear producto
Entrada: `{ "nombre": "...", "categoria": "...", "sku": "..." }`
Salida: `{ "success": true, "producto": {...}, "datos": {...} }`

### `POST /api/inventario/actualizar` - Actualizar stock
Entrada: `{ "producto": "...", "local": "...", "cantidad": 5, "operacion": "agregar"|"reducir" }`
Salida: `{ "success": true, "stockAnterior": 10, "stockNuevo": 15, "datos": {...} }`

## ☁️ Despliegue en Vercel

### 1. Preparar repo
```bash
git add .
git commit -m "MVP: Full CRUD + Voice + Real-time updates"
git push origin main
```

### 2. Conectar Vercel
- Ir a https://vercel.com/new
- Importar repo desde GitHub
- Agregar variable de entorno: `GEMINI_API_KEY=AIzaSyAcxjnWp0d3yy7ev-Iup1RQogCqOLu4qzY`
- Deploy

### 3. Validar
- Abrir URL del deploy
- Probar: escribir "crear producto test" en el asistente
- Verificar que tabla se actualiza

## 🧪 Testing

Tests con **Jasmine** y **Karma** para validar lógica (10/10 tests):

```bash
# Ejecutar tests UNA VEZ
npm test

# Ejecutar tests en modo watch (se ejecutan con cada cambio)
npm run test:watch
```

**✅ Resultado esperado:** `TOTAL: 10 SUCCESS`

**📚 Documentación de tests:**
- **[COBERTURA_TESTING.md](./COBERTURA_TESTING.md)** - Cobertura completa de tests

## 🎯 Roadmap futuro

- [ ] Historial de conversación (memoria contexto)
- [ ] localStorage para persistencia entre sesiones
- [ ] Confirmación de operaciones destructivas
- [ ] Undo/redo CRUD
- [ ] Auditoría de cambios con timestamps
- [ ] Exportar inventario a CSV/PDF
- [ ] Imágenes de productos
- [ ] Multi-idioma

## 📝 Licencia

MIT - Libre para uso comercial y modificación

---

**Desarrollado con ❤️ para SIGA** | MVP v1.0 | Octubre 2025
