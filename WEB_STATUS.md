# Estado de la Web y Guía de Plazos (Congreso Primatología 2026)

Este documento sirve como referencia activa para el control del estado dinámico del sitio web del **III Congreso Peruano de Primatología 2026**. Aquí se detalla el flujo de convocatorias, plazos de tarifas, cómo editarlos y cómo probar diferentes escenarios temporales.

---

## 📅 Configuración de Plazos Oficiales

Todos los plazos y fechas clave del congreso están centralizados en el archivo de utilidades:
👉 **[src/utils/webState.ts](file:///home/jota/Documents/APP_WEB_SERVER/src/utils/webState.ts)**

La configuración actual de fechas límite es la siguiente:

| Hito / Evento | Fecha y Hora (Límite) | Variable en Código | Estado Dinámico Relacionado |
| :--- | :--- | :--- | :--- |
| **Apertura de Resúmenes** | 2026-05-08 a las 00:00 | `abstractsOpen` | Inicio de fase `open` de resúmenes |
| **Cierre de Resúmenes** | 2026-06-15 a las 23:59:59 | `abstractsClose` | Cierre de envío (`closed`) |
| **Cierre de Early Bird** | 2026-05-31 a las 23:59:59 | `earlyBirdClose` | Fin de tarifa con descuento |
| **Cierre de Pre-registro** | 2026-07-15 a las 23:59:59 | `regularClose` | Fin de tarifa regular, inicio de `onsite` |
| **Inicio del Congreso** | 2026-07-30 a las 09:00 | `congressStart` | Comienzo del evento presencial |

---

## 🔄 Estados y Comportamientos de la Interfaz

La web adapta su contenido tanto en tiempo de compilación (Astro build-time) como en tiempo de ejecución en el cliente (JavaScript hidratado en el navegador):

### 1. Convocatoria de Resúmenes
* **Fase `upcoming` (Antes del 8 de mayo):**
  * Botones CTA del Hero y de la página de resúmenes cambian a *"Próximamente"* y se inhabilitan.
  * Badge superior en la página de resúmenes indica: `⏰ Próximamente`.
* **Fase `open` (8 de mayo al 15 de junio):**
  * Botones CTA del Hero y de la página de resúmenes están activos y enlazan al Formulario de Envío de Google Forms.
  * Badge superior indica: `🟢 Convocatoria Abierta`.
* **Fase `closed` (Después del 15 de junio):**
  * Botones CTA cambian a *"Envío Cerrado"* o *"Convocatoria Cerrada"*, se inhabilitan (estilo gris `.btn-muted-cta`) y se les retira el enlace.
  * Badge superior indica: `🔴 Convocatoria Cerrada`.

### 2. Tabla de Tarifas de Inscripción
* **Fase `early` (Hasta el 31 de mayo):**
  * Columna **Early Bird** resaltada en dorado.
  * El aviso superior promueve el descuento Early Bird.
* **Fase `regular` (1 de junio al 15 de julio):**
  * Columna **Early Bird** se muestra tachada y atenuada.
  * Columna **Regular** se resalta en dorado.
  * El aviso superior indica que la tarifa regular está activa.
* **Fase `onsite` (Después del 15 de julio):**
  * Columnas **Early Bird** y **Regular** se muestran tachadas y atenuadas.
  * Columna **En sede** se resalta en dorado.
  * El aviso superior indica que el registro en línea está cerrado y la inscripción es presencial en sede.

---

## 🛠️ Cómo Modificar los Plazos

Si la organización decide extender un plazo (por ejemplo, el cierre de resúmenes), solo debes actualizar el archivo `webState.ts`:

1. Abre **[webState.ts](file:///home/jota/Documents/APP_WEB_SERVER/src/utils/webState.ts)**.
2. Modifica el objeto `DEADLINES`. Por ejemplo, para extender el envío de resúmenes hasta el 22 de junio de 2026:
   ```typescript
   export const DEADLINES = {
     // ...
     abstractsClose: new Date('2026-06-22T23:59:59'),
     // ...
   };
   ```
3. Compila el sitio web nuevamente (ver sección de despliegue).

---

## 🧪 Cómo Simular/Probar Diferentes Fechas

Dado que los scripts evalúan dinámicamente la fecha actual, puedes simular escenarios futuros de la siguiente manera:

### Método A: Simulación de fecha por consola (Recomendado para testing rápido)
Para probar localmente cómo se verá el sitio en una fecha específica del futuro, puedes modificar temporalmente la firma de `getWebState()` o `getDateStatus()` en `webState.ts` para que utilicen una fecha simulada en lugar de `new Date()`.

Ejemplo para simular el **20 de junio de 2026** (resúmenes cerrados, Early Bird cerrado):
Modifica temporalmente en [webState.ts](file:///home/jota/Documents/APP_WEB_SERVER/src/utils/webState.ts):
```typescript
export function getWebState(now: Date = new Date('2026-06-20T12:00:00')): WebState {
  // ...
}

export function getDateStatus(dateStr: string, referenceDate: Date = new Date('2026-06-20T12:00:00')): 'completed' | 'active' | 'upcoming' {
  // ...
}
```

### Método B: Cambiar la hora del sistema
Cambia la hora de tu computadora al día que desees verificar y recarga el navegador.

---

## 🚀 Compilación y Despliegue

Cada vez que realices cambios o modifiques plazos, asegúrate de recompilar y validar el sitio:

```bash
# Asegura estar usando una versión compatible de Node.js (>=22.12.0)
source ~/.nvm/nvm.sh
nvm use 22.22.2

# Limpiar cache y construir el sitio estático
npm run build
```

El build generará los archivos finales optimizados en el directorio `dist/` listos para ser subidos a GitHub Pages u otro servidor estático.
