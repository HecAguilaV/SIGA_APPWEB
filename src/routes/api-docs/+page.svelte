<script>
  import { onMount } from 'svelte';

  let swaggerReady = false;

  onMount(async () => {
    // Importar Swagger UI desde CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@4/swagger-ui-bundle.js';
    script.onload = () => {
      // Inicializar Swagger UI
      window.onload = function() {
        window.ui = SwaggerUIBundle({
          url: '/api/openapi',
          dom_id: '#swagger-ui',
          deepLinking: true,
          presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIBundle.SwaggerUIStandalonePreset
          ],
          plugins: [SwaggerUIBundle.plugins.DownloadUrl],
          layout: 'StandaloneLayout'
        });
      };
      window.onload();
      swaggerReady = true;
    };
    document.head.appendChild(script);

    // Cargar CSS de Swagger UI
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@4/swagger-ui.css';
    document.head.appendChild(link);
  });
</script>

<div id="swagger-ui" style="min-height: 100vh;"></div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: #fafafa;
  }

  :global(.swagger-ui) {
    font-family: sans-serif;
  }

  :global(.swagger-ui .topbar) {
    background-color: #03045e;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
  }

  :global(.swagger-ui .btn) {
    border-color: #00b4d8;
    color: #00b4d8;
  }

  :global(.swagger-ui .btn:hover) {
    background-color: #00b4d8;
    color: white;
  }

  :global(.swagger-ui .scheme-container) {
    background-color: #f5f5f5;
    border-radius: 4px;
  }

  :global(.swagger-ui .model-hint) {
    color: #03045e;
  }

  :global(.swagger-ui .model-box) {
    background-color: rgba(0, 180, 216, 0.1);
    border: 1px solid #00b4d8;
  }

  :global(.swagger-ui textarea) {
    border: 1px solid #00b4d8;
    border-radius: 4px;
  }

  :global(.swagger-ui button.authorize) {
    background-color: #03045e;
    border-color: #00b4d8;
  }

  :global(.swagger-ui .model-toggle::after) {
    background-color: #03045e;
  }
</style>
