<script lang="ts">
  import { page } from "$app/stores";
  import { derived } from "svelte/store";
  import { onMount } from "svelte";
  import { datosNegocio } from "$lib/datosSimulados.js";
  import { get } from "svelte/store";
  import GraficoTorta from "./GraficoTorta.svelte";
  import GraficoBarras from "./GraficoBarras.svelte";
  import GraficoLineas from "./GraficoLineas.svelte";

  let estaAbierto = false;
  let mensajeUsuario = "";
  let estaPensando = false;
  let mensajeError = "";
  let posX = 0;
  let posY = 0;
  let estaArrastrando = false;
  let offsetX = 0;
  let offsetY = 0;
  let estaRedimensionando = false;
  let panelWidth = 320;
  let panelHeight = 550;
  let resizeOffsetX = 0;
  let resizeOffsetY = 0;
  let botonToggle: HTMLButtonElement | undefined;
  let panelElement: HTMLDivElement | undefined;
  let mensajesContainer: HTMLDivElement | undefined;
  let inputMensaje: HTMLInputElement | undefined;
  let estamosUsandoVoz = false;
  let reconocimiento: any;

  /** @typedef {{ id: string; emisor: 'usuario' | 'siga'; tipo: 'texto' | 'grafico'; contenido?: string; grafico?: { tipo: 'torta' | 'barras' | 'lineas'; titulo: string; etiquetas: string[]; valores: number[] } }} Mensaje */
  let mensajes: any[] = [];
  let mensajesRendered: any[] = [];
  let graficoActivo: any = null;
  let graficoAbierto = false;
  let graficoGeneradoLocal = false;
  let modalExplicacion = "";
  let _modalAnimating = false;

  const rutaActual = derived(page, ($page) => $page.url.pathname);

  $: contextoActual = (() => {
    const ruta = $rutaActual;
    if (ruta === "/") return "El usuario está viendo el inventario. ";
    if (ruta === "/analisis")
      return "El usuario está viendo análisis de ventas. ";
    if (ruta === "/acerca") return "El usuario está leyendo sobre SIGA. ";
    return "";
  })();

  /**
   * Posiciona el panel al lado del botón al abrir
   */
  const posicionarPanelAlLado = () => {
    if (!botonToggle) return;

    const rect = botonToggle.getBoundingClientRect();
    const anchoPanel = 380;
    const altoPanel = 500;

    let x = rect.left - anchoPanel - 20;
    let y = rect.top;

    if (x < 0) {
      x = rect.right + 20;
    }

    if (y + altoPanel > window.innerHeight) {
      y = window.innerHeight - altoPanel - 20;
    }

    posX = Math.max(0, x);
    posY = Math.max(0, y);
  };

  const abrirAsistente = () => {
    estaAbierto = !estaAbierto;
    if (estaAbierto) {
      setTimeout(posicionarPanelAlLado, 0);
    }
  };

  // Genera un objeto de gráfico a partir del store `datosNegocio` y la solicitud del usuario
  const generarGraficoDesdeSolicitud = (
    tipoSolicitado: string | undefined,
    textoUsuario: string | undefined,
  ): any => {
    const negocio = get(datosNegocio);
    const locales = negocio.locales || [];
    const ventas = negocio.ventasSemana || [];

    const ventasPorLocal = locales.map((l) => ({
      nombre: l.nombre,
      id: l.id,
      total: ventas
        .filter((v) => v.localId === l.id)
        .reduce((a, b) => a + b.cantidad, 0),
    }));

    const productos = negocio.productos || [];
    const ventasPorProducto = productos.map((p) => ({
      id: p.id,
      nombre: p.nombre,
      total: ventas
        .filter((v) => v.productoId === p.id)
        .reduce((a, b) => a + b.cantidad, 0),
    }));

    const textoLower = (textoUsuario || "").toLowerCase();

    if (
      textoLower.includes("por local") ||
      textoLower.includes("ventas semanales por local") ||
      textoLower.includes("ventas por local") ||
      ((textoLower.includes("local") || textoLower.includes("locales")) &&
        (textoLower.includes("venta") ||
          textoLower.includes("ventas") ||
          textoLower.includes("líder") ||
          textoLower.includes("lider") ||
          textoLower.includes("semanal")))
    ) {
      const etiquetas = ventasPorLocal.map((v) => v.nombre);
      const valores = ventasPorLocal.map((v) => v.total);
      return {
        tipo: "torta",
        titulo: "Ventas semanales por local",
        etiquetas,
        valores,
      };
    }

    if (
      textoLower.includes("productos") ||
      textoLower.includes("más vendidos") ||
      textoLower.includes("productos más vendidos")
    ) {
      const sorted = [...ventasPorProducto]
        .sort((a, b) => b.total - a.total)
        .slice(0, 6);
      const etiquetas = sorted.map((s) => s.nombre);
      const valores = sorted.map((s) => s.total);
      return {
        tipo: tipoSolicitado === "torta" ? "torta" : "barras",
        titulo: "Productos más vendidos (semana)",
        etiquetas,
        valores,
      };
    }

    if (
      textoLower.includes("tendencia") ||
      textoLower.includes("por día") ||
      tipoSolicitado === "lineas"
    ) {
      const dias = negocio.ventasPorDia || [];
      return {
        tipo: "lineas",
        titulo: "Tendencia de ventas (últimos 7 días)",
        etiquetas: dias.map((d) => d.dia),
        valores: dias.map((d) => d.totalVentas),
      };
    }

    // Si no coincide con ningún patrón, retornar null
    // La IA debe decidir qué mostrar
    return null;
  };

  const generarExplicacionGrafico = (grafico: any): string => {
    if (!grafico || !grafico.etiquetas || !grafico.valores) return "";
    const total =
      grafico.valores.reduce((a: number, b: number) => a + b, 0) || 1;
    let maxIndex = 0;
    for (let i = 1; i < grafico.valores.length; i++) {
      if (grafico.valores[i] > grafico.valores[maxIndex]) maxIndex = i;
    }
    const topLabel = grafico.etiquetas[maxIndex];
    const topValue = grafico.valores[maxIndex];
    const pct = Math.round((topValue / total) * 100);
    return `Resumen: muestra '${grafico.titulo}' — el mayor aporte es ${topLabel} con ${topValue} unidades (${pct}%).`;
  };

  // Handler rápido para generar el gráfico de ventas por local (útil para pruebas)
  const generarGraficoVentasPorLocal = () => {
    try {
      const grafico = generarGraficoDesdeSolicitud("torta", "ventas por local");
      if (
        grafico &&
        grafico.etiquetas &&
        grafico.valores &&
        grafico.valores.length
      ) {
        // Abrir modal desde el botón rápido (usar bounding rect del botón)
        const btn: HTMLElement | null = botonToggle ?? null;
        graficoActivo = grafico;
        console.log("[Asistente] graficoActivo generado (rápido):", grafico);
        modalExplicacion =
          generarExplicacionGrafico(grafico) ||
          "He generado un gráfico y lo abrí en una vista ampliada.";
        openModalFromElement(btn);
        if (modalExplicacion)
          mensajes = [
            ...mensajes,
            {
              id: crypto.randomUUID(),
              emisor: "siga",
              tipo: "texto",
              contenido: modalExplicacion,
            },
          ];
        setTimeout(() => {
          try {
            inputMensaje?.focus();
          } catch (e) {}
        }, 150);
      }
    } catch (err) {
      console.error("Error generando gráfico rápido:", err);
    }
  };

  const openModalFromElement = (el: HTMLElement | null) => {
    if (!el) {
      graficoAbierto = true;
      return;
    }

    try {
      const rect = el.getBoundingClientRect();
      // calcular valores relativos al viewport centro
      const startX = rect.left + rect.width / 2;
      const startY = rect.top + rect.height / 2;

      const root = document.documentElement;
      root.style.setProperty("--modal-start-x", `${startX}px`);
      root.style.setProperty("--modal-start-y", `${startY}px`);

      _modalAnimating = true;
      graficoAbierto = true;

      // quitar la clase de animación pasada después de la duración
      setTimeout(() => {
        _modalAnimating = false;
      }, 420);
    } catch (err) {
      console.error("openModalFromElement error", err);
      graficoAbierto = true;
    }
  };

  /**
   * Procesa comandos CRUD enviados por el asistente
   * @param {any} crud
   */
  const procesarCRUD = async (crud: any) => {
    try {
      if (crud.accion === "crear_producto") {
        const res = await fetch("/api/productos/crear", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: crud.nombre,
            categoria: crud.categoria,
            sku: crud.sku,
          }),
        });
        const datos = await res.json();
        if (datos.success && datos.datos) {
          console.log("✅ Producto creado:", datos.producto);
          datosNegocio.set(datos.datos);
        }
      } else if (crud.accion === "editar_producto") {
        const res = await fetch("/api/productos/editar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: crud.id,
            nombre: crud.nombre,
            categoria: crud.categoria,
            sku: crud.sku,
          }),
        });
        const datos = await res.json();
        if (datos.success && datos.datos) {
          console.log("✅ Producto editado:", datos.producto);
          datosNegocio.set(datos.datos);
        }
      } else if (crud.accion === "eliminar_producto") {
        const res = await fetch("/api/productos/eliminar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: crud.id,
          }),
        });
        const datos = await res.json();
        if (datos.success && datos.datos) {
          console.log("✅ Producto desactivado:", datos.producto);
          datosNegocio.set(datos.datos);
        }
      } else if (
        crud.accion === "agregar_stock" ||
        crud.accion === "reducir_stock"
      ) {
        const res = await fetch("/api/inventario/actualizar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            producto: crud.producto,
            local: crud.local,
            cantidad: crud.cantidad,
            accion: crud.accion === "agregar_stock" ? "agregar" : "reducir",
          }),
        });
        const datos = await res.json();
        if (datos.success && datos.datos) {
          console.log("✅ Stock actualizado:", datos.mensaje);
          datosNegocio.set(datos.datos);
        }
      }
    } catch (error) {
      console.error("Error procesando CRUD:", error);
    }
  };

  const enviarMensaje = async () => {
    const contenido = mensajeUsuario.trim();
    if (!contenido) return;

    mensajes = [
      ...mensajes,
      { id: crypto.randomUUID(), emisor: "usuario", tipo: "texto", contenido },
    ];
    mensajeUsuario = "";
    estaPensando = true;
    mensajeError = "";

    try {
      const respuesta = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mensaje: contextoActual + contenido,
        }),
      });

      if (!respuesta.ok) {
        throw new Error("No fue posible conectar con SIGA.");
      }

      const datos = await respuesta.json();
      const textoIA = datos.respuesta ?? "Estoy aquí para ayudarte.";

      const textoLimpio = textoIA
        .replace(/\[CRUD_START\][\s\S]*?\[CRUD_END\]/g, "")
        .trim();

      // Detectar y procesar MÚLTIPLES CRUD
      const crudMatches = textoIA.match(
        /\[CRUD_START\]([\s\S]*?)\[CRUD_END\]/g,
      );
      if (crudMatches && crudMatches.length > 0) {
        for (const match of crudMatches) {
          const crudContent = match
            .replace(/\[CRUD_START\]|\[CRUD_END\]/g, "")
            .trim();
          try {
            const crudJSON = JSON.parse(crudContent);
            // Si el servidor solicita un gráfico vía CRUD (ej. accion: 'grafico_torta'),
            // abrimos el modal en lugar de insertar un gráfico inline en el historial.
            if (
              crudJSON &&
              typeof crudJSON.accion === "string" &&
              crudJSON.accion.startsWith("grafico")
            ) {
              try {
                // elegir tipo según la acción
                const tipo = crudJSON.accion.includes("torta")
                  ? "torta"
                  : crudJSON.accion.includes("barras")
                    ? "barras"
                    : "lineas";
                // Intentar usar parámetros si vienen en el CRUD, si no, generar desde la solicitud original
                let graficoFromCrud = null;
                if (
                  crudJSON.grafico &&
                  crudJSON.grafico.etiquetas &&
                  crudJSON.grafico.valores
                ) {
                  graficoFromCrud = {
                    tipo: tipo,
                    titulo: crudJSON.grafico.titulo || "Gráfico",
                    etiquetas: crudJSON.grafico.etiquetas,
                    valores: crudJSON.grafico.valores,
                  };
                } else {
                  graficoFromCrud = generarGraficoDesdeSolicitud(
                    tipo,
                    contenido,
                  );
                }

                // Solo abrir el modal si tenemos datos válidos
                if (
                  graficoFromCrud &&
                  graficoFromCrud.etiquetas &&
                  graficoFromCrud.valores
                ) {
                  graficoActivo = graficoFromCrud;
                  modalExplicacion =
                    generarExplicacionGrafico(graficoFromCrud) || "";
                  // abrir desde el centro (no hay elemento disparador en este flujo)
                  openModalFromElement(null);
                  console.log(
                    "✅ CRUD grafico procesado e abierto en modal:",
                    crudJSON.accion,
                  );
                } else {
                  console.warn("⚠️ No se pudo generar el gráfico solicitado");
                }
              } catch (err) {
                console.error("Error procesando CRUD gráfico:", err);
              }
              continue;
            }

            await procesarCRUD(crudJSON);
            console.log("✅ CRUD procesado:", crudJSON.accion);
          } catch (error) {
            console.error(
              "Error parsando CRUD:",
              error,
              "Contenido:",
              crudContent,
            );
          }
        }
      }

      if (textoLimpio) {
        // Antes de añadir texto limpio, eliminar cualquier rastro de mensajes de tipo gráfico
        mensajes = mensajes.filter((m) => {
          const t = m && m.tipo ? String(m.tipo) : "";
          return !(t.startsWith("grafico") || m.grafico);
        });

        mensajes = [
          ...mensajes,
          {
            id: crypto.randomUUID(),
            emisor: "siga",
            tipo: "texto",
            contenido: textoLimpio,
          },
        ];
      }
    } catch (error) {
      console.error(error);
      mensajeError = "No pudimos obtener la respuesta. Intenta nuevamente.";
    } finally {
      estaPensando = false;
      // Devolver el focus al input después de enviar
      setTimeout(() => {
        if (inputMensaje) {
          inputMensaje.focus();
        }
      }, 100);
    }
  };

  /**
   * @param {SubmitEvent | KeyboardEvent} evento
   */
  const manejarEnvio = async (evento: SubmitEvent | KeyboardEvent) => {
    evento.preventDefault();
    await enviarMensaje();
  };

  /**
   * @param {MouseEvent} evento
   */
  const iniciarArrastre = (evento: MouseEvent) => {
    if (evento.button !== 0) return; // Solo click izquierdo
    estaArrastrando = true;
    if (!panelElement) return;

    const rect = panelElement.getBoundingClientRect();
    offsetX = evento.clientX - rect.left;
    offsetY = evento.clientY - rect.top;
    console.log("✋ Arrastrando iniciado en:", offsetX, offsetY);
  };

  /**
   * @param {MouseEvent} evento
   */
  const manejarMovimiento = (evento: MouseEvent) => {
    if (!estaArrastrando || !panelElement) return;

    const nuevaX = evento.clientX - offsetX;
    const nuevaY = evento.clientY - offsetY;

    const maxX = window.innerWidth - panelElement.offsetWidth;
    const maxY = window.innerHeight - panelElement.offsetHeight;

    posX = Math.max(0, Math.min(nuevaX, maxX));
    posY = Math.max(0, Math.min(nuevaY, maxY));
  };

  const finalizarArrastre = () => {
    estaArrastrando = false;
  };

  const iniciarResize = (evento: MouseEvent) => {
    if (evento.button !== 0) return;
    estaRedimensionando = true;
    resizeOffsetY = evento.clientY;
  };

  const manejarResize = (evento: MouseEvent) => {
    if (!estaRedimensionando) return;

    const deltaY = evento.clientY - resizeOffsetY;
    panelHeight = Math.max(
      400,
      Math.min(panelHeight - deltaY, window.innerHeight - 100),
    );

    resizeOffsetY = evento.clientY;
  };

  const finalizarResize = () => {
    estaRedimensionando = false;
  };

  /**
   * Inicializa Web Speech API para entrada de voz
   */
  const inicializarVoz = () => {
    // @ts-ignore
    const SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition;
    if (!SpeechRecognition) {
      mensajeError =
        "❌ Tu navegador no soporta entrada de voz. Usa Chrome, Edge o Safari.";
      return;
    }

    try {
      reconocimiento = new SpeechRecognition();
      reconocimiento.lang = "es-ES";
      reconocimiento.continuous = false;
      reconocimiento.interimResults = false;

      reconocimiento.onstart = () => {
        estamosUsandoVoz = true;
        mensajeError = "";
      };

      // @ts-ignore
      reconocimiento.onresult = (evento) => {
        let textoTranscrito = "";
        for (let i = evento.resultIndex; i < evento.results.length; i++) {
          if (evento.results[i].isFinal) {
            textoTranscrito += evento.results[i][0].transcript;
          }
        }
        if (textoTranscrito) {
          mensajeUsuario = textoTranscrito;
          estamosUsandoVoz = false;
          // Enviar automáticamente después de detectar voz final (con delay de 2 segundos)
          setTimeout(() => {
            if (mensajeUsuario.trim()) {
              enviarMensaje();
            }
          }, 2000);
        }
      };

      // @ts-ignore
      reconocimiento.onerror = (evento) => {
        console.error("Error de voz:", evento.error);
        estamosUsandoVoz = false;

        let msgError = "❌ Error desconocido. Intenta de nuevo.";
        if (evento.error === "network")
          msgError = "🌐 Error de conexión. Verifica tu internet.";
        else if (evento.error === "audio")
          msgError = "🎤 No se detectó audio. Verifica tu micrófono.";
        else if (evento.error === "not-allowed")
          msgError = "🔒 Permiso negado. Autoriza el micrófono.";
        else if (evento.error === "no-speech")
          msgError = "🤐 No se detectó voz. Intenta de nuevo.";
        else if (evento.error === "bad-grammar")
          msgError = "📝 Error en el reconocimiento. Intenta de nuevo.";
        else if (evento.error === "service-not-allowed")
          msgError = "⛔ El servicio de voz no está disponible.";

        mensajeError = msgError;
      };

      reconocimiento.onend = () => {
        estamosUsandoVoz = false;
      };
    } catch (err) {
      console.error("Error al inicializar voz:", err);
      mensajeError = "❌ Error al inicializar el micrófono.";
    }
  };

  /**
   * Inicia grabación de voz
   */
  const iniciarGrabacion = () => {
    mensajeError = "";

    if (!reconocimiento) {
      inicializarVoz();
    }

    if (reconocimiento) {
      try {
        mensajeError = "🎤 Escuchando... habla ahora";
        reconocimiento.start();
      } catch (err) {
        console.error("Error al iniciar grabación:", err);
        mensajeError = "❌ No se pudo iniciar la grabación. Intenta de nuevo.";
      }
    }
  };

  // Inicializar Web Speech API cuando se monta el componente
  onMount(() => {
    inicializarVoz();

    // Ajustar tamaño del panel en mobile
    if (window.innerWidth < 600) {
      panelWidth = Math.max(280, window.innerWidth - 30);
      panelHeight = Math.min(400, window.innerHeight - 100);
    }
    // Limpieza: eliminar cualquier mensaje previo relacionado con gráficos para evitar render inline
    mensajes = mensajes.filter((m) => {
      const t = m && m.tipo ? String(m.tipo) : "";
      return !(t.startsWith("grafico") || m.grafico);
    });
  });

  // Auto-scroll a mensajes nuevos
  $: if (mensajesContainer && mensajes.length) {
    // Loguear si hay mensajes de tipo 'grafico' o que contienen 'grafico' (depuración)
    const graficosExistentes = mensajes.filter((m) => {
      const t = m && m.tipo ? String(m.tipo) : "";
      return t.toLowerCase().startsWith("grafico") || !!m.grafico;
    });
    if (graficosExistentes.length) {
      console.warn(
        "[Asistente] Mensajes con gráficos detectados (se mostrarán como texto en UI):",
        graficosExistentes,
      );
    }

    // Preparamos una versión segura para render (convertir mensajes 'grafico' a texto informativo)
    mensajesRendered = mensajes.map((m) => {
      const t = m && m.tipo ? String(m.tipo) : "";
      if (t.toLowerCase().startsWith("grafico") || (m && m.grafico)) {
        return {
          id: m.id || crypto.randomUUID(),
          emisor: "siga",
          tipo: "texto",
          contenido: "He generado un gráfico y lo abrí en una vista ampliada.",
        };
      }
      return m;
    });

    setTimeout(() => {
      if (mensajesContainer) {
        mensajesContainer.scrollTop = mensajesContainer.scrollHeight;
      }
    }, 50);
  }
