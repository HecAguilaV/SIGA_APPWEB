# SIGA - Sistema Inteligente de Gestión de Almacenes

MVP interactivo y profesional para SIGA, construido con **SvelteKit 5**, **Gemini 2.5 Pro**, **Bulma CSS** y **Chart.js**. Incluye gestión de inventario en tiempo real, IA conversacional con voz, y operaciones CRUD automáticas.

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

## 🚀 Puesta en marcha local

### Opción 1: Usando SIGA.bat (RECOMENDADO - Windows)
```bash
Doble-click en: SIGA.bat
Luego elige:
  1. Ejecutar Tests
  2. Iniciar Servidor Local
  3. Build para Producción
  4. Instalar Dependencias
```

### Opción 2: Comandos manuales
```bash
# Instalar dependencias
npm install

# Crear archivo .env.local en la raíz
echo "VITE_GEMINI_API_KEY=AIzaSyAcxjnWp0d3yy7ev-Iup1RQogCqOLu4qzY" > .env.local
echo "GEMINI_API_KEY=AIzaSyAcxjnWp0d3yy7ev-Iup1RQogCqOLu4qzY" >> .env.local

# Iniciar servidor de desarrollo
npm run dev

# Ejecutar tests
npm run test:ci
```

Acceder en: `http://localhost:5173`

## 📁 Estructura del proyecto

```
SIGA_PROTOTIPO/
├── src/
│   ├── routes/
│   │   ├── +page.svelte              # Inventario (tabla reactiva)
│   │   ├── analisis/+page.svelte     # Análisis con gráficos
│   │   └── api/
│   │       ├── chat/+server.js       # IA con RAG context
│   │       ├── productos/crear/+server.js
│   │       └── inventario/actualizar/+server.js
│   ├── lib/
│   │   ├── components/AsistenteContextual.svelte
│   │   ├── estado-compartido.js      # Estado centralizado
│   │   └── datosSimulados.js
│   └── app.css
├── .env.local
└── README.md
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

Tests con **Jasmine** y **Karma** para validar lógica (35+ tests):

```bash
# Opción 1: Usando SIGA.bat (Windows)
SIGA.bat → Opción 1

# Opción 2: Comando manual
npm run test:ci
```

**📚 Documentación:**
- `TESTING_SIMPLE.md` - Guía rápida (1 tipo de test)
- `src/tests/unit/` - Tests unitarios (inventario, validaciones, cálculos)
- `src/tests/integration/` - Tests de flujos completos (CRUD)

**✅ Resultado esperado:** `TOTAL: 35+ SUCCESS`

## 📖 Swagger API Documentation

Documentación interactiva de endpoints:

```bash
# Opción 1: Usando SIGA.bat
SIGA.bat → Opción 2 → http://localhost:5173/api-docs

# Opción 2: Comando manual
npm run dev → http://localhost:5173/api-docs
```

**Endpoints disponibles:**
- `POST /api/productos/crear` - Crear producto
- `PUT /api/inventario/actualizar` - Actualizar stock
- `GET /api/openapi` - Especificación OpenAPI

Ver documentación interactiva de APIs:

```bash
npm run dev
# Abrir en navegador: http://localhost:5173/api-docs
```

Swagger UI muestra todos los endpoints, parámetros y permite probar directamente.

**📚 Documentación:**
- `SWAGGER.md` - Guía de uso de Swagger UI
- OpenAPI spec: `/api/swagger.json`

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
