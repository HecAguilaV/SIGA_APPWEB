<div align="center">
  <img src="./static/brand/Logo_SIGA.png" alt="SIGA Logo" width="200"/>
  
  # SIGA - Sistema Inteligente de Gestión de Activos

  [![Estado](https://img.shields.io/badge/estado-MVP-brightgreen)](https://github.com/HecAguilaV/SIGA_APPWEB)
  [![Licencia](https://img.shields.io/badge/licencia-MIT-blue)](./LICENSE)
  [![Node.js](https://img.shields.io/badge/node.js-18+-green)](https://nodejs.org/)
  [![Tests](https://img.shields.io/badge/tests-10%2F10-success)](./COBERTURA_TESTING.md)

  ### 🚀 Tecnologías

  <p>
    <img src="https://img.shields.io/badge/Svelte-FF3E00?style=for-the-badge&logo=svelte&logoColor=white" alt="Svelte"/>
    <img src="https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white" alt="SvelteKit"/>
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
    <img src="https://img.shields.io/badge/Bulma-00D1B2?style=for-the-badge&logo=bulma&logoColor=white" alt="Bulma"/>
  </p>

  <p>
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"/>
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white" alt="Chart.js"/>
    <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger"/>
    <img src="https://img.shields.io/badge/Jasmine-8A4182?style=for-the-badge&logo=jasmine&logoColor=white" alt="Jasmine"/>
    <img src="https://img.shields.io/badge/Karma-56C5A8?style=for-the-badge&logo=karma&logoColor=white" alt="Karma"/>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"/>
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
    <img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI"/>
  </p>

  ---

</div>

SIGA (Sistema Inteligente de Gestión de Activos) es un prototipo MVP de aplicación web ERP construido con **SvelteKit 5**, diseñado para simplificar y automatizar el control de inventario en tiempo real con asistencia de **IA conversacional**.

## 📋 Descripción

Este proyecto es una aplicación moderna de página única (SPA) que permite a los usuarios gestionar productos, visualizar el stock por local y analizar datos de ventas. La interfaz es reactiva y cuenta con un **asistente virtual con voz** potenciado por **Gemini 2.5 Pro API**, que permite operaciones CRUD mediante comandos de voz o texto en lenguaje natural.

### ✨ Características destacadas

- **Asistente IA con voz**: Reconocimiento de voz en español para operaciones CRUD
- **Procesamiento en lenguaje natural**: Entiende comandos contextuales e incompletos
- **Visualización en tiempo real**: Gráficos interactivos con Chart.js
- **Estado compartido**: Sincronización automática entre todos los componentes
- **API REST documentada**: Especificación OpenAPI/Swagger integrada

## 🎯 Características

### Gestión de Productos
- Crear, editar y desactivar productos
- Control de estado activo/inactivo
- Validación automática de datos

### Control de Inventario
- Visualización del stock de productos por local
- Filtrado avanzado por local, producto, categoría y stock
- Operaciones de agregar/reducir stock
- Actualización en tiempo real

### Análisis de Datos
- Gráficos interactivos para analizar tendencias de ventas
- Visualización de stock por local
- Dashboard con métricas clave

### Asistente Virtual con IA
- Reconocimiento de voz en español (Web Speech API)
- Entrada multimodal: voz, texto y teclado
- Procesamiento con Gemini 2.5 Pro
- Operaciones CRUD automáticas mediante lenguaje natural
- Panel flotante draggable con interfaz intuitiva

### API Documentada
- Documentación OpenAPI/Swagger en `/api-docs`
- Endpoints REST para todas las operaciones
- Respuestas JSON estructuradas

## 🛠️ Tecnologías Utilizadas

| Categoría | Tecnología | Versión | Uso |
|-----------|-----------|---------|-----|
| **Framework** | SvelteKit | 5.0+ | Framework principal |
| **Build Tool** | Vite | 5.0+ | Compilación y dev server |
| **UI Framework** | Bulma | 1.0+ | Estilos y componentes CSS |
| **Gráficos** | Chart.js | 4.4+ | Visualización de datos |
| **IA** | Gemini 2.5 Pro | API | Procesamiento de lenguaje natural |
| **Voz** | Web Speech API | Nativa | Reconocimiento de voz |
| **Testing** | Karma + Jasmine | 6.4.2 + 5.1.0 | Tests unitarios e integración |
| **Lenguaje** | JavaScript/TypeScript | ES2020+ | Desarrollo |
| **Despliegue** | Vercel | Serverless | Hosting y CI/CD |

## 🚀 Instalación y Ejecución

### Requisitos previos

- Node.js 18 o superior ([Descargar](https://nodejs.org/))
- npm 9+ (incluido con Node.js)
- Git para clonar el repositorio

### Pasos de instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/HecAguilaV/SIGA_APPWEB.git
   cd SIGA_APPWEB
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   
   Crea un archivo `.env.local` en la raíz del proyecto:
   ```bash
   VITE_GEMINI_API_KEY=tu_clave_api_de_gemini
   ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   
   La aplicación estará disponible en `http://localhost:5173`

## 📝 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo en `http://localhost:5173` |
| `npm run build` | Compila la aplicación para producción |
| `npm run preview` | Previsualiza la compilación de producción |
| `npm run check` | Realiza un chequeo de tipos con `svelte-check` |
| `npm test` | Ejecuta los tests unitarios y de integración (10 tests) |
| `npm run test:watch` | Ejecuta tests en modo watch (continuo) |

### Resultado esperado de tests

```
✅ TOTAL: 10 SUCCESS
```

Ver [COBERTURA_TESTING.md](./COBERTURA_TESTING.md) para detalles completos de los tests.

## 📁 Estructura del Proyecto

```
SIGA_PROTOTIPO/
├── src/
│   ├── lib/
│   │   ├── components/              # Componentes reutilizables de Svelte
│   │   │   ├── AsistenteContextual.svelte
│   │   │   ├── TablaInventario.svelte
│   │   │   ├── GraficoBarras.svelte
│   │   │   └── Mensaje.svelte
│   │   ├── datosSimulados.js        # Datos de ejemplo para desarrollo
│   │   ├── estado-compartido.js     # Estado global de la aplicación
│   │   ├── openapi-spec.js          # Especificación OpenAPI
│   │   └── openapi.js               # Utilidades OpenAPI
│   │
│   ├── routes/                      # Páginas y endpoints de la API
│   │   ├── +page.svelte             # Página principal (Inventario)
│   │   ├── +layout.svelte           # Layout principal
│   │   ├── acerca/                  # Página "Acerca de"
│   │   ├── analisis/                # Página de análisis
│   │   ├── asistente/               # Página del asistente
│   │   ├── api-docs/                # Documentación OpenAPI/Swagger
│   │   └── api/                     # Endpoints de la API REST
│   │       ├── chat/                # POST - Procesamiento IA
│   │       ├── productos/
│   │       │   ├── crear/           # POST - Crear producto
│   │       │   ├── editar/          # PUT - Editar producto
│   │       │   └── eliminar/        # DELETE - Eliminar producto
│   │       ├── inventario/
│   │       │   └── actualizar/      # POST - Actualizar stock
│   │       └── openapi/             # GET - Especificación OpenAPI
│   │
│   ├── tests/                       # Tests unitarios e integración
│   │   ├── unit/                    # Tests unitarios
│   │   │   ├── inventario.spec.js
│   │   │   ├── validaciones.spec.js
│   │   │   └── calculos.spec.js
│   │   ├── integration/             # Tests de integración
│   │   │   ├── crud.spec.js
│   │   │   ├── asistente-ia.spec.js
│   │   │   └── swagger-api.spec.js
│   │   ├── README.md
│   │   └── example.spec.js
│   │
│   ├── app.html                     # Template HTML principal
│   └── app.css                      # Estilos globales
│
├── static/                          # Archivos estáticos
│   ├── brand/                       # Recursos de marca
│   └── favicon/                     # Favicons
│
├── coverage/                        # Reportes de cobertura de tests
├── test-results/                    # Resultados de tests en XML
├── node_modules/                    # Dependencias instaladas
├── .svelte-kit/                     # Cache de compilación de SvelteKit
│
├── package.json                     # Dependencias y scripts npm
├── karma.conf.cjs                   # Configuración de Karma
├── vite.config.js                   # Configuración de Vite
├── svelte.config.js                 # Configuración de SvelteKit
├── tsconfig.json                    # Configuración de TypeScript
├── ERS.md                           # Especificación de requisitos
├── COBERTURA_TESTING.md             # Cobertura de tests
└── README.md                        # Este archivo
```

## 🤖 Asistente IA - Cómo funciona

### Flujo de interacción

El asistente virtual permite realizar operaciones mediante comandos en lenguaje natural:

**Ejemplo 1 - Consulta:**
```
Usuario: "¿En qué locales no hay rollos de canela?"
IA: "No hay rollos de canela en Local Ibáñez y Local Serena"
```

**Ejemplo 2 - Operación CRUD:**
```
Usuario: "Agrega 3 y 3"
IA: Interpreta "3 unidades en Ibáñez y 3 en Serena"
    → Ejecuta operación CRUD automáticamente
    → Actualiza la tabla en tiempo real
```

### Procesamiento backend

1. Recibe mensaje del usuario en `/api/chat`
2. Construye contexto RAG con el inventario actual
3. Envía consulta a Gemini 2.5 Pro API
4. Parsea la respuesta buscando operaciones `[CRUD_START]...[CRUD_END]`
5. Ejecuta las operaciones en los endpoints correspondientes
6. Actualiza el estado compartido `datosGlobales`
7. Devuelve respuesta limpia al usuario (sin JSON técnico)

### Características del asistente

- **Reconocimiento de voz** en español (Web Speech API)
- **Entrada multimodal**: voz, texto o teclado
- **Panel draggable** que no interfiere con la UI
- **Auto-focus** en el input después de cada mensaje
- **Procesamiento contextual** que entiende referencias implícitas

## 🌐 API REST

La API del proyecto está documentada utilizando la especificación OpenAPI y puede ser visualizada en la ruta `/api-docs`.

### Endpoints principales

#### POST `/api/chat`
Procesa mensajes del usuario con IA.

**Request:**
```json
{
  "mensaje": "Agrega 5 laptops en Local Centro"
}
```

**Response:**
```json
{
  "respuesta": "He agregado 5 laptops en Local Centro",
  "datos": { /* datos actualizados */ }
}
```

#### POST `/api/productos/crear`
Crea un nuevo producto.

**Request:**
```json
{
  "nombre": "Laptop HP",
  "categoria": "Electrónica",
  "sku": "LAP-HP-001"
}
```

#### POST `/api/inventario/actualizar`
Actualiza el stock de un producto.

**Request:**
```json
{
  "producto": "Laptop",
  "local": "Centro",
  "cantidad": 5,
  "operacion": "agregar"
}
```

Ver documentación completa en `/api-docs` cuando la aplicación esté corriendo.

## 🧪 Testing

Para ejecutar los tests, utiliza el siguiente comando:

```bash
npm test
```

Esto ejecutará los 10 tests (unitarios e integración) utilizando Karma y Jasmine.

### Suite de tests

**Tests unitarios (`unit/`):**
- Validación de inventario
- Validaciones de entrada de datos
- Cálculos de stock y precios

**Tests de integración (`integration/`):**
- Operaciones CRUD completas
- Flujos del asistente IA
- Endpoints de API REST

### Configuración de tests

- **Runner**: Karma 6.4.2
- **Framework**: Jasmine 5.1.0
- **Reporter**: `kjhtml` (muestra describe agrupados)
- **Browser**: ChromeHeadless (automatizado)

### Modo watch

Para ejecutar tests en modo continuo (watch):

```bash
npm run test:watch
```

Los tests se volverán a ejecutar automáticamente cuando detecten cambios en el código.

### Documentación de tests

Para más información sobre la estrategia de testing y cobertura, consulta:
- [COBERTURA_TESTING.md](./COBERTURA_TESTING.md) - Cobertura completa

## 🐛 Troubleshooting

### Error: "npm not found"
```bash
# Descarga e instala Node.js desde https://nodejs.org/
```

### Error: "Port 5173 already in use"
```bash
# En macOS/Linux
lsof -i :5173
kill -9 <PID>

# En Windows (PowerShell)
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Error: "Chrome not found" al ejecutar tests
```bash
# Instala Google Chrome desde https://www.google.com/chrome/
```

### Tests no ejecutan en watch mode
```bash
# Reinstala dependencias
rm -rf node_modules package-lock.json
npm install
```

## 📚 Documentación adicional

- **[ERS.md](./ERS.md)** - Especificación de Requisitos del Sistema
- **[COBERTURA_TESTING.md](./COBERTURA_TESTING.md)** - Cobertura y estrategia de testing

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para contribuir:

1. Haz un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](./LICENSE) para más detalles.

## 👥 Autor

- **Héctor Aguila** - [HecAguilaV](https://github.com/HecAguilaV)
- Estudiante de Ingeniería Informática - **Duoc UC**
- Puerto Montt



Este proyecto está en desarrollo con el siguiente stack:
- [SvelteKit](https://kit.svelte.dev/) - Framework web moderno
- [Gemini 2.5 Pro](https://ai.google.dev/) - API de IA de Google
- [Bulma](https://bulma.io/) - Framework CSS
- [Chart.js](https://www.chartjs.org/) - Gráficos interactivos
- [Jasmine](https://jasmine.github.io/) + [Karma](https://karma-runner.github.io/) - Testing

---

**Estado del proyecto:** ✅ MVP Completo - 10/10 Tests Pasando  
**Versión:** 1.0.0  
**Última actualización:** Octubre 2025

Desarrollado por "Un Soñador con Poca RAM 🧑🏼‍💻" - **SIGA**
