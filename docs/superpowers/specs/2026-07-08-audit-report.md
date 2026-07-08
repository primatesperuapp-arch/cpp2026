# Reporte de Auditoría del Sitio Web (CPP 2026)

Este documento detalla los resultados de la auditoría inicial del proyecto web del **III Congreso Peruano de Primatología 2026** utilizando las nuevas herramientas y mejores prácticas.

Fecha de Auditoría: 2026-07-08

---

## 1. Estado de Compilación (Build)
- **Resultado:** Exitoso (1.18 segundos).
- **Entorno:**
  - Node.js local: `v22.12.0` (ubicado en `./node-local`)
  - Astro: `^6.3.5`
  - Tailwind CSS: `^4.3.0`
- **Nota técnica:** Astro requiere Node.js `>=22.12.0`. Dado que el sistema global corre sobre Node `v20.11.0`, para compilar localmente es necesario anteponer la ruta de Node local al `PATH` mediante:
  `PATH="$(pwd)/node-local/bin:$PATH" ./node-local/bin/npm run build`

---

## 2. Alineación de Plazos y Fechas
Se verificó la concordancia de fechas en todo el proyecto:
- **Archivo de control:** [webState.ts](file:///Users/jaemy/Documents/Web%20Congreso%20APP/src/utils/webState.ts)
- **Archivo de datos:** [important-dates.json](file:///Users/jaemy/Documents/Web%20Congreso%20APP/src/data/important-dates.json)
- **Estado Dinámico Actual (simulando 8 de julio de 2026):**
  - **Llamado de Resúmenes:** Estado `open` (Abierto). El botón de envío apunta a Google Forms. Cierre programado para el **14 de julio de 2026** (fecha extendida).
  - **Inscripciones / Tarifas:** Estado `regular` (Regular). La preventa Early Bird finalizó el 20 de junio. Cierre de pre-registro programado para el **15 de julio de 2026**.

---

## 3. Hydración Dinámica de UI en el Cliente
Las páginas críticas ([inscripciones.astro](file:///Users/jaemy/Documents/Web%20Congreso%20APP/src/pages/inscripciones.astro) y [llamado-de-resumenes.astro](file:///Users/jaemy/Documents/Web%20Congreso%20APP/src/pages/llamado-de-resumenes.astro)) e [ImportantDates.astro](file:///Users/jaemy/Documents/Web%20Congreso%20APP/src/components/home/ImportantDates.astro) tienen scripts clientes que:
- Se ejecutan en el arranque inicial.
- Escuchan el evento `astro:page-load` de las transiciones de Astro (`Astro View Transitions`).
- Esto garantiza que el usuario siempre vea los botones, alertas y estados de tarifas correctos sin necesidad de recargar la página.

---

## 4. Estructura, SEO y Accesibilidad (a11y)
- **Estructura HTML5:** Uso correcto de etiquetas semánticas (`<header>`, `<main>`, `<section>`, `<footer>`).
- **Idiomas y Meta:** `html lang="es"`, viewport responsive, meta etiquetas de Open Graph y Twitter configuradas.
- **Interactividad Accesible:** El toggle de navegación móvil maneja correctamente el estado `aria-expanded` y vincula a `mobile-nav` con `aria-controls`.
- **Imágenes:** Presencia de atributos `alt` y optimización nativa.

---

## 5. Pendientes / Posibles Mejoras (Sugerencias)
- **Monitoreo de Tipo (astro check):** Instalar `@astrojs/check` de forma permanente en las dependencias para habilitar validación estática de tipos en los archivos `.astro` durante el build.
- **Automatización de Despliegue:** Verificar si la acción de GitHub Pages está usando la versión adecuada de Node (v22) en sus workflows de CI/CD para evitar caídas de compilación remota.
