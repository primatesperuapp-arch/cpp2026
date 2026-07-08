# Configurar Astro Check en el Proyecto - Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Instalar y configurar `@astrojs/check` y `typescript` en el proyecto para habilitar el chequeo estático de tipos y prevenir errores de sintaxis en producción.

**Architecture:** Añadir las herramientas de chequeo oficiales de Astro a `package.json` en `devDependencies` y definir un script `"check"` para correr localmente y en el pipeline de CI/CD.

**Tech Stack:** Astro, TypeScript, npm.

## Global Constraints

- Usar la versión local de Node v22.12.0 anteponiendo la ruta `./node-local/bin` en el `PATH` para la ejecución de comandos.
- Mantener la compatibilidad con Astro ^6.3.5.

---

### Task 1: Instalar dependencias y configurar script de chequeo

**Files:**
- Modify: `package.json`

**Interfaces:**
- Produces: Script `npm run check` para validar tipos y sintaxis del proyecto.

- [ ] **Step 1: Modificar `package.json`**
  Añadir las dependencias `@astrojs/check` y `typescript` en la sección de `devDependencies` y definir el script `"check": "astro check"` en la sección de `scripts`.

  Contenido a modificar en `package.json`:
  ```json
  {
    "scripts": {
      "dev": "astro dev",
      "build": "astro build",
      "preview": "astro preview",
      "astro": "astro",
      "check": "astro check"
    },
    "devDependencies": {
      "@astrojs/check": "^0.9.4",
      "typescript": "^5.7.3"
    }
  }
  ```

- [ ] **Step 2: Ejecutar instalación de dependencias**
  Ejecutar el comando de instalación usando el Node local de la siguiente manera:
  Run: `PATH="$(pwd)/node-local/bin:$PATH" ./node-local/bin/npm install`
  Expected: Instalación exitosa sin errores y generación/actualización del `package-lock.json`.

- [ ] **Step 3: Correr verificación de tipos (Astro Check)**
  Run: `PATH="$(pwd)/node-local/bin:$PATH" ./node-local/bin/npm run check`
  Expected: Ejecución correcta del comando. En caso de reportar errores de tipos legítimos, documentar y reportar.

- [ ] **Step 4: Realizar commit en Git**
  Run:
  ```bash
  git add package.json package-lock.json
  git commit -m "chore: setup astro check and typescript for type monitoring"
  ```
