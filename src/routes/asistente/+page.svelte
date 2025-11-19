<script>
  import GraficoTorta from '$lib/components/GraficoTorta.svelte';
  import { datosNegocio } from '$lib/datosSimulados.js';

  let mensajeUsuario = '';
  /** @typedef {{ id: string; emisor: 'usuario' | 'siga'; tipo: 'texto' | 'grafico-mermas'; contenido?: string }} MensajeConversacion */
  /** @type {MensajeConversacion[]} */
  let mensajes = [];
  let estaPensando = false;
  let mensajeError = '';
  /** @type {any} */
  let graficoActivo = null;
  /** @type {boolean} */
  let graficoAbierto = false;

  $: mermas = $datosNegocio.mermasMes ?? [];

  /**
   * Prepara los datos para el gráfico de mermas transformando las parejas (categoría, cantidad) en etiquetas y valores.
   * Propósito: reutilizar la lógica de transformación en múltiples renderizados sin duplicación de código.
   */
  const obtenerDatosMermas = () => {
    const etiquetas = mermas.map((item) => item.categoria);
    const valores = mermas.map((item) => item.cantidad);
    return { etiquetas, valores };
  };

  /**
   * Envía el mensaje del usuario al backend y gestiona la respuesta del asistente.
   * Propósito: centralizar la lógica de conversación, incluyendo manejo de errores y del estado de carga.
   */
  const enviarMensaje = async () => {
    const contenido = mensajeUsuario.trim();
    if (!contenido) {
      return;
    }

    mensajes = [
      ...mensajes,
      { id: crypto.randomUUID(), emisor: 'usuario', tipo: 'texto', contenido }
    ];
    mensajeUsuario = '';
    estaPensando = true;
    mensajeError = '';

    try {
      const respuesta = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mensaje: contenido })
      });

      if (!respuesta.ok) {
        throw new Error('No fue posible conectar con SIGA. Intenta nuevamente.');
      }

      const datos = await respuesta.json();
      const textoIA = datos.respuesta ?? '';

      if (typeof textoIA === 'string' && textoIA.includes('[GRAFICO_MERMAS]')) {
        // Generar datos de mermas y abrir modal en vez de insertar inline
        const datos = obtenerDatosMermas();
        graficoActivo = { tipo: 'torta', titulo: 'Mermas mensuales por categoría', etiquetas: datos.etiquetas, valores: datos.valores };
        graficoAbierto = true;
        const resumen = `He generado un gráfico de mermas por categoría.`;
        mensajes = [
          ...mensajes,
          { id: crypto.randomUUID(), emisor: 'siga', tipo: 'texto', contenido: resumen }
        ];
      } else {
        mensajes = [
          ...mensajes,
          { id: crypto.randomUUID(), emisor: 'siga', tipo: 'texto', contenido: textoIA || 'Estoy aquí para ayudarte.' }
        ];
      }
    } catch (error) {
      console.error(error);
      mensajeError = 'No pudimos obtener la respuesta. Por favor, revisa tu conexión o inténtalo más tarde.';
    } finally {
      estaPensando = false;
    }
  };

  /**
   * Gestiona el envío vía formulario evitando el comportamiento por defecto del navegador.
   * Propósito: permitir el uso de Enter sin recargar la página y mantener un flujo de conversación fluido.
   * @param {SubmitEvent} evento
   */
  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    await enviarMensaje();
  };
</script>

