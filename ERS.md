# ERS - Especificación de Requisitos de Software

**Proyecto:** SIGA - Sistema Inteligente de Gestión de Activos  
**Versión:** 2.0   
**Estado:** Evaluación 2 (30%)

---

## 1. Descripción del Proyecto

SIGA es una aplicación web que ayuda a gestionar el inventario de un almacén de forma inteligente. En lugar de hacer todo manualmente, un asistente de IA entiende lo que escribes y automáticamente actualiza los productos, cantidades y locales de almacenamiento.

**Ejemplo de uso:**

```
Usuario escribe: "Agrega 5 Bebidas en X kiosko"

Sistema entiende:
- Acción: agregar
- Producto: Bebidas
- Cantidad: 5
- Local: X kiosko

Resultado: Se agrega 5 unidades del producto "Bebidas" al local "X kiosko" automáticamente
```

---

## 2. Objetivos del Sistema

### Objetivo General
Simplificar la gestión de inventarios usando una interfaz conversacional con IA, permitiendo que los usuarios den instrucciones en lenguaje natural sin necesidad de navegar por formularios complejos.

### Objetivos Específicos

1. **Gestionar inventario**
   - Crear, ver, actualizar y eliminar productos

2. **Automatizar cambios**
   - Que la IA entienda instrucciones y ejecute cambios automáticamente

3. **Múltiples locales**
   - Manejar inventario en diferentes sucursales

4. **Visualización clara**
   - Ver tabla de productos actualizada en tiempo real

5. **Documentación automática**
   - Endpoint `/api-docs` muestra cómo funciona la API

---

## 3. Requisitos Funcionales

### RF-1: Visualizar Tabla de Inventario

**Descripción:** El usuario puede ver todos los productos con sus detalles.

**Características:**
- Muestra: ID, nombre, categoría, SKU, precio, stock por local
- Se puede buscar por nombre de producto
- Se puede filtrar por local o categoría
- Tabla actualiza automáticamente cuando hay cambios

### RF-2: Comunicar con Asistente IA

**Descripción:** El usuario escribe mensajes y el asistente responde entendiendo qué hacer.

**Características:**
- Entrada: texto escrito o voz (micrófono)
- Asistente entiende: crear producto, agregar/reducir stock, consultar información
- Respuesta: mensaje amigable sin código técnico
- Panel flotante y draggable (se puede mover por pantalla)

### RF-3: Crear Producto

**Descripción:** Crear un nuevo producto en el inventario.

**Ejemplo:**

```
IA entiende: "Crear Mouse marca Logitech"
Resultado: Agrega automáticamente el producto con nombre y categoría
Efecto: Aparece en tabla inmediatamente
```

### RF-4: Agregar/Reducir Stock

**Descripción:** Cambiar cantidad de productos en un local.

**Ejemplo:**

```
IA entiende: "Agrega 10 Laptops en Central"
Resultado: Actualiza stock de ese producto en ese local
Efecto: La tabla se actualiza en tiempo real
```

### RF-5: Entrada de Voz

**Descripción:** El usuario puede hablar en lugar de escribir.

**Características:**
- Presiona botón para empezar a grabar
- Reconocimiento de voz en español
- Automáticamente convierte lo hablado a texto
- Funciona como si hubiera escrito

### RF-6: Documentación de API

**Descripción:** Página que explica cómo funciona la API del sistema.

**Características:**
- Endpoint `/api-docs` muestra interfaz interactiva
- Lista todos los endpoints (crear producto, actualizar stock)
- Permite probar endpoints sin código

---

## 4. Requisitos No Funcionales

### RNF-1: Rendimiento
- Tabla actualiza en menos de 1 segundo
- Respuesta de IA en menos de 3 segundos
- Tests verifican que todo funciona

### RNF-2: Usabilidad
- Interfaz simple y clara
- Panel flotante no molesta
- Mensajes amigables (sin código técnico)
- Funciona en navegadores Chrome, Edge, Firefox

### RNF-3: Confiabilidad
- 10 pruebas unitarias verifican lógica
- Todos los tests pasan (10/10 SUCCESS)
- Sistema no se cae con uso normal

### RNF-4: Mantenibilidad
- Código limpio y bien organizado
- Componentes reutilizables
- Fácil de entender para otros desarrolladores

### RNF-5: Despliegue
- Funciona en Vercel (hosting en la nube)
- Código en GitHub público
- Puede desplegarse automáticamente con nuevos cambios

---

## 5. Casos de Uso

### CU-1: Agregar Stock a un Local

