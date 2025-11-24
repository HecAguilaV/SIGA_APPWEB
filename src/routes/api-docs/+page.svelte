<script lang="ts">
  import { onMount } from 'svelte';

  let swaggerReady = false;
  let error: string | null = null;

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
        try {
          // Inicializar Swagger UI
          const ui = (window as any).SwaggerUIBundle({
            url: '/api/openapi',
            dom_id: '#swagger-ui',
            deepLinking: true,
            presets: [
              (window as any).SwaggerUIBundle.presets.apis,
              (window as any).SwaggerUIStandalonePreset
            ],
            plugins: [
              (window as any).SwaggerUIBundle.plugins.DownloadUrl
            ],
            layout: 'StandaloneLayout',
            onComplete: () => {
              swaggerReady = true;
            }
          });
          
          (window as any).ui = ui;
        } catch (err: unknown) {
          const errorMsg = err instanceof Error ? err.message : String(err);
          error = `Error inicializando Swagger: ${errorMsg}`;
          console.error(error, err);
        }
      };

      script2.onerror = () => {
        error = 'Error cargando Swagger UI Standalone Preset';
      };
      document.head.appendChild(script2);
    };

    script1.onerror = () => {
      error = 'Error cargando Swagger UI Bundle';
    };
    document.head.appendChild(script1);
  });
</script>

<div id="swagger-ui" style="min-height: 100vh;"></div>

{#if error}
  <div style="padding: 20px; background-color: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; border-radius: 4px; margin: 20px;">
    <strong>Error:</strong> {error}
  </div>
{/if}

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
