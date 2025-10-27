# Guion de Defensa de Stack: SvelteKit + Bulma vs React + Bootstrap

## 1. Introducción
Este documento explica y defiende la elección del stack SvelteKit + Bulma para el desarrollo de SIGA, comparándolo de manera informada y sencilla con el stack React + Bootstrap. Incluye conceptos clave, diferencias técnicas, estructura del proyecto y fundamentos para una presentación o defensa ante docentes y compañeros.

---

## 2. ¿Por qué SvelteKit + Bulma?
- **Velocidad y eficiencia:** Svelte compila a JavaScript puro, eliminando el Virtual DOM y logrando apps más rápidas y ligeras.
- **Curva de aprendizaje:** Svelte es más directo, menos "boilerplate" y más fácil de leer para nuevos desarrolladores.
- **Estilos modernos:** Bulma es un framework CSS puro, modular y fácil de personalizar, sin depender de JavaScript ni jQuery.
- **Menos dependencias:** El bundle final es más pequeño y la app carga más rápido.

---

## 3. Comparativo SvelteKit vs React

| Característica         | SvelteKit                  | React (con Vite)         |
|-----------------------|----------------------------|--------------------------|
| Paradigma             | Compilador (compila a JS)  | Biblioteca (runtime JS)  |
| Virtual DOM           | No usa Virtual DOM         | Sí, usa Virtual DOM      |
| Sintaxis              | HTML + JS/TS + CSS juntos  | JSX (JS + HTML)          |
| Estado (state)        | Stores, variables reactivas| useState, useReducer     |
| Hooks                 | No hooks, reactividad nativa| useEffect, useMemo, etc. |
| Props                 | Directo, como variables    | Props, PropTypes         |
| Routing               | Integrado (file-based)     | React Router (extra)     |
| SSR/SSG               | Integrado                  | Next.js (extra)          |
| CSS                   | Scoped por defecto         | CSS-in-JS, CSS Modules   |
| Bundle final          | Más pequeño                | Más grande               |
| Aprendizaje           | Más sencillo               | Más verboso              |

### Hooks y Estado
- **Svelte:**
  - No existen hooks. La reactividad es automática: cualquier variable exportada o store es reactiva.
  - Ejemplo:
    ```svelte
    let count = 0;
    function increment() { count += 1; }
    ```
- **React:**
  - Usa hooks como `useState`, `useEffect` para manejar estado y efectos.
  - Ejemplo:
    ```jsx
    const [count, setCount] = useState(0);
    function increment() { setCount(count + 1); }
    ```

### Virtual DOM
- **Svelte:** No usa Virtual DOM. Compila a código eficiente que actualiza solo lo necesario.
- **React:** Usa Virtual DOM para calcular diferencias y actualizar el DOM real.

### Props
- **Svelte:** Se exportan variables en el componente hijo y se pasan como atributos.
- **React:** Se pasan como atributos y se accede vía `props`.

---

## 4. Bulma vs Bootstrap

| Característica   | Bulma                | Bootstrap             |
|------------------|----------------------|-----------------------|
| Dependencia JS   | No                   | Sí (algunos módulos)  |
| Modularidad      | Alta (importas solo lo que usas) | Menor (bundle grande) |
| Personalización  | Muy fácil            | Requiere sobrescribir |
| Sintaxis         | Clases limpias       | Clases más largas     |
| Flexbox          | 100%                 | Parcial (v4+ mejor)   |

---

## 5. Estructura del Proyecto SIGA

- `/src/routes/` — Páginas y endpoints API (routing basado en archivos)
- `/src/lib/` — Componentes reutilizables, stores, utilidades
- `/static/` — Recursos estáticos (imágenes, favicon, manifest)
- `/tests/` — Pruebas unitarias e integración
- `/app.html` — HTML base de la app
- `/vite.config.js` — Configuración de Vite (bundler y dev server)
- `/babel.config.js` — (si existe) Configuración de Babel para transpilar JS/TS
- `/package.json` — Dependencias y scripts
- `/README.md` — Documentación principal

### ¿Dónde está el tema de SIGA?
- Los colores, tipografía y estilos globales están definidos en `/static/brand/`, `/static/favicon/` y en los archivos CSS globales (por ejemplo, `app.css`).
- Bulma se importa en el entrypoint y se personaliza con clases propias.
- Los componentes usan la identidad visual de SIGA mediante clases y variables CSS.

---

## 6. Librerías y dependencias principales
- **SvelteKit** — Framework principal
- **Bulma** — Framework CSS
- **Chart.js** — Gráficos
- **Phosphor-svelte** — Iconos
- **Karma + Jasmine** — Testing
- **Vite** — Bundler y dev server

---

## 7. ¿Qué es Vite?
- Vite es un bundler y servidor de desarrollo ultrarrápido.
- Permite recarga instantánea, soporte para ES Modules, y build optimizado para producción.
- Reemplaza a Webpack y otros bundlers tradicionales.

---

## 8. ¿Qué es Babel?
- Babel es un transpilador que convierte JS moderno (ES6+) a JS compatible con navegadores antiguos.
- En SvelteKit, Babel es opcional y solo se usa si necesitas compatibilidad extra.

---

## 9. ¿Qué es coverage?
- Coverage (cobertura) es una métrica de testing que indica qué porcentaje del código está cubierto por pruebas.
- En SIGA, la cobertura está documentada en `COBERTURA_TESTING.md` y se obtiene al correr los tests con Karma/Jasmine.

---

## 10. ¿Qué hay en cada carpeta?
- **lib/**: Componentes, stores, utilidades, lógica compartida.
- **routes/**: Páginas, endpoints API, lógica de navegación.
- **static/**: Imágenes, íconos, manifest, recursos públicos.
- **tests/**: Pruebas unitarias e integración.

---

## 11. Mapa conceptual (texto)

```
SIGA_PROTOTIPO
│
├── src/
│   ├── routes/         # Páginas y endpoints
│   ├── lib/            # Componentes y lógica compartida
│   └── app.html        # HTML base
├── static/             # Recursos estáticos
├── tests/              # Pruebas
├── vite.config.js      # Configuración Vite
├── package.json        # Dependencias
└── README.md           # Documentación
```

---

## 12. Conclusión y defensa
- Elegí SvelteKit + Bulma por su eficiencia, simplicidad y velocidad de desarrollo.
- El stack es moderno, ampliamente adoptado en la industria y permite construir apps SPA y SSR con menos código y mejor rendimiento que React + Bootstrap en muchos casos.
- La estructura del proyecto es clara, modular y fácil de mantener.
- Las pruebas y la cobertura aseguran calidad y confianza en el código.
- Este enfoque demuestra que existen alternativas robustas y profesionales más allá de lo que se enseña tradicionalmente en clases.

---

**Este guion sirve como defensa, guía de estudio y material de apoyo para presentaciones y para enseñar a otros compañeros sobre el stack y la arquitectura de SIGA.**
