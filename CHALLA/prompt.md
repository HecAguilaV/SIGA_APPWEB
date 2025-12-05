# Prompt de Contexto para Agente IA – SIGA_PROTOTIPO

## ¿Qué es SIGA?
SIGA (Sistema Inteligente de Gestión de Activos) es un prototipo MVP de aplicación web ERP desarrollado con SvelteKit 5. Su objetivo es simplificar y automatizar el control de inventario en tiempo real, con asistencia de IA conversacional. El sistema permite gestionar productos, visualizar stock por local, analizar datos de ventas y operar mediante comandos de voz o texto en lenguaje natural.

## Estado del Proyecto
- **Framework principal:** SvelteKit 5 (SPA)
- **Lenguajes:** JavaScript, TypeScript
- **Estilos:** Bulma, CSS personalizado
- **Gráficos:** Chart.js
- **Testing:** Karma + Jasmine (10 tests documentados y pasando)
- **Despliegue:** Vercel
- **API:** REST, documentada con OpenAPI/Swagger
- **Asistente IA:** Integrado con Gemini 2.5 Pro API (entrada por voz y texto)
- **Gestión de variables sensibles:** `.env.local` (no versionado), `.env.local.example` (plantilla)

## Estructura del Proyecto
- `/src/routes/+page.svelte`: Página principal (Inventario)
- `/src/routes/+layout.svelte`: Layout general
- `/src/lib/components/`: Componentes reutilizables (TablaInventario, AsistenteContextual, GraficoBarras, Mensaje)
- `/src/lib/datosSimulados.js`: Datos de ejemplo para desarrollo
- `/src/lib/estado-compartido.js`: Estado global
- `/src/lib/openapi-spec.js`: Especificación OpenAPI
- `/src/routes/api/`: Endpoints REST (productos, inventario, chat IA, openapi)
- `/static/brand/`: Recursos de marca (logos)
- `/static/favicon/`: Favicons y manifest
- `/tests/`: Pruebas unitarias e integración (10 tests, cobertura documentada)
- `/README.md`: Documentación completa del proyecto

## Identidad Visual
- **Colores principales:** Azul marino (#03045E), Cian (#00B4D8), Cian claro (#80FFDB), Blanco (#FFFFFF)
- **Tipografía:** Inter (headings en Bold, cuerpo en Regular)
- **Iconografía:** Phosphor-svelte (iconos modernos y lineales)

## Lógica de Negocio
- Gestión de productos (CRUD, estado activo/inactivo, validación de datos)
- Control de inventario por local (stock, operaciones de agregar/reducir, filtrado avanzado)
- Análisis de datos (gráficos de stock y ventas, dashboard)
- Asistente IA (voz/texto, comandos naturales, panel flotante, procesamiento contextual)

## Pruebas y Calidad
- 10 tests unitarios y de integración documentados en `/tests/` y `COBERTURA_TESTING.md`
- Validación de inventario, cálculos, flujos CRUD, endpoints REST y asistente IA
- Todos los tests pasan correctamente (ver README y cobertura)

## Buenas Prácticas y Seguridad
- Variables sensibles fuera del repo (`.env.local`)
- `.env.local.example` para compartir estructura de variables
- `.gitignore` actualizado
- Documentación clara en README

## Instrucciones para el Agente IA
- Sé un compañero de desarrollo y guía para el humano a cargo de SIGA.
- Antes de sugerir cambios, revisa la arquitectura y la lógica ya implementada.
- Mantén la identidad visual y la experiencia de usuario coherentes con lo existente.
- Prioriza la calidad, la seguridad y la documentación.
- Usa los tests como referencia para validar cambios y nuevas funciones.
- Si el humano pregunta por contexto, referencias o estructura, usa este archivo y el README como fuente principal.
- No propongas migraciones tecnológicas sin justificación clara y validada.
- Si el humano migra de equipo, asegúrate de que el contexto y la historia del proyecto no se pierdan.

---

**Este prompt debe ser el punto de partida para cualquier nuevo agente IA o desarrollador que se una al proyecto SIGA_PROTOTIPO.**
