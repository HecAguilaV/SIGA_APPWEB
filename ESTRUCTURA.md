# 📁 ESTRUCTURA DEL PROYECTO - SIGA

Guía de carpetas y archivos principales del proyecto.

---

## 🗂️ Estructura de Carpetas

```
SIGA-PROTOTIPO/
├── 📄 SIGA.bat                      ← PUNTO DE ENTRADA (menú principal)
├── 📄 build.bat                     ← Build para producción (Vercel)
├── 📄 README.md                     ← Instrucciones principales
├── 📄 ESTRUCTURA.md                 ← Este archivo
├── 📄 TESTING_SIMPLE.md             ← Guía de testing
│
├── 🧪 src/tests/                    ← TESTS (35+ tests)
│   ├── unit/
│   │   ├── inventario.spec.js       ✅ Tests de inventario [UNIT]
│   │   ├── calculos.spec.js         ✅ Tests de cálculos [UNIT]
│   │   └── validaciones.spec.js     ✅ Tests de validaciones [UNIT]
│   └── integration/
│       ├── crud.spec.js             ✅ Tests de CRUD [INTEGRATION]
│       └── asistente-ia.spec.js     ✅ Tests de IA [INTEGRATION]
│
├── 🎨 src/routes/                   ← PÁGINAS Y ENDPOINTS
│   ├── +page.svelte                 ✅ Página principal (inventario)
│   ├── +layout.svelte               ✅ Layout global
│   ├── api-docs/
│   │   └── +page.svelte             ✅ Swagger (documentación API)
│   └── api/
│       ├── productos/
│       │   └── crear/
│       │       └── +server.js        ✅ Endpoint: POST /api/productos/crear
│       ├── inventario/
│       │   └── actualizar/
│       │       └── +server.js        ✅ Endpoint: PUT /api/inventario/actualizar
│       └── openapi/
│           └── +server.js            ✅ Endpoint: GET /api/openapi (spec)
│
├── 🧠 src/lib/                      ← LIBRERÍAS Y UTILIDADES
│   ├── estado-compartido.js         ✅ Estado global (Svelte store)
│   ├── openapi.js                   ✅ Especificación OpenAPI
│   ├── components/
│   │   ├── Panel.svelte             ✅ Panel de IA (flotante, draggable)
│   │   ├── TablaInventario.svelte   ✅ Tabla de productos
│   │   ├── Navbar.svelte            ✅ Barra de navegación
│   │   └── Footer.svelte            ✅ Pie de página
│   └── stores/
│       └── inventario.js            ✅ Store de inventario
│
├── ⚙️ Configuración
│   ├── package.json                 ✅ Dependencias y scripts
│   ├── karma.conf.cjs               ✅ Config Karma (tests)
│   ├── babel.config.js              ✅ Config Babel (transpilación)
│   ├── vite.config.js               ✅ Config Vite (bundler)
│   ├── svelte.config.js             ✅ Config SvelteKit
│   ├── tsconfig.json                ✅ Config TypeScript
│   ├── jsconfig.json                ✅ Config JavaScript
│   └── .env.local                   ✅ Variables de entorno (no versionado)
│
├── 📚 Documentación
│   ├── README.md                    ✅ Start here
│   ├── ESTRUCTURA.md                ✅ Este archivo
│   ├── TESTING_SIMPLE.md            ✅ Guía de testing
│   ├── TESTING.md                   ⚠️ Referencia técnica (antigua)
│   ├── GUIA_TESTING_JUNIOR.md       ⚠️ Guía educativa (antigua)
│   ├── SWAGGER.md                   ⚠️ API docs (antigua)
│   └── EJECUTAR_LOCALMENTE.md       ⚠️ Setup (antigua)
│
└── 🔧 Otros
    ├── .git/                        ← Control de versiones
    ├── .github/                     ← GitHub workflows (si hay)
    ├── node_modules/                ← Dependencias (auto-generado)
    ├── .svelte-kit/                 ← Build cache (auto-generado)
    ├── build/                       ← Build producción (auto-generado)
    └── .gitignore                   ← Archivos ignorados por Git
```

---

## 🎯 Archivos Importantes

### **Punto de Entrada**
- **`SIGA.bat`** → Menú principal (dev, tests, build, install)
  - Doble-click aquí para todo
  - Opción 1: Tests
  - Opción 2: Dev server
  - Opción 3: Build producción
  - Opción 4: Install dependencias

### **Testing**
- **`src/tests/unit/`** → Tests de lógica individual
- **`src/tests/integration/`** → Tests de flujos completos
- **`karma.conf.cjs`** → Configuración de test runner
- **`babel.config.js`** → Transpilación para tests

### **API y Documentación**
- **`src/routes/api/`** → Endpoints CRUD
- **`src/routes/api-docs/`** → Swagger UI
- **`src/lib/openapi.js`** → Especificación OpenAPI

### **Frontend**
- **`src/routes/+page.svelte`** → UI principal
- **`src/lib/components/`** → Componentes reutilizables
- **`src/lib/estado-compartido.js`** → Estado global

---

## 📊 Scripts Disponibles

```bash
npm run dev              # Dev server (http://localhost:5173)
npm run build           # Build producción
npm run test:ci         # Tests (headless)
npm run test            # Tests (con Chrome interactivo)
npm run test:watch      # Tests (auto-ejecuta al cambiar)
npm run preview         # Preview de build
npm run check           # Svelte check
```

---

## 🚀 Cómo Contribuir

### **1. Agregar un test nuevo**
```bash
1. Crear archivo: src/tests/unit/mi-test.spec.js
2. Escribir tests con Jasmine
3. Ejecutar: npm run test:ci
4. Commit y push
```

### **2. Agregar un componente nuevo**
```bash
1. Crear: src/lib/components/MiComponente.svelte
2. Importar en +page.svelte o donde sea necesario
3. Probar localmente: npm run dev
4. Commit y push
```

### **3. Agregar un endpoint nuevo**
```bash
1. Crear: src/routes/api/mi-endpoint/+server.js
2. Documentar en: src/lib/openapi.js
3. Probar en Swagger: http://localhost:5173/api-docs
4. Commit y push
```

---

## 📝 Notas

- **Archivos antiguos:** TESTING.md, GUIA_TESTING_JUNIOR.md, SWAGGER.md, EJECUTAR_LOCALMENTE.md son referencia. Usa TESTING_SIMPLE.md.
- **Vercel:** Auto-deploya desde main. El build.bat es para CI/CD local.
- **Dependencias:** Node.js v20.11.0 (fijo en SIGA.bat)
- **Gestión de estado:** Usa `estado-compartido.js` para estado global

---

## ✅ Checklist para Nuevos Devs

- [ ] ¿Entiendes la estructura?
- [ ] ¿Sabes dónde van los tests?
- [ ] ¿Sabes dónde van los componentes?
- [ ] ¿Sabes ejecutar SIGA.bat?
- [ ] ¿Sabes que 35+ tests pasan?

**¡Listo!** 🎯
