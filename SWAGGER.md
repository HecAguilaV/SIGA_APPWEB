# 📚 Swagger UI - Documentación Interactiva de APIs

## ¿Qué es Swagger?

**Swagger** (ahora llamado **OpenAPI**) es una especificación estándar para documentar APIs REST.

Con Swagger en SIGA tienes:
- ✅ Documentación automática de endpoints
- ✅ Interfaz interactiva para probar APIs
- ✅ Especificación estándar (OpenAPI 3.0)
- ✅ Compartible con otros desarrolladores

---

## 🌐 Acceso a Swagger UI

### Local (desarrollo):
```
http://localhost:5173/api-docs
```

### Producción (Vercel):
```
https://siga-prototipo.vercel.app/api-docs
```

---

## 📖 ¿Qué verás en Swagger UI?

### Panel principal:
```
┌─────────────────────────────────────────┐
│ SIGA API v1.0.0                         │
│ Sistema Inteligente de Gestión...       │
├─────────────────────────────────────────┤
│                                         │
│ [Chat] [Productos] [Inventario]        │
│                                         │
│ POST /api/chat                          │
│   Descripción: Enviar mensaje al IA    │
│   [Try it out]                          │
│                                         │
│ POST /api/productos/crear               │
│   Descripción: Crear nuevo producto    │
│   [Try it out]                          │
│                                         │
│ POST /api/inventario/actualizar         │
│   Descripción: Actualizar stock         │
│   [Try it out]                          │
│                                         │
│ GET /api/productos                      │
│   Descripción: Obtener lista productos │
│   [Try it out]                          │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🧪 Probar un endpoint en Swagger

### Paso 1: Expandir endpoint
Haz click en el endpoint que quieras probar (ej: `POST /api/productos/crear`)

### Paso 2: Click en "Try it out"
```
[Try it out]  ← Click aquí
```

### Paso 3: Llenar parámetros
```json
{
  "nombre": "Mouse Logitech",
  "sku": "MOUSE-001",
  "categoria": "Periféricos",
  "precio": 25.99
}
```

### Paso 4: Click en "Execute"
```
[Execute]  ← Click aquí
```

### Paso 5: Ver respuesta
```
Response code: 200
Response body:
{
  "success": true,
  "producto": {
    "id": "123",
    "nombre": "Mouse Logitech",
    "sku": "MOUSE-001",
    "categoria": "Periféricos"
  }
}
```

---

## 📋 Endpoints documentados

### 1️⃣ Chat con IA
```
POST /api/chat
Envía un mensaje al asistente Gemini 2.5 Pro
```

**Request:**
```json
{
  "mensaje": "Crear un producto: Teclado Corsair, SKU: KEY-001"
}
```

**Response:**
```json
{
  "respuesta": "Producto creado exitosamente",
  "crud": [...]
}
```

---

### 2️⃣ Crear Producto
```
POST /api/productos/crear
Crea un nuevo producto en el inventario
```

**Request:**
```json
{
  "nombre": "Laptop HP",
  "sku": "HP-LAP-001",
  "categoria": "Electrónica",
  "precio": 999.99
}
```

**Response:**
```json
{
  "success": true,
  "producto": {
    "id": "xyz",
    "nombre": "Laptop HP",
    "stock": {
      "Central": 0,
      "Sucursal A": 0,
      "Sucursal B": 0
    }
  }
}
```

---

### 3️⃣ Actualizar Stock
```
POST /api/inventario/actualizar
Actualiza el stock de un producto en un local
```

**Request:**
```json
{
  "producto": "Laptop HP",
  "local": "Central",
  "nuevoStock": 45
}
```

**Response:**
```json
{
  "success": true,
  "stockAnterior": 0,
  "stockNuevo": 45,
  "producto": "Laptop HP",
  "local": "Central"
}
```

---

### 4️⃣ Obtener Productos
```
GET /api/productos
Retorna la lista completa de productos
```

**Response:**
```json
[
  {
    "id": "1",
    "nombre": "Laptop HP",
    "sku": "HP-LAP-001",
    "categoria": "Electrónica",
    "stock": {
      "Central": 45,
      "Sucursal A": 20
    }
  },
  {
    "id": "2",
    "nombre": "Mouse Logitech",
    "sku": "MOUSE-001",
    "categoria": "Periféricos",
    "stock": {
      "Central": 150
    }
  }
]
```

---

## 🔗 Archivos involucrados

```
src/
├── lib/
│   └── openapi.js              ← Especificación OpenAPI
├── routes/
│   ├── api/
│   │   └── openapi+server.js   ← Endpoint que sirve la spec
│   └── api-docs/
│       └── +page.svelte        ← Interfaz Swagger UI
└── ...
```

---

## 📊 Swagger vs Postman vs Tests

| Aspecto | Swagger | Postman | Tests (Jasmine) |
|---------|---------|---------|-----------------|
| **Tipo** | Docs + Testing | Testing | Unit Testing |
| **Interfaz** | Navegador | App Desktop | Terminal |
| **En tu app** | ✅ Sí | ❌ No | ✅ Sí |
| **Documentación** | Auto | Manual | En código |
| **Compartir** | Link URL | JSON export | Repo Git |
| **Validación** | ✅ Esquemas | Manual | ✅ Assert |

---

## 💡 Use Cases

### Caso 1: Mostrar a cliente
```
"Aquí está la documentación completa de la API"
→ Abre http://siga-prototipo.vercel.app/api-docs
→ Cliente puede probar todo directamente
```

### Caso 2: Onboarding de developers
```
Nuevo dev necesita integrar SIGA
→ Lee documentación en Swagger
→ Prueba endpoints de inmediato
→ No necesita Postman
```

### Caso 3: Validación automática
```
Swagger valida requests según esquema
Si envías datos inválidos → Error claro
```

---

## 🚀 Próximos pasos

1. Abre `http://localhost:5173/api-docs` 🌐
2. Prueba cada endpoint con "Try it out"
3. Ve cómo Swagger genera la documentación
4. ¡Compartir con tu equipo!

---

## 📚 Recursos

- [OpenAPI Spec](https://spec.openapis.org/oas/v3.0.0)
- [Swagger UI](https://swagger.io/tools/swagger-ui/)
- [OpenAPI en español](https://swagger.io/resources/articles/best-practices-in-api-design/)

---

**¡Swagger está listo! 🎉**

*Prueba los endpoints desde el navegador sin necesidad de Postman.*
