// OpenAPI Specification - SIGA API
export const openAPISpec = {
  openapi: '3.0.0',
  info: {
    title: 'SIGA - Sistema Inteligente de Gestión de Almacenes',
    version: '1.0.0',
    description: 'API REST para gestión de inventario con IA',
    contact: {
      name: 'Dev Team',
      url: 'https://github.com/HecAguilaV/SIGA_PROTOTIPO'
    }
  },
  servers: [
    {
      url: 'http://localhost:5173',
      description: 'Servidor Local'
    },
    {
      url: 'https://siga-prototipo.vercel.app',
      description: 'Producción (Vercel)'
    }
  ],
  paths: {
    '/api/productos/crear': {
      post: {
        tags: ['Productos'],
        summary: 'Crear nuevo producto',
        description: 'Crea un nuevo producto en el inventario',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  nombre: { type: 'string', example: 'Laptop Dell' },
                  sku: { type: 'string', example: 'LAP-001' },
                  categoria: { type: 'string', example: 'Electrónica' },
                  precio: { type: 'number', example: 1200.00 }
                },
                required: ['nombre', 'sku', 'categoria']
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Producto creado exitosamente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'number', example: 1 },
                    nombre: { type: 'string', example: 'Laptop Dell' },
                    sku: { type: 'string', example: 'LAP-001' },
                    categoria: { type: 'string', example: 'Electrónica' },
                    createdAt: { type: 'string', example: '2025-10-19T20:00:00Z' }
                  }
                }
              }
            }
          },
          400: { description: 'Datos inválidos' },
          500: { description: 'Error del servidor' }
        }
      }
    },
    '/api/inventario/actualizar': {
      put: {
        tags: ['Inventario'],
        summary: 'Actualizar stock de producto',
        description: 'Actualiza la cantidad de stock en un local específico',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  productoId: { type: 'number', example: 1 },
                  local: { type: 'string', example: 'Central', enum: ['Central', 'Ibáñez', 'Serena'] },
                  cantidad: { type: 'number', example: 50 },
                  operacion: { type: 'string', example: 'set', enum: ['set', 'add', 'subtract'] }
                },
                required: ['productoId', 'local', 'cantidad']
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Stock actualizado exitosamente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    productoId: { type: 'number' },
                    local: { type: 'string' },
                    stockAnterior: { type: 'number' },
                    stockNuevo: { type: 'number' },
                    timestamp: { type: 'string' }
                  }
                }
              }
            }
          },
          400: { description: 'Datos inválidos' },
          404: { description: 'Producto no encontrado' },
          500: { description: 'Error del servidor' }
        }
      }
    },
    '/api/chat': {
      post: {
        tags: ['IA'],
        summary: 'Chat con IA (Gemini 2.5 Pro)',
        description: 'Envía un mensaje al asistente inteligente',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  mensaje: { type: 'string', example: 'Agregar 10 Mouse en Central' }
                },
                required: ['mensaje']
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Respuesta del asistente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    respuesta: { type: 'string' },
                    accionEjecutada: { type: 'boolean' },
                    detalles: { type: 'object' }
                  }
                }
              }
            }
          },
          400: { description: 'Mensaje vacío' },
          500: { description: 'Error del servidor' }
        }
      }
    }
  },
  components: {
    schemas: {
      Producto: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          nombre: { type: 'string' },
          sku: { type: 'string' },
          categoria: { type: 'string' },
          precio: { type: 'number' },
          stock: {
            type: 'object',
            properties: {
              Central: { type: 'number' },
              Ibáñez: { type: 'number' },
              Serena: { type: 'number' }
            }
          },
          createdAt: { type: 'string', format: 'date-time' }
        }
      },
      Error: {
        type: 'object',
        properties: {
          codigo: { type: 'string' },
          mensaje: { type: 'string' }
        }
      }
    }
  },
  tags: [
    { name: 'Productos', description: 'Operaciones con productos' },
    { name: 'Inventario', description: 'Gestión de stock' },
    { name: 'IA', description: 'Asistente inteligente' }
  ]
};
