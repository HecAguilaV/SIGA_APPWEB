# Testing con Jasmine y Karma

## 📦 Instalación

Las dependencias ya están configuradas en `package.json`:
- **Jasmine**: Framework de testing BDD
- **Karma**: Test runner (ejecutor de pruebas)

## 🚀 Comandos

```bash
# Ejecutar tests una sola vez
npm test

# Ejecutar tests en modo watch (se ejecutan automáticamente al cambiar archivos)
npm run test:watch

# Ejecutar tests en CI/CD (Chrome headless)
npm run test:ci
```

## 📝 Estructura

```
src/
├── tests/
│   ├── example.spec.js      ← Ejemplos de tests
│   └── ...
└── ...

karma.conf.js               ← Configuración de Karma
```

## ✍️ Escribir Tests

Los tests deben estar en archivos `.spec.js` o `.test.js` dentro de `src/`

### Ejemplo básico:

```javascript
describe('Mi Característica', () => {
  
  it('debería hacer algo', () => {
    // Arrange
    const resultado = 1 + 1;
    
    // Assert
    expect(resultado).toBe(2);
  });

  it('debería validar datos', () => {
    expect('texto').toBeTruthy();
    expect([]).toBeFalsy();
  });

});
```

## 🧪 Matchers comunes en Jasmine

```javascript
expect(value).toBe(expected);              // Igualdad estricta
expect(value).toEqual(expected);           // Igualdad profunda
expect(value).toBeTruthy();                // Truthy
expect(value).toBeFalsy();                 // Falsy
expect(value).toContain(item);             // Contiene
expect(array).toHaveLength(3);             // Longitud
expect(number).toBeGreaterThan(5);         // Mayor que
expect(number).toBeLessThan(10);           // Menor que
expect(fn).toThrow();                      // Lanza error
expect(fn).toHaveBeenCalled();             // Función llamada
```

## 📊 Tests existentes

- ✅ Crear Producto
- ✅ Actualizar Inventario
- ✅ Asistente Contextual
- ✅ Validación de Datos

## 🔧 Configuración

### karma.conf.js
- **Framework**: Jasmine
- **Browser**: Chrome
- **Port**: 9876
- **Watch**: Auto-run on file changes

## 💡 Tips

1. Mantén tests simples y enfocados
2. Usa nombres descriptivos
3. Agrupa tests relacionados con `describe()`
4. Usa `beforeEach()` y `afterEach()` para setup/cleanup

```javascript
describe('Tests con setup', () => {
  
  let variable;
  
  beforeEach(() => {
    variable = [];
  });
  
  afterEach(() => {
    variable = null;
  });
  
  it('debería usar la variable', () => {
    variable.push(1);
    expect(variable).toContain(1);
  });
  
});
```

---

**¡Happy Testing! 🎉**
