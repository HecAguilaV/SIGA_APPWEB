// OpenAPI / Swagger Specification para SIGA
export const openApiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'SIGA API - Sistema Inteligente de Gestión de Almacén',
    description: 'API RESTful para gestión de inventario con IA integrada',
    version: '1.0.0',
    contact: {
      name: 'SIGA Team',
      email: 'info@siga.com'
    }
  },
  servers: [
    {
      url: 'http://localhost:5173',
      description: 'Servidor local de desarrollo'
    },
    {
      url: 'https://siga-prototipo.vercel.app',
      description: 'Servidor de producción'
    }
  ],
  tags: [
    {
      name: 'Chat',
      description: 'Endpoints del asistente IA'
    },
    {
      name: 'Productos',
      description: 'Gestión de productos'
    },
    {
      name: 'Inventario',
      description: 'Gestión de inventario'
    }
  ],
  paths: {
    '/api/chat': {
      post: {
        tags: ['Chat'],
        summary: 'Enviar mensaje al asistente IA',
        description: 'Envía un mensaje de texto o comando CRUD al asistente Gemini 2.5 Pro',
        operationId: 'sendMessage',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  mensaje: {
                    type: 'string',
                    description: 'Mensaje de texto o comando CRUD',
                    example: 'Crear un producto: Mouse Logitech, SKU: MOUSE-001'
                  },
                  contexto: {
                    type: 'string',
                    description: 'Contexto adicional (opcional)',
                    example: 'Categoría: Periféricos'
                  }
                },
                required: ['mensaje']
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Respuesta exitosa del IA',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    respuesta: {
                      type: 'string',
                      description: 'Respuesta del IA'
                    },
                    crud: {
                      type: 'array',
                      description: 'Operaciones CRUD procesadas',
                      items: {
                        type: 'object'
                      }
                    }
                  }
                }
              }
            }
          },
          400: {
            description: 'Error en la solicitud'
          },
          500: {
            description: 'Error del servidor'
          }
        }
      }
    },
    '/api/productos/crear': {
      post: {
        tags: ['Productos'],
        summary: 'Crear nuevo producto',
        description: 'Crea un nuevo producto en el inventario',
        operationId: 'createProduct',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  nombre: {
                    type: 'string',
                    description: 'Nombre del producto',
                    example: 'Laptop Dell XPS 13'
                  },
                  sku: {
                    type: 'string',
                    description: 'SKU del producto',
                    example: 'DELL-XPS-13'
                  },
                  categoria: {
                    type: 'string',
                    description: 'Categoría del producto',
                    example: 'Electrónica'
                  },
                  precio: {
                    type: 'number',
                    description: 'Precio unitario (opcional)',
                    example: 1299.99
                  }
                },
                required: ['nombre', 'categoria']
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
                    success: {
                      type: 'boolean',
                      example: true
                    },
                    producto: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        nombre: { type: 'string' },
                        sku: { type: 'string' },
                        categoria: { type: 'string' },
                        stock: { type: 'object' }
                      }
                    }
                  }
                }
              }
            }
          },
          400: {
            description: 'Datos incompletos o inválidos'
          },
          500: {
            description: 'Error al crear producto'
          }
        }
      }
    },
    '/api/inventario/actualizar': {
      post: {
        tags: ['Inventario'],
        summary: 'Actualizar stock de producto',
        description: 'Actualiza el stock de un producto en un local específico',
        operationId: 'updateStock',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  producto: {
                    type: 'string',
                    description: 'Nombre del producto',
                    example: 'Laptop Dell XPS 13'
                  },
                  local: {
                    type: 'string',
                    description: 'Nombre del local/sucursal',
                    example: 'Central'
                  },
                  nuevoStock: {
                    type: 'integer',
                    description: 'Nuevo valor de stock',
                    example: 45
                  }
                },
                required: ['producto', 'local', 'nuevoStock']
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
                    success: {
                      type: 'boolean',
                      example: true
                    },
                    stockAnterior: {
                      type: 'integer',
                      example: 50
                    },
                    stockNuevo: {
                      type: 'integer',
                      example: 45
                    },
                    producto: {
                      type: 'string'
                    },
                    local: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          },
          404: {
            description: 'Producto o local no encontrado'
          },
          400: {
            description: 'Datos incompletos'
          }
        }
      }
    },
    '/api/productos': {
      get: {
        tags: ['Productos'],
        summary: 'Obtener lista de productos',
        description: 'Retorna la lista completa de productos del inventario',
        operationId: 'getProducts',
        responses: {
          200: {
            description: 'Lista de productos',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      nombre: { type: 'string' },
                      sku: { type: 'string' },
                      categoria: { type: 'string' },
                      stock: { type: 'object' }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      Producto: {
        type: 'object',
        properties: {
          id: {
            type: 'string'
          },
          nombre: {
            type: 'string'
          },
          sku: {
            type: 'string'
          },
          categoria: {
            type: 'string'
          },
          stock: {
            type: 'object',
            additionalProperties: {
              type: 'integer'
            }
          }
        }
      },
      Error: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean'
          },
          error: {
            type: 'string'
          }
        }
      }
    }
  }
};