**Actor:** Usuario del almacén

**Flujo:**

```
1. Usuario abre SIGA en navegador
2. Ve tabla de inventario actual
3. Abre panel del asistente (botón flotante)
4. Escribe o dice: "Agrega 15 Mouses en Ibáñez"
5. Asistente entiende y ejecuta cambio
6. Tabla se actualiza mostrando nuevo stock
7. Usuario ve confirmación: "Se agregaron 15 Mouses en Ibáñez"
```

### CU-2: Crear Nuevo Producto

**Actor:** Usuario del almacén

**Flujo:**

```
1. Usuario abre asistente
2. Dice o escribe: "Crea producto Teclado mecánico marca Corsair"
3. Asistente crea el producto
4. Producto aparece en tabla
5. Usuario lo ve inmediatamente
```

### CU-3: Consultar Inventario

**Actor:** Usuario del almacén

**Flujo:**

```
1. Usuario consulta: "¿Cuántos Mouses hay en Ibáñez?"
2. Asistente responde viendo tabla actual
3. Usuario recibe respuesta clara: "Hay 25 Mouses en Ibáñez"
```

---

## 6. Modelo de Datos

### Entidad: Producto

```json
{
  "id": "número único",
  "nombre": "nombre del producto",
  "categoria": "tipo de producto",
  "sku": "código único",
  "precio": "precio unitario"
}
```

### Entidad: Stock (por local)

```json
{
  "producto_id": "referencia al producto",
  "local": "nombre del lugar (Central, Ibáñez, Serena)",
  "cantidad": "cuántas unidades hay"
}
```

### Entidad: Mensaje (en conversación)

```json
{
  "id": "número único",
  "emisor": "quién lo envió (usuario o SIGA)",
  "tipo": "texto o gráfico",
  "contenido": "lo que dice"
}
```

---

## 7. Iteraciones del Proyecto

### Iteración 0: Concepto Base (Planificación y Conceptualización)

Propuesta inicial del sistema definida con funcionalidades básicas durante la fase de conceptualización del proyecto.

**Características conceptualizadas:**
- Gestión de inventario con tabla estática
- Almacenamiento local de datos
- Interfaz básica de usuario

### Iteración 1: Incremento Completo (Implementación Actual - Evaluación 2)

Implementación real del sistema con características avanzadas basadas en la evolución y maduración de los requisitos iniciales.

**Características implementadas:**

| Característica | Iteración 0 (Concepto) | Iteración 1 (Actual) | Estado |
|---|---|---|---|
| Asistente IA conversacional | Planificado | Implementado | ACTIVO |
| Entrada de voz | Planificado | Implementado | ACTIVO |
| Actualizaciones en tiempo real | Planificado | Implementado | ACTIVO |
| Panel flotante draggable | Planificado | Implementado | ACTIVO |
| Suite de pruebas | Planificado | 10/10 SUCCESS | VALIDADO |
| Documentación de API | Conceptual | Swagger Interactiva | ACTIVA |

**Valor agregado en esta iteración:**
- Automatización completa mediante IA
- Accesibilidad mejorada con entrada de voz
- Eficiencia operacional con actualizaciones en tiempo real
- Confiabilidad verificada mediante testing exhaustivo

---

## 8. Criterios de Aceptación

El proyecto cumple si:

| Criterio | Estado |
|----------|--------|
| Tabla de inventario muestra productos correctamente | CUMPLIDO |
| Asistente entiende instrucciones en español | CUMPLIDO |
| Cambios se reflejan inmediatamente en tabla | CUMPLIDO |
| Entrada de voz funciona en navegador | CUMPLIDO |
| Panel flotante se puede mover por pantalla | CUMPLIDO |
| 10 tests pasan verificando funcionalidad | CUMPLIDO |
| API documentation funciona | CUMPLIDO |
| Se puede acceder desde Vercel sin problemas | CUMPLIDO |

---

## 9. Notas Finales

**Stack Técnico:**

| Componente | Tecnología |
|------------|------------|
| Framework | SvelteKit 5 + Vite |
| Inteligencia Artificial | Gemini 2.5 Pro (Google) |
| Almacenamiento | Datos en memoria (no persistentes) |
| Testing | Jasmine 5.1.0 + Karma 6.4.2 |
| Hosting | Vercel |
| Control de versiones | GitHub (público) |
| Documentación | README.md y Swagger UI |
| Despliegue | https://siga-prototipo.vercel.app/ |

---

**Documento preparado:** 20 de Octubre de 2025  
**Versión:** 2.0  
**Estado:** Completo