</script>

<svelte:window
  on:mousemove={(e) => {
    manejarMovimiento(e);
    manejarResize(e);
  }}
  on:mouseup={() => {
    finalizarArrastre();
    finalizarResize();
  }}
/>

<div class="asistente-contextual {estaAbierto ? 'is-open' : ''}">
  <button
    bind:this={botonToggle}
    class="toggle-asistente"
    class:abierto={estaAbierto}
    on:click={abrirAsistente}
    aria-label={estaAbierto ? "Cerrar asistente" : "Abrir asistente"}
    title="Asistente contextual de SIGA"
  >
    <img src="/S.png" alt="SIGA" class="siga-logo" />
  </button>

  {#if estaAbierto}
    <div
      class="panel-asistente"
      bind:this={panelElement}
      style="left: {posX}px; top: {posY}px; width: {panelWidth}px; height: {panelHeight}px; cursor: {estaArrastrando
        ? 'grabbing'
        : estaRedimensionando
          ? 'nwse-resize'
          : 'default'}"
    >
      <div
        class="resize-handle-top"
        on:mousedown={iniciarResize}
        role="button"
        tabindex="0"
        title="Arrastra para agrandar/achicar"
      ></div>

      <div
        class="panel-header"
        on:mousedown={iniciarArrastre}
        role="button"
        tabindex="0"
      >
        <h3>🤖 SIGA Asistente</h3>
        <button
          type="button"
          class="btn-voz-header"
          class:activo={estamosUsandoVoz}
          on:click={iniciarGrabacion}
          disabled={estaPensando}
          title="Usar micrófono"
        >
          🎤
        </button>
        <button
          type="button"
          class="btn-grafico-quick"
          on:click={() => generarGraficoVentasPorLocal()}
          title="Generar gráfico de ventas por local"
          disabled={estaPensando}
        >
          📊
        </button>
      </div>

      <div class="mensajes-area" bind:this={mensajesContainer}>
        {#if mensajes.length === 0}
          <div class="mensaje-bienvenida">
            <p><strong>¡Hola! 👋</strong></p>
            <p>Soy tu asistente SIGA. Puedo ayudarte con:</p>
            <ul class="bienvenida-lista">
              <li>📊 Análisis de ventas y tendencias</li>
              <li>📦 Consultas sobre inventario</li>
              <li>⚠️ Alertas de stock crítico</li>
              <li>💡 Recomendaciones de gestión</li>
            </ul>
            <p class="hint">Escribe tu pregunta o usa el micrófono 🎤</p>
          </div>
        {/if}

        {#each mensajesRendered as mensaje (mensaje.id)}
          {#if mensaje.tipo === "texto"}
            <div class={`mensaje ${mensaje.emisor}`}>
              <p>{mensaje.contenido}</p>
            </div>
          {/if}
        {/each}

        {#if estaPensando}
          <div class="mensaje siga">
            <p class="pensando">
              <span></span>
              <span></span>
              <span></span>
            </p>
          </div>
        {/if}

        {#if mensajeError}
          <div class="mensaje error">
            <p>{mensajeError}</p>
          </div>
        {/if}
      </div>

      <form on:submit={manejarEnvio} class="input-area">
        <div class="input-group">
          <input
            type="text"
            bind:this={inputMensaje}
            bind:value={mensajeUsuario}
            placeholder="Escribe o usa micrófono..."
            disabled={estaPensando}
            class="mensaje-input"
            on:keydown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                manejarEnvio(e);
              }
            }}
          />
          <button
            type="submit"
            disabled={estaPensando || !mensajeUsuario.trim()}
            class="enviar-btn"
            aria-label="Enviar mensaje"
          >
            →
          </button>
        </div>
      </form>
    </div>
  {/if}

  {#if graficoAbierto && graficoActivo}
    <div class="grafico-modal-backdrop" class:animando={_modalAnimating}></div>
    <div
      class="grafico-modal movable"
      role="dialog"
      aria-label="Vista ampliada del gráfico"
      class:animando={_modalAnimating}
      style="left: {posX}px; top: {posY}px; background: rgba(255, 255, 255, 0.45); backdrop-filter: blur(20px) saturate(180%); -webkit-backdrop-filter: blur(20px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.5); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15); border-radius: 24px;"
    >
      <header
        class="grafico-modal-header"
        on:mousedown={iniciarArrastre}
        style="cursor: grab;"
      >
        <div>
          <strong>{graficoActivo.titulo}</strong>
          {#if modalExplicacion}
            <div class="grafico-explicacion-header">{modalExplicacion}</div>
          {/if}
        </div>
        <button
          class="cerrar-modal"
          on:click={() => {
            graficoAbierto = false;
            graficoActivo = null;
            modalExplicacion = "";
          }}>✕</button
        >
      </header>
      <div class="grafico-modal-body">
        {#if graficoActivo.tipo === "torta"}
          <GraficoTorta
            titulo={graficoActivo.titulo}
            etiquetas={graficoActivo.etiquetas}
            valores={graficoActivo.valores}
          />
        {:else if graficoActivo.tipo === "barras"}
          <GraficoBarras
            titulo={graficoActivo.titulo}
            etiquetas={graficoActivo.etiquetas}
            valores={graficoActivo.valores}
          />
        {:else if graficoActivo.tipo === "lineas"}
          <GraficoLineas
            titulo={graficoActivo.titulo}
            etiquetas={graficoActivo.etiquetas}
            valores={graficoActivo.valores}
          />
        {/if}
      </div>
      <!-- cierre único del bloque asistente-contextual -->
    </div>
  {/if}
</div>

<style>
  .asistente-contextual {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 999;
    font-family: "Inter", "Segoe UI", Roboto, sans-serif;
  }

  .toggle-asistente {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: rgba(140, 140, 140, 0.25);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    color: #ffffff;
    padding: 0;
    overflow: hidden;
  }

  .siga-logo {
    width: 85%;
    height: 85%;
    object-fit: contain;
    padding: 0px;
  }

  .icono-cerrar {
    position: absolute;
    font-size: 28px;
    animation: rotarX 0.3s ease;
  }

  @keyframes rotarX {
    from {
      transform: rotateY(90deg);
      opacity: 0;
    }
    to {
      transform: rotateY(0);
      opacity: 1;
    }
  }

  .toggle-asistente:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 32px rgba(3, 4, 94, 0.4);
  }

  .toggle-asistente:active {
    transform: scale(0.95);
  }

  .toggle-asistente.abierto {
    background: rgba(0, 180, 216, 0.45);
    border: 1px solid rgba(128, 255, 219, 0.5);
    box-shadow: 0 0 15px rgba(0, 180, 216, 0.3);
    color: #ffffff;
  }

  .panel-asistente {
    position: fixed;
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid var(--color-borde);
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(3, 4, 94, 0.2);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    user-select: none;
    backdrop-filter: blur(8px);
    transform: translateY(-80px);
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .panel-header {
    background: linear-gradient(
      135deg,
      var(--color-primario),
      var(--color-secundario)
    );
    color: #ffffff;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    cursor: grab;
    transition: all 0.2s ease;
  }

  .panel-header:active {
    cursor: grabbing;
  }

  .panel-header h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    flex: 1;
  }

  .btn-voz-header {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: #ffffff;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .btn-voz-header:hover:not(:disabled) {
    transform: scale(1.15);
    filter: brightness(1.1);
  }

  .btn-voz-header.activo {
    animation: grabarPulsoWhite 1s infinite;
  }

  @keyframes grabarPulsoWhite {
    0%,
    100% {
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
      transform: scale(1);
    }
    50% {
      box-shadow: 0 0 0 6px rgba(255, 255, 255, 0);
      transform: scale(1.1);
    }
  }

  .btn-voz-header:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .close-btn {
    background: none;
    border: none;
    color: #ffffff;
    cursor: pointer;
    font-size: 1.25rem;
    padding: 0;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease;
    flex-shrink: 0;
  }

  .close-btn:hover {
    transform: scale(1.2);
  }

  .mensajes-area {
    flex: 1;
    overflow-y: auto;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.7);
    min-height: 150px;
  }

  .mensaje-bienvenida {
    text-align: center;
    color: var(--color-primario);
    font-size: 13px;
    padding: 0.5rem;
  }

  .mensaje-bienvenida p {
    margin: 0.25rem 0;
  }

  .bienvenida-lista {
    list-style: none;
    padding: 0.5rem 0;
    margin: 0.5rem 0;
    text-align: left;
    font-size: 12px;
  }

  .bienvenida-lista li {
    padding: 0.2rem 0;
    color: #555;
  }

  .hint {
    margin-top: 0.5rem;
    font-size: 11px;
    color: #999;
    font-style: italic;
  }

  .mensaje {
    display: flex;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .mensaje.usuario {
    justify-content: flex-end;
  }

  .mensaje.usuario p {
    background-color: var(--color-secundario);
    color: #ffffff;
    padding: 0.75rem 1rem;
    border-radius: 12px 12px 0 12px;
    font-size: 0.9rem;
    line-height: 1.5;
    max-width: 85%;
    margin: 0;
    font-weight: 500;
  }

  .mensaje.siga p {
    background-color: #e8f4f8;
    color: var(--color-primario);
    padding: 0.75rem 1rem;
    border-radius: 12px 12px 12px 0;
    font-size: 0.9rem;
    line-height: 1.5;
    border-left: 4px solid var(--color-secundario);
    max-width: 85%;
    margin: 0;
    font-weight: 500;
  }

  .mensaje.error p {
    background-color: rgba(255, 71, 87, 0.1);
    color: #ff4757;
    padding: 0.75rem 1rem;
    border-radius: 12px;
    font-size: 0.9rem;
    border-left: 3px solid #ff4757;
    margin: 0;
  }

  .pensando {
    display: flex;
    gap: 4px;
    align-items: center;
    height: 1.2rem;
    margin: 0;
  }

  .pensando span {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: var(--color-secundario);
    animation: pulse 1.4s infinite;
  }

  .pensando span:nth-child(2) {
    animation-delay: 0.2s;
  }

  .pensando span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes pulse {
    0%,
    60%,
    100% {
      opacity: 0.3;
      transform: scale(0.8);
    }
    30% {
      opacity: 1;
      transform: scale(1);
    }
  }

  .input-area {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.75rem;
    border-top: 1px solid var(--color-borde);
    background-color: #ffffff;
    flex-shrink: 0;
  }

  .input-group {
    display: flex;
    gap: 0.5rem;
  }

  .mensaje-input {
    flex: 1;
    border: 2px solid var(--color-borde);
    border-radius: 8px;
    padding: 0.6rem 0.8rem;
    font-size: 0.85rem;
    font-family: inherit;
    color: var(--color-texto);
    background-color: #ffffff;
    transition: all 0.2s ease;
    font-weight: 500;
    max-height: 80px;
    overflow-y: auto;
  }

  .mensaje-input:focus {
    outline: none;
    border-color: var(--color-secundario);
    box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.2);
  }

  .mensaje-input::placeholder {
    color: rgba(27, 35, 63, 0.6);
    font-weight: 400;
  }

  .mensaje-input:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
    opacity: 0.7;
  }

  .enviar-btn {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background-color: var(--color-primario);
    color: #ffffff;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    transition: all 0.2s ease;
    font-weight: 700;
    flex-shrink: 0;
  }

  .enviar-btn:hover:not(:disabled) {
    background-color: #051a8f;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(3, 4, 94, 0.2);
  }

  .enviar-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .grafico-mensaje {
    flex-direction: column;
    width: 100%;
    max-width: 100%;
  }

  .grafico-inline-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    width: 100%;
    padding: 0.6rem;
    border-radius: 8px;
    background: linear-gradient(180deg, #f7fbff, #ffffff);
    border: 1px solid rgba(3, 4, 94, 0.06);
  }

  .grafico-card-info strong {
    display: block;
    font-size: 0.95rem;
    color: var(--color-primario);
  }

  .grafico-card-meta {
    font-size: 0.8rem;
    color: #6b7280;
  }

  .grafico-card-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .abrir-grafico-btn {
    background: var(--color-secundario);
    color: white;
    border: none;
    padding: 0.4rem 0.7rem;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
  }

  .abrir-grafico-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(3, 4, 94, 0.12);
  }

  .grafico-contenedor {
    width: 100%;
    height: 280px;
    background: #f0f7ff;
    border-radius: 8px;
    padding: 0.5rem;
    margin-top: 0.5rem;
    border: 1px solid var(--color-borde);
  }

  .resize-handle-top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    cursor: ns-resize;
    background: linear-gradient(
      to bottom,
      var(--color-secundario),
      transparent
    );
    opacity: 0.2;
    transition: opacity 0.2s ease;
    z-index: 10;
  }

  .resize-handle-top:hover {
    opacity: 0.7;
  }

  @media screen and (max-width: 768px) {
    .asistente-contextual {
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      z-index: 999;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: flex-end;
      pointer-events: none;
      gap: 1rem;
    }

    .toggle-asistente {
      width: 52px;
      height: 52px;
      font-size: 1.75rem;
      position: relative;
      pointer-events: auto;
    }

    .panel-asistente {
      width: calc(100vw - 2rem) !important;
      height: 70vh !important;
      position: fixed !important;
      bottom: 5rem !important;
      right: 1rem !important;
      left: 1rem !important;
      top: auto !important;
      pointer-events: auto;
    }
  }

  /* Modal para vista ampliada de gráficos */
  .grafico-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(2, 6, 23, 0.55);
    z-index: 1100;
    pointer-events: none;
    backdrop-filter: blur(6px) saturate(120%);
    transition:
      opacity 360ms cubic-bezier(0.2, 0.9, 0.2, 1),
      transform 360ms cubic-bezier(0.2, 0.9, 0.2, 1);
    opacity: 0.55;
  }

  .grafico-modal.movable {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    /* Se sobrescribe con left/top dinámicos al mover */
    cursor: default;
    z-index: 1101;
  }
  .grafico-modal-header {
    user-select: none;
  }
  .grafico-explicacion-header {
    font-family: "Inter", sans-serif;
    font-size: 0.95rem;
    color: #24303a;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    font-weight: 400;
    opacity: 0.9;
  }

  .grafico-modal.animando {
    transform: translate(-50%, -50%) scale(1.01);
    opacity: 1;
    box-shadow: 0 50px 110px rgba(2, 6, 23, 0.5);
  }

  .grafico-modal.animando {
    animation: modalFlyIn 420ms cubic-bezier(0.2, 0.9, 0.2, 1) both;
  }

  @keyframes modalFlyIn {
    from {
      transform: translate(
          calc(var(--modal-start-x) - 50vw),
          calc(var(--modal-start-y) - 50vh)
        )
        scale(0.28);
      opacity: 0;
    }
    to {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }

  .grafico-modal-backdrop.animando {
    opacity: 1;
    transform: none;
  }

  .grafico-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.15);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    font-weight: 700;
  }

  .cerrar-modal {
    background: transparent;
    border: none;
    font-size: 1.25rem;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
  }

  .grafico-modal-body {
    flex: 1;
    padding: 1rem;
    display: flex;
    align-items: stretch;
    justify-content: center;
    min-height: 0;
  }

  .grafico-modal-footer {
    padding: 0.75rem 1rem;
    border-top: 1px solid var(--color-borde);
    background: linear-gradient(180deg, rgba(3, 4, 94, 0.02), transparent);
    font-size: 0.95rem;
    color: #24303a;
  }

  .grafico-explicacion {
    line-height: 1.4;
  }

  .grafico-modal-body :global(.contenedor-grafico) {
    width: 100%;
    height: 100%;
    min-height: 320px;
  }
</style>
