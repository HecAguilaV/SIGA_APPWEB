# 🖥️ Cómo Ejecutar SIGA Localmente en Windows

## 🚫 Problema: PowerShell no deja ejecutar npm

**Error típico:**
```
npm : No se puede cargar el archivo C:\Program Files\nodejs\npm.ps1 
porque la ejecución de scripts está deshabilitada en este sistema.
```

## ✅ Soluciones (elige UNA)

---

## **OPCIÓN 1: Scripts .bat (MÁS FÁCIL) ⭐ RECOMENDADO**

Ya están creados en la raíz del proyecto:

### 📋 Archivos disponibles:

| Archivo | Comando | Función |
|---------|---------|---------|
| `run-dev.bat` | Doble click | Inicia servidor en `http://localhost:5173` |
| `run-tests.bat` | Doble click | Ejecuta tests una sola vez |
| `test-watch.bat` | Doble click | Ejecuta tests en modo auto-run |
| `build.bat` | Doble click | Compila para producción |

### 🎯 ¿Cómo usarlos?

1. **Abre el explorador de archivos**
   - Ve a: `c:\Users\hdagu\Documents\SIGA_PROTOTIPO`

2. **Doble click en el archivo que quieras:**
   - `run-dev.bat` → Inicia la app
   - `run-tests.bat` → Ejecuta los tests
   - `test-watch.bat` → Tests en modo watch

3. **Se abrirá una terminal negra con la ejecución**
   - Presiona `Ctrl+C` para detener

---

## **OPCIÓN 2: Git Bash (MÁS FLEXIBLE)**

Ya tienes Git instalado, así que tienes Git Bash.

### 🎯 ¿Cómo usarlo?

1. **Click derecho en la carpeta `SIGA_PROTOTIPO`**
2. **Selecciona "Git Bash Here"**
3. **Ejecuta los comandos que quieras:**

```bash
# Instalar dependencias (una sola vez)
npm install

# Iniciar servidor
npm run dev

# Ejecutar tests
npm test

# Tests en modo watch
npm run test:watch

# Build para producción
npm run build
```

**Ventaja:** Funciona como terminal real, muy flexible.

---

## **OPCIÓN 3: WSL (Windows Subsystem for Linux)**

Si tienes WSL instalado (Ubuntu):

```bash
# Abre Ubuntu desde el menú de inicio
# Navega a tu proyecto:
cd /mnt/c/Users/hdagu/Documents/SIGA_PROTOTIPO

# Luego usa los comandos normales:
npm install
npm run dev
npm test
```

**Ventaja:** Entorno Linux nativo, más rápido.

---

## **OPCIÓN 4: Fix PowerShell (NO RECOMENDADO)**

Solo si quieres mantener PowerShell:

1. **Abre PowerShell como Administrador**
2. **Ejecuta esto:**
   ```powershell
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
3. **Responde: `Y` y Enter**

Luego podrás usar `npm` normalmente en PowerShell.

**⚠️ Riesgos:** Cambias permisos del sistema (menos seguro).

---

## 📊 Comparativa de opciones

| Opción | Facilidad | Flexibilidad | Recomendación |
|--------|-----------|--------------|---------------|
| **Scripts .bat** | ⭐⭐⭐⭐⭐ | ⭐⭐ | ✅ Para principiantes |
| **Git Bash** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ Para devs |
| **WSL** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ Para pro |
| **Fix PowerShell** | ⭐⭐ | ⭐⭐⭐⭐ | ❌ Cambios sistema |

---

## 🚀 Comandos más usados

```bash
# Desarrollo (servidor + hot reload)
npm run dev
# → Abre http://localhost:5173

# Tests (una sola vez)
npm test
# → Ve los tests correr en Chrome

# Tests automáticos (watch)
npm run test:watch
# → Tests se re-ejecutan al guardar archivos

# Build producción
npm run build
# → Compila para Vercel

# Preview de build local
npm run preview
```

---

## 💡 Recomendación para ti

**Usa la OPCIÓN 1 (Scripts .bat)** mientras aprendes:
- No necesita terminal
- No cambias configuración del sistema
- Solo haz doble click
- Ideal para principiantes

Cuando estés más cómodo, aprende **Git Bash** o **WSL** para más control.

---

## 🆘 Si algo no funciona

```bash
# Reset completo
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

**¡Happy coding! 🎉**
