<script lang="ts">
  import { datosNegocio } from '$lib/datosSimulados.js';

  let localSeleccionado = 0;
  let ordenarPor = 'nombre';
  let ordenAscendente = true;
  let mostrarFormulario = false;
  let mostrarEdicion = false;
  let productoEditando = null;
  let formulario = {
    nombre: '',
    sku: '',
    categoria: ''
  };
  let formularioEdicion = {
    id: null,
    nombre: '',
    sku: '',
    categoria: ''
  };

  // Esta reacción asegura que siempre tengamos un local activo cuando el store cargue datos
  // Propósito: evitar que la tabla se renderice vacía y guiar al usuario con una selección por defecto
  $: {
    const localesDisponibles = $datosNegocio.locales ?? [];
    if (!localSeleccionado && localesDisponibles.length) {
      localSeleccionado = localesDisponibles[0].id;
    }
  }

  // Computamos los productos con el stock filtrado según el local seleccionado
  // Propósito: mostrar información relevante de inventario de manera rápida
  $: productosFiltrados = ($datosNegocio.productos ?? [])
    .filter((producto: any) => producto.activo !== false)
    .map((producto: any) => {
      const stockPorLocal = (producto.stock ?? {}) as Record<string | number, number>;
      const stockActual = stockPorLocal[localSeleccionado] ?? stockPorLocal[String(localSeleccionado)] ?? 0;
      return { ...producto, stockActual };
    });

  // Aplicar ordenamiento a los productos
  $: productosOrdenados = [...productosFiltrados].sort((a, b) => {
    let valorA = 0;
    let valorB = 0;

    if (ordenarPor === 'nombre') {
      valorA = a.nombre.toLowerCase() > b.nombre.toLowerCase() ? 1 : -1;
      valorB = 0;
    } else if (ordenarPor === 'sku') {
      valorA = a.sku.toLowerCase() > b.sku.toLowerCase() ? 1 : -1;
      valorB = 0;
    } else if (ordenarPor === 'categoria') {
      valorA = a.categoria.toLowerCase() > b.categoria.toLowerCase() ? 1 : -1;
      valorB = 0;
    } else if (ordenarPor === 'stock') {
      valorA = a.stockActual;
      valorB = b.stockActual;
    }

    const resultado = valorA < valorB ? -1 : valorA > valorB ? 1 : 0;
    return ordenAscendente ? resultado : -resultado;
  });

  /**
   * Cambia el criterio de ordenamiento
   * @param {string} columna
   */
  const cambiarOrdenamiento = (columna: string) => {
    if (ordenarPor === columna) {
      // Si ya estamos ordenando por esta columna, invertir el orden
      ordenAscendente = !ordenAscendente;
    } else {
      // Si cambiamos de columna, empezar con orden ascendente
      ordenarPor = columna;
      ordenAscendente = true;
    }
  };

  /**
   * Retorna el indicador visual del ordenamiento
   * @param {string} columna
   */
  const obtenerIndicador = (columna: string) => {
    if (ordenarPor !== columna) return '';
    return ordenAscendente ? ' ↑' : ' ↓';
  };

  /**
   * Actualiza el local seleccionado cuando el usuario cambia la opción del dropdown.
   * Propósito: mantener sincronizado el filtro del inventario con la preferencia del usuario.
   * @param {Event} evento
   */
  const cambiarLocal = (evento: Event) => {
    // Propósito: actualizar el filtro de local de forma controlada
    const elemento = evento.currentTarget as HTMLSelectElement;
    if (elemento) {
      localSeleccionado = Number(elemento.value);
    }
  };

  /**
   * Crear producto a través del formulario tradicional
   */
  const crearProducto = async () => {
    if (!formulario.nombre.trim() || !formulario.categoria.trim()) {
      alert('Por favor completa los campos obligatorios');
      return;
    }

    try {
      const res = await fetch('/api/productos/crear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formulario.nombre,
          categoria: formulario.categoria,
          sku: formulario.sku || undefined
        })
      });

      const datos = await res.json();
      if (datos.success) {
        datosNegocio.set(datos.datos);
        formulario = { nombre: '', sku: '', categoria: '' };
        mostrarFormulario = false;
        alert('✅ Producto creado exitosamente');
      } else {
        alert('❌ Error al crear producto');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('❌ Error en la conexión');
    }
  };

  /**
   * Abre el formulario de edición con los datos del producto
   */
  const abrirEdicion = (producto: any) => {
    formularioEdicion = {
      id: producto.id,
      nombre: producto.nombre,
      sku: producto.sku,
      categoria: producto.categoria
    };
    productoEditando = producto;
    mostrarEdicion = true;
  };

  /**
   * Editar producto a través del formulario
   */
  const editarProducto = async () => {
    if (!formularioEdicion.nombre.trim() || !formularioEdicion.categoria.trim()) {
      alert('Por favor completa los campos obligatorios');
      return;
    }

    try {
      const res = await fetch('/api/productos/editar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: formularioEdicion.id,
          nombre: formularioEdicion.nombre,
          sku: formularioEdicion.sku || undefined,
          categoria: formularioEdicion.categoria
        })
      });

      const datos = await res.json();
      if (datos.success) {
        datosNegocio.set(datos.datos);
        mostrarEdicion = false;
        formularioEdicion = { id: null, nombre: '', sku: '', categoria: '' };
        alert('✅ Producto actualizado exitosamente');
      } else {
        alert('❌ Error al actualizar producto');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('❌ Error en la conexión');
    }
  };

  /**
   * Cierra el formulario de edición
   */
  const cerrarEdicion = () => {
    mostrarEdicion = false;
    formularioEdicion = { id: null, nombre: '', sku: '', categoria: '' };
    productoEditando = null;
  };

  /**
   * Elimina/desactiva un producto
   */
  const eliminarProducto = async (producto: any) => {
    const confirmacion = confirm(
      `⚠️ ¿Estás seguro de que deseas desactivar "${producto.nombre}"?\n\nEsta acción ocultará el producto de la lista pero no eliminará su historial de ventas.`
    );

    if (!confirmacion) return;

    try {
      const res = await fetch('/api/productos/eliminar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: producto.id })
      });

      const datos = await res.json();
      if (datos.success) {
        datosNegocio.set(datos.datos);
        alert('✅ Producto desactivado exitosamente');
      } else {
        alert('❌ Error al desactivar producto');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('❌ Error en la conexión');
    }
  };
