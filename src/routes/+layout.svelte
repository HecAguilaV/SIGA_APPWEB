<script>
  // Importamos los estilos globales y la barra de navegación compartida
  import '../app.css';
  import Navbar from '$lib/components/Navbar.svelte';
  import AsistenteContextual from '$lib/components/AsistenteContextual.svelte';
</script>

<Navbar />

<main class="section">
  <div class="container">
    <slot />
  </div>
</main>

<AsistenteContextual />

<footer class="footer">
  <div class="content has-text-centered">
    <p>
      <strong>SIGA</strong> - Sistema Inteligente de Gestión de Almacenes
    </p>
    <p>
      <small>© 2025 Todos los derechos reservados | Desarrollado con ❤️</small>
    </p>
  </div>
</footer>

<style>
  :global(body) {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  :global(main) {
    flex: 1;
  }

  .footer {
    background-color: #03045e;
    color: #ffffff;
    padding: 2rem 1.5rem;
    text-align: center;
    margin-top: 3rem;
    border-top: 1px solid #00b4d8;
  }

  .footer p {
    margin: 0.5rem 0;
  }

  .footer strong {
    color: #00b4d8;
  }

  .footer small {
    opacity: 0.8;
  }
</style>