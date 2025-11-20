import { json } from '@sveltejs/kit';
import { datosGlobales } from '$lib/estado-compartido.js';
import { env } from '$env/dynamic/private';

/**
 * Construye el prompt completo que se enviará al modelo de lenguaje.
 * Propósito: encapsular la lógica de RAG y asegurar que todas las instrucciones se incluyan de manera consistente.
 * @param {string} preguntaUsuario
 * @returns {string}
 */
const construirPrompt = (preguntaUsuario) => {
  const datos = datosGlobales;

  // Resumen muy conciso de los datos (evitar JSON gigante)
  const locales = datos.locales?.map((l) => `${l.nombre} (ID: ${l.id})`).join(', ') || 'N/A';
  const productos = datos.productos?.map((p) => `${p.nombre} (${p.categoria})`).slice(0, 10).join(', ') || 'N/A';
  const ventasPromedio = datos.ventasSemana?.map((v) => v.cantidad).reduce((a, b) => a + b, 0) || 0;

  return `Eres SIGA, el asistente inteligente de gestión de inventario. Tu misión es ayudar al usuario de forma natural, proactiva e inteligente.

📊 DATOS DISPONIBLES:
${JSON.stringify(datos, null, 2)}

🧠 TU INTELIGENCIA:
Eres AUTÓNOMO. Analiza los datos, calcula lo que necesites, y toma decisiones inteligentes:
- Si preguntan sobre ventas, analiza los datos y responde con insights
- Si piden comparaciones, calcula tú mismo las sumas/promedios necesarios
- Si quieren visualizar algo, GENERA el gráfico apropiado con los datos calculados
- Si preguntan algo conversacional, responde de forma natural y útil

🎨 GRÁFICOS INTELIGENTES:
Cuando sea útil visualizar datos (comparaciones, tendencias, distribuciones), GENERA el gráfico:
- Analiza los datos disponibles
- Calcula las métricas necesarias (sumas, promedios, agrupaciones)
- Elige el tipo de gráfico apropiado (torta para proporciones, barras para comparaciones, líneas para tendencias)
- Genera el JSON dentro de [CRUD_START]...[CRUD_END]

Ejemplos:
[CRUD_START]
{"accion": "grafico_torta", "grafico": {"titulo": "Distribución de ventas por local", "etiquetas": ["ITR", "Serena", "Pte. Ibañez"], "valores": [231, 320, 180]}}
[CRUD_END]

[CRUD_START]
{"accion": "grafico_barras", "grafico": {"titulo": "Top 5 productos más vendidos", "etiquetas": ["Café Frío", "Bebida Fantasía", "Papas Fritas", "Sándwich", "Galletas"], "valores": [148, 155, 112, 98, 92]}}
[CRUD_END]

[CRUD_START]
{"accion": "grafico_lineas", "grafico": {"titulo": "Tendencia de ventas diarias", "etiquetas": ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"], "valores": [45, 52, 48, 61, 58, 72, 38]}}
[CRUD_END]

⚙️ OPERACIONES CRUD:
Cuando necesites modificar datos, usa estos formatos dentro de [CRUD_START]...[CRUD_END]:

- Crear producto: {"accion": "crear_producto", "nombre": "Nombre", "categoria": "Categoría"}
- Editar producto: {"accion": "editar_producto", "id": 101, "nombre": "Nuevo Nombre", "categoria": "Nueva Cat", "sku": "SKU-001"}
- Eliminar producto: {"accion": "eliminar_producto", "id": 101}
- Agregar stock: {"accion": "agregar_stock", "producto": "Nombre Producto", "local": "Nombre Local", "cantidad": 15}
- Reducir stock: {"accion": "reducir_stock", "producto": "Nombre Producto", "local": "Nombre Local", "cantidad": 5}

💬 COMUNICACIÓN:
- Responde en máximo 2-3 líneas, de forma amigable y natural
- NUNCA muestres JSON al usuario
- Si ejecutas una operación, confirma con lenguaje natural: "Listo, agregué 15 unidades de X en Y"
- Si generas un gráfico, di algo como: "Aquí está la comparación que pediste" o "Te muestro la tendencia"

🎯 REGLAS ESPECIALES:
1. Si piden agregar stock de un producto que NO existe: primero créalo, luego agrega el stock (2 operaciones CRUD separadas)
2. Sé proactivo: si detectas algo interesante en los datos (stock bajo, producto muy vendido), menciónalo
3. Si no tienes datos para responder algo, sé honesto: "No tengo esa información disponible"

Pregunta del usuario: ${preguntaUsuario}`;
};

/**
 * Llama al modelo Gemini para obtener una respuesta.
 * Propósito: mantener la interacción con la API encapsulada y fácil de testear.
 * @param {string} prompt
 * @param {string} apiKey
 * @param {typeof fetch} fetchFn
 */
const invocarGemini = async (prompt, apiKey, fetchFn) => {
  const respuesta = await fetchFn(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ]
      })
    }
  );

  if (!respuesta.ok) {
    const detalle = await respuesta.text();
    throw new Error(`Gemini respondió con un error: ${detalle}`);
  }

  const cuerpo = await respuesta.json();
  const texto = cuerpo?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  return texto.trim();
};

export const POST = async ({ request, fetch }) => {
  try {
    const apiKey = env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY no está configurada en las variables de entorno.');
      return json({ respuesta: 'La configuración del asistente no está completa. Agrega la variable GEMINI_API_KEY en tu .env.local' }, { status: 500 });
    }

    const body = await request.json();
    const mensaje = body?.mensaje?.trim();

    if (!mensaje) {
      return json({ respuesta: 'Necesito una pregunta para poder ayudarte.' }, { status: 400 });
    }

    const prompt = construirPrompt(mensaje);
    const respuestaIA = await invocarGemini(prompt, apiKey, fetch);

    return json({ respuesta: respuestaIA });
  } catch (error) {
    console.error('Error en la función /api/chat:', error);
    return json({ respuesta: 'En este momento no puedo responder. Por favor, inténtalo más tarde.' }, { status: 500 });
  }
};