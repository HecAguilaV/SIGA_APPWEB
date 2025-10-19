<script>
  import { onMount } from 'svelte';

  let swaggerReady = false;

  onMount(async () => {
    // Cargar CSS primero
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@4/swagger-ui.css';
    document.head.appendChild(link);

    // Cargar Swagger UI Bundle
    const script1 = document.createElement('script');
    script1.src = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@4/swagger-ui-bundle.js';
    
    script1.onload = () => {
      // Cargar Swagger UI Standalone Preset
      const script2 = document.createElement('script');
      script2.src = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@4/swagger-ui-standalone-preset.js';
      
      script2.onload = () => {
        // Inicializar Swagger UI
        const ui = window.SwaggerUIBundle({
          url: '/api/openapi',
          dom_id: '#swagger-ui',
          deepLinking: true,
          presets: [
            window.SwaggerUIBundle.presets.apis,
            window.SwaggerUIStandalonePreset
          ],
          plugins: [
            window.SwaggerUIBundle.plugins.DownloadUrl
          ],
          layout: 'StandaloneLayout'
        });
        
        window.ui = ui;
        swaggerReady = true;
      };
      document.head.appendChild(script2);
    };
    document.head.appendChild(script1);
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