</script>

<section class="section">
  <div class="hero-gradient mb-6">
    <div class="columns is-vcentered">
      <div class="column">
        <span class="etiqueta">Sistema Inteligente de Gestión de Activos</span>
        <h1 class="title heading-gradient">Gestiona tu tiempo, no tu inventario</h1>
        <p class="subtitle mt-3">SIGA es tu ERP simplificado. Automatiza el control de stock en tiempo real para que te enfoques en lo que realmente importa: crecer sin interrupciones.</p>
        <div class="buttons mt-5">
          <a class="button is-link is-medium" href="/analisis">Descubre las insights</a>
        </div>
      </div>
    </div>
  </div>

  <!-- KPI Cards para inversores -->
  <div class="columns is-multiline mb-6">
    <div class="column is-half-tablet is-one-third-desktop">
      <div class="kpi-card">
        <p class="heading is-6" style="color: var(--color-primario);">Productos en Stock</p>
        <p class="title is-4" style="color: var(--color-secundario);">{$datosNegocio.productos?.length || 0}</p>
        <p class="is-size-7">SKU activos en el sistema</p>
      </div>
    </div>
    <div class="column is-half-tablet is-one-third-desktop">
      <div class="kpi-card">
        <p class="heading is-6" style="color: var(--color-primario);">Locales Conectados</p>
        <p class="title is-4" style="color: var(--color-secundario);">{$datosNegocio.locales?.length || 0}</p>
        <p class="is-size-7">Kioscos monitoreados</p>
      </div>
    </div>
    <div class="column is-half-tablet is-one-third-desktop">
      <div class="kpi-card">
        <p class="heading is-6" style="color: var(--color-primario);">Precisión de Datos</p>
        <p class="title is-4" style="color: #388e3c;">99.2%</p>
        <p class="is-size-7">Confiabilidad en tiempo real</p>
      </div>
    </div>
  </div>

  <div class="box">
    <h2 class="title is-3 has-text-weight-semibold">Stock por sucursal</h2>
    <p class="subtitle is-5">Visualiza el inventario en tiempo real. Ordena por lo que necesites y actúa al instante.</p>

    <!-- Botón para mostrar/ocultar formulario -->
    <div class="mb-5">
      <button 
        class="button is-info is-outlined"
        on:click={() => (mostrarFormulario = !mostrarFormulario)}
      >
        {mostrarFormulario ? '✖ Cancelar' : '+ Agregar Producto'}
      </button>
    </div>

    <!-- Formulario tradicional -->
    {#if mostrarFormulario}
      <div class="box formulario-producto" style="margin-bottom: 2rem; background-color: #ffffff; border: 2px solid var(--color-secundario);">
        <h3 class="title is-5" style="color: var(--color-primario);">Crear Nuevo Producto</h3>
        <div class="columns">
          <div class="column is-half">
            <div class="field">
              <label class="label" style="color: var(--color-primario); font-weight: 600;" for="nombre_producto">Nombre del Producto *</label>
              <div class="control">
                <input 
                  id="nombre_producto"
                  class="input" 
                  type="text"
                  placeholder="Ej: Rollos de Canela"
                  bind:value={formulario.nombre}
                  style="color: #333; background-color: #ffffff; border: 1px solid var(--color-secundario);"
                />
              </div>
            </div>
          </div>
          <div class="column is-half">
            <div class="field">
              <label class="label" style="color: var(--color-primario); font-weight: 600;" for="sku_producto">SKU (Opcional)</label>
              <div class="control">
                <input 
                  id="sku_producto"
                  class="input" 
                  type="text"
                  placeholder="Ej: RC-001"
                  bind:value={formulario.sku}
                  style="color: #333; background-color: #ffffff; border: 1px solid var(--color-secundario);"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label" style="color: var(--color-primario); font-weight: 600;" for="categoria_producto">Categoría *</label>
          <div class="control">
            <input 
              id="categoria_producto"
              class="input" 
              type="text"
              placeholder="Ej: Pastelería"
              bind:value={formulario.categoria}
              style="color: #333; background-color: #ffffff; border: 1px solid var(--color-secundario);"
            />
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button 
              class="button is-success"
              on:click={crearProducto}
            >
              Crear Producto
            </button>
          </div>
          <div class="control">
            <button 
              class="button is-light"
              on:click={() => (mostrarFormulario = false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    {/if}

    <!-- Botones de selección de locales (horizontales con espaciado simétrico) -->
    <div class="local-selector mt-5 mb-5">
      {#each $datosNegocio.locales as local}
        <button
          class={`local-btn ${localSeleccionado === local.id ? 'is-active' : ''}`}
          on:click={() => (localSeleccionado = local.id)}
          aria-pressed={localSeleccionado === local.id}
        >
          {local.nombre}
        </button>
      {/each}
    </div>

    <div class="table-wrapper">
      <div class="table-container">
        <table class="table is-fullwidth is-striped is-hoverable">
          <thead>
            <tr>
              <th class="sortable-header" on:click={() => cambiarOrdenamiento('nombre')}>
                Nombre{obtenerIndicador('nombre')}
              </th>
              <th class="sortable-header" on:click={() => cambiarOrdenamiento('sku')}>
                SKU{obtenerIndicador('sku')}
              </th>
              <th class="sortable-header" on:click={() => cambiarOrdenamiento('categoria')}>
                Categoría{obtenerIndicador('categoria')}
              </th>
              <th class="sortable-header has-text-right" on:click={() => cambiarOrdenamiento('stock')}>
                Stock actual{obtenerIndicador('stock')}
              </th>
              <th class="has-text-centered" style="width: 160px;">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {#each productosOrdenados as producto}
              {#if producto.stockActual === 0}
                <tr style="background-color: rgba(211, 47, 47, 0.08);">
                  <td><strong>{producto.nombre}</strong></td>
                  <td>{producto.sku}</td>
                  <td>{producto.categoria}</td>
                  <td class="has-text-right"><span class="status-critico">SIN STOCK</span></td>
                  <td class="has-text-centered">
                    <div class="buttons are-small" style="gap: 0.25rem; justify-content: center;">
                      <button 
                        class="button is-small is-info is-outlined"
                        on:click={() => abrirEdicion(producto)}
                        title="Editar producto"
                        type="button"
                      >
                        ✎
                      </button>
                      <button 
                        class="button is-small is-danger is-outlined"
                        on:click={() => eliminarProducto(producto)}
                        title="Eliminar producto"
                        type="button"
                      >
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              {:else if producto.stockActual < 5}
                <tr style="background-color: rgba(245, 124, 0, 0.08);">
                  <td><strong>{producto.nombre}</strong></td>
                  <td>{producto.sku}</td>
                  <td>{producto.categoria}</td>
                  <td class="has-text-right"><span class="status-advertencia">{producto.stockActual}</span></td>
                  <td class="has-text-centered">
                    <div class="buttons are-small" style="gap: 0.25rem; justify-content: center;">
                      <button 
                        class="button is-small is-info is-outlined"
                        on:click={() => abrirEdicion(producto)}
                        title="Editar producto"
                        type="button"
                      >
                        ✎
                      </button>
                      <button 
                        class="button is-small is-danger is-outlined"
                        on:click={() => eliminarProducto(producto)}
                        title="Eliminar producto"
                        type="button"
                      >
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              {:else}
                <tr>
                  <td>{producto.nombre}</td>
                  <td>{producto.sku}</td>
                  <td>{producto.categoria}</td>
                  <td class="has-text-right"><span class="status-normal">{producto.stockActual}</span></td>
                  <td class="has-text-centered">
                    <div class="buttons are-small" style="gap: 0.25rem; justify-content: center;">
                      <button 
                        class="button is-small is-info is-outlined"
                        on:click={() => abrirEdicion(producto)}
                        title="Editar producto"
                        type="button"
                      >
                        ✎
                      </button>
                      <button 
                        class="button is-small is-danger is-outlined"
                        on:click={() => eliminarProducto(producto)}
                        title="Eliminar producto"
                        type="button"
                      >
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              {/if}
            {/each}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal de Edición de Producto -->
    {#if mostrarEdicion}
      <div class="modal is-active">
        <button 
          class="modal-background" 
          on:click={cerrarEdicion}
          aria-label="close"
          type="button"
        ></button>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Editar Producto</p>
            <button 
              class="delete" 
              aria-label="close"
              on:click={cerrarEdicion}
              type="button"
            ></button>
          </header>
          <section class="modal-card-body">
            <div class="field">
              <label class="label" style="color: var(--color-primario); font-weight: 600;" for="edit_nombre_producto">Nombre del Producto *</label>
              <div class="control">
                <input 
                  id="edit_nombre_producto"
                  class="input" 
                  type="text"
                  placeholder="Nombre del producto"
                  bind:value={formularioEdicion.nombre}
                  style="color: #333; background-color: #ffffff; border: 1px solid var(--color-secundario);"
                />
              </div>
            </div>
            <div class="columns">
              <div class="column is-half">
                <div class="field">
                  <label class="label" style="color: var(--color-primario); font-weight: 600;" for="edit_sku_producto">SKU (Opcional)</label>
                  <div class="control">
                    <input 
                      id="edit_sku_producto"
                      class="input" 
                      type="text"
                      placeholder="Ej: RC-001"
                      bind:value={formularioEdicion.sku}
                      style="color: #333; background-color: #ffffff; border: 1px solid var(--color-secundario);"
                    />
                  </div>
                </div>
              </div>
              <div class="column is-half">
                <div class="field">
                  <label class="label" style="color: var(--color-primario); font-weight: 600;" for="edit_categoria_producto">Categoría *</label>
                  <div class="control">
                    <input 
                      id="edit_categoria_producto"
                      class="input" 
                      type="text"
                      placeholder="Ej: Pastelería"
                      bind:value={formularioEdicion.categoria}
                      style="color: #333; background-color: #ffffff; border: 1px solid var(--color-secundario);"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button 
              class="button is-light"
              on:click={cerrarEdicion}
              type="button"
            >
              Cancelar
            </button>
            <button 
              class="button is-warning"
              on:click={editarProducto}
              type="button"
            >
              Guardar Cambios
            </button>
          </footer>
        </div>
      </div>
    {/if}
  </div>
</section>

<style>
  .etiqueta {
    display: inline-block;
    padding: 0.4rem 0.9rem;
    border-radius: 999px;
    background-color: rgba(3, 4, 94, 0.1);
    color: var(--color-primario);
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .hero-logo {
    max-width: 150px;
    height: auto;
    filter: drop-shadow(0 8px 16px rgba(3, 4, 94, 0.15));
  }

  /* Botones horizontales para seleccionar locales */
  .local-selector {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    background-color: rgba(0, 180, 216, 0.08);
    padding: 1.5rem;
    border-radius: 12px;
  }

  .local-btn {
    padding: 0.75rem 1.75rem;
    border: 2px solid transparent;
    border-radius: 10px;
    background-color: transparent;
    color: var(--color-primario);
    font-weight: 600;
    font-size: 15px;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .local-btn:hover {
    background-color: rgba(0, 180, 216, 0.15);
    border-color: var(--color-primario);
    transform: translateY(-2px);
  }

  .local-btn.is-active {
    background-color: var(--color-primario);
    border-color: var(--color-primario);
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(3, 4, 94, 0.2);
  }

  .local-btn.is-active:hover {
    background-color: #051a8f;
    border-color: #051a8f;
    box-shadow: 0 6px 16px rgba(3, 4, 94, 0.3);
  }

  /* Estilos para la tabla */
  .table-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 1.5rem;
  }

  .table-container {
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
    padding: 0 1rem;
  }

  /* Encabezados sortables */
  :global(.sortable-header) {
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s ease, color 0.2s ease;
    padding: 1.25rem !important;
    font-weight: 700;
    white-space: nowrap;
  }

  :global(.sortable-header:hover) {
    background-color: rgba(0, 180, 216, 0.1) !important;
    color: var(--color-secundario);
  }

  /* Mejorar espaciado de celdas */
  :global(.table td),
  :global(.table th) {
    padding: 1.25rem !important;
    vertical-align: middle;
  }

  :global(.table tbody td) {
    font-size: 0.95rem;
  }

  /* Estilos para el modal */
  :global(.modal-card-head) {
    background-color: var(--color-primario);
    border-bottom: 2px solid var(--color-secundario);
  }

  :global(.modal-card-title) {
    color: #ffffff;
    font-weight: 600;
    font-size: 1.1rem;
  }

  :global(.modal-card-foot) {
    border-top: 1px solid #e0e0e0;
    background-color: #f5f5f5;
  }

  @media screen and (max-width: 768px) {
    .hero-logo {
      max-width: 120px;
    }

    :global(.table td),
    :global(.table th) {
      padding: 0.9rem !important;
    }

    :global(.sortable-header) {
      padding: 0.9rem !important;
      font-size: 0.9rem;
    }

    .local-selector {
      padding: 1rem;
      gap: 0.75rem;
    }

    .local-btn {
      padding: 0.6rem 1rem;
      font-size: 13px;
    }
  }
</style>