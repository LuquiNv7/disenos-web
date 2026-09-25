// Script de Inyección Absoluta para Tiendanube - LClipStore
(function() {
    // Crear el contenedor de la landing premium
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.zIndex = '9999999';
    container.style.background = '#0A0A0B';
    container.style.margin = '0';
    container.style.padding = '0';

    // Crear el iframe que carga tu web de GitHub
    const iframe = document.createElement('iframe');
    iframe.src = 'https://github.io';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';

    container.appendChild(iframe);
    
    // Inyectar en el documento apenas esté listo
    document.documentElement.appendChild(container);

    // Ocultar de forma agresiva todo el esqueleto genérico de Tiendanube por detrás
    const css = 'body, #header, #footer, .js-main-content, .style-editor { display: none !important; opacity: 0 !important; pointer-events: none !important; }';
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
})();
