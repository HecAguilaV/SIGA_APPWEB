# 🚀 SIGA Prototipo - Guía Rápida

## 📋 Requisitos

- **Node.js 18+** → [Descargar](https://nodejs.org/)
- **Git** (opcional, para clonar el repo)

## ⚡ Ejecución Rápida

### Windows
```bash
# Opción 1: Hacer doble clic en run.bat
run.bat dev

# Opción 2: Desde terminal
node ./node_modules/vite/bin/vite.js
```

### Mac/Linux o Git Bash
```bash
chmod +x run.sh
./run.sh dev
```

## 🎮 Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `run.bat dev` | Inicia servidor (localhost:5173) |
| `run.bat test` | Ejecuta tests Karma + Jasmine |
| `run.bat build` | Compila para producción |
| `run.bat install` | Instala dependencias |

## 🧪 Tests con Jasmine + Karma

### Ejecutar tests UNA VEZ
```bash
run.bat test
```

**Resultado:**
```
TOTAL: 10 SUCCESS ✓
```

Mostrará los tests agrupados con `describe`:
- ✓ Validador de Inventario
  - ✓ lanza error si nombre está vacío
  - ✓ acepta nombre válido
  - etc...

### Ver tests con Karma Debug
```bash
run.bat test:watch
```
Abre Chrome mostrando los tests en `http://localhost:9880/debug.html`

## 🌐 Acceso Local

- **Aplicación:** http://localhost:5173/
- **Karma Tests:** http://localhost:9880/ (cuando está corriendo)
- **Debug Tests:** http://localhost:9880/debug.html

## 📦 Estructura

```
SIGA_PROTOTIPO/
├── src/
│   ├── routes/          # Páginas y rutas
│   ├── lib/             # Componentes compartidos
│   ├── tests/           # Tests Jasmine
│   │   ├── unit/        # Tests unitarios
│   │   └── integration/ # Tests de integración
├── run.bat              # Script Windows
├── run.sh               # Script Mac/Linux
├── package.json         # Dependencias
└── karma.conf.cjs       # Configuración Karma
```

## 🔧 Desarrollo

### Instalar nuevas dependencias
```bash
npm install [nombre-package]
```

### Ejecutar check TypeScript
```bash
run.bat check
```

### Build para producción
```bash
run.bat build
```

## 🐛 Troubleshooting

**Error: "npm is not recognized"**
- Reinstala Node.js desde https://nodejs.org/

**Error: "Chrome not found" (en tests)**
- Asegúrate de tener Chrome instalado

**Puerto 5173 en uso:**
```bash
# Buscar proceso en puerto 5173
netstat -ano | findstr :5173
# Matar proceso
taskkill /PID [PID] /F
```

## 📚 Más Info

- Documentación: [ERS.md](./ERS.md)
- Cobertura de Tests: [COBERTURA_TESTING.md](./COBERTURA_TESTING.md)
- Reporte de Tests: [TEST_REPORT.md](./TEST_REPORT.md)
- Despliegue: [Vercel](https://vercel.com/)

---

**Versión:** 0.0.1  
**Última actualización:** Octubre 2025