<section class="section">
  <div class="box">
    <h1 class="title has-text-weight-semibold">Asistente con IA</h1>
    <p class="subtitle">Pregunta lo que necesites. SIGA usa IA real para recomendaciones sin esperas.</p>

    <div class="chat-container">
      <div class="mensajes">
        {#each mensajes as mensaje (mensaje.id)}
          {#if mensaje.tipo === 'texto'}
            <div class={`mensaje ${mensaje.emisor === 'usuario' ? 'es-usuario' : 'es-siga'}`}>
              <p>{mensaje.contenido}</p>
            </div>
          {:else if mensaje.tipo === 'grafico-mermas'}
            <div class="mensaje es-siga">
              <p class="mb-3">He generado un gráfico de mermas; lo abrí en una vista ampliada.</p>
              <button class="button is-small" on:click={() => { graficoActivo = { tipo: 'torta', titulo: 'Mermas mensuales por categoría', etiquetas: obtenerDatosMermas().etiquetas, valores: obtenerDatosMermas().valores }; graficoAbierto = true; }}>Abrir gráfico</button>
            </div>
          {/if}
        {/each}

        {#if estaPensando}
          <div class="mensaje es-siga pensando">
            <span class="loader"></span>
            <span>SIGA está pensando...</span>
          </div>
        {/if}

        {#if mensajeError}
          <div class="notification is-danger mt-4">
            {mensajeError}
          </div>
        {/if}
      </div>

      <form class="formulario" on:submit={manejarEnvio}>
        <div class="field has-addons">
          <div class="control is-expanded">
            <input
              class="input is-medium"
              type="text"
              placeholder="Escribe tu consulta..."
              bind:value={mensajeUsuario}
              on:keydown={(evento) => {
                if (evento.key === 'Enter' && !evento.shiftKey) {
                  evento.preventDefault();
                  enviarMensaje();
                }
              }}
            />
          </div>
          <div class="control">
            <button class="button is-link is-medium" type="submit" disabled={estaPensando}>
              Enviar
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>

  {#if graficoAbierto && graficoActivo}
    <div class="grafico-modal-backdrop"></div>
    <div class="grafico-modal">
      <header class="grafico-modal-header">
        <strong>{graficoActivo.titulo}</strong>
        <button class="button is-small" on:click={() => { graficoAbierto = false; graficoActivo = null; }}>✕</button>
      </header>
      <div class="grafico-modal-body">
        {#if graficoActivo.tipo === 'torta'}
          <GraficoTorta titulo={graficoActivo.titulo} etiquetas={graficoActivo.etiquetas} valores={graficoActivo.valores} />
        {:else}
          <GraficoTorta titulo={graficoActivo.titulo} etiquetas={graficoActivo.etiquetas} valores={graficoActivo.valores} />
        {/if}
      </div>
      <footer class="grafico-modal-footer">
        <div class="grafico-explicacion">Resumen: muestra '{graficoActivo.titulo}'.</div>
      </footer>
    </div>
  {/if}
</section>

<style>
  .chat-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .mensajes {
    max-height: 480px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-right: 0.5rem;
  }

  /* Modal styles para gráfico */
  .grafico-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(2,6,23,0.45);
    z-index: 1200;
  }

  .grafico-modal {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: min(900px, 90vw);
    height: min(640px, 78vh);
    background: rgba(255,255,255,0.98);
    border-radius: 12px;
    z-index: 1201;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 30px 60px rgba(2,6,23,0.25);
  }

  .grafico-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--color-borde);
  }

  .grafico-modal-body {
    flex: 1;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .grafico-modal-footer {
    padding: 0.75rem 1rem;
    border-top: 1px solid var(--color-borde);
    background: linear-gradient(180deg, rgba(3,4,94,0.02), transparent);
  }

  .grafico-explicacion { line-height: 1.4; }

  .mensaje {
    padding: 1rem;
    border-radius: 12px;
    max-width: 80%;
  }

  .mensaje.es-usuario {
    align-self: flex-end;
    background-color: var(--color-secundario);
    color: #fff;
  }

  .mensaje.es-siga {
    align-self: flex-start;
    background-color: #fff;
    border: 1px solid var(--color-borde);
  }

  .mensaje.pensando {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .formulario {
    position: sticky;
    bottom: 0;
    background-color: var(--color-fondo);
    padding: 1rem 0 0;
  }

  .loader {
    width: 1rem;
    height: 1rem;
    border: 2px solid var(--color-secundario);
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotacion 1s linear infinite;
  }

  @keyframes rotacion {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>