# Implementación de componente accesible

La empresa necesita un componente de formulario accesible que cumpla con los estándares de Material Design. El componente deberá manejar entradas de texto, validaciones y proporcionar retroalimentación visual y auditiva para usuarios con discapacidades. El componente deberá ser idempotente en la validación de entradas y robusto ante errores de entrada. Los umbrales de accesibilidad incluyen cumplimiento con WCAG 2.1 nivel AA.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | diseño de componentes accesibles en Angular con Material Design |
| **Nivel** | junior-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 4 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y generará un ZIP listo para usar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y generará un archivo ZIP descargable. Descárgalo y extráelo en la carpeta donde quieras trabajar.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no genera el ZIP automáticamente al terminar el análisis, escríbele: "genera el ZIP ahora".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Diseño de componente básico

**Objetivo:** Crear un componente de formulario que acepte texto y muestre validaciones básicas.

**Tiempo estimado:** 1 hora

**Instrucciones:**

- Identificar los campos necesarios para el formulario.
- Definir las validaciones básicas (ej. longitud mínima, formato).
- Implementar retroalimentación visual para errores de validación.

**Entregable:** Componente de formulario con validaciones básicas.

<details>
<summary>Pistas de conocimiento</summary>

- Considera las guías de Material Design para componentes de formulario.
- Piensa en cómo hacer que el componente sea accesible para usuarios con discapacidades visuales.

</details>

### Fase 2: Implementación de accesibilidad

**Objetivo:** Añadir funcionalidades de accesibilidad al componente de formulario.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Implementar etiquetas ARIA para los elementos del formulario.
- Añadir retroalimentación auditiva para errores de validación.
- Asegurar que el componente cumpla con WCAG 2.1 nivel AA.

**Entregable:** Componente de formulario con funcionalidades de accesibilidad.

<details>
<summary>Pistas de conocimiento</summary>

- Investiga las mejores prácticas para hacer componentes accesibles.
- Utiliza herramientas de prueba de accesibilidad para verificar el cumplimiento de WCAG.

</details>

### Fase 3: Optimización y pruebas

**Objetivo:** Optimizar el componente y realizar pruebas exhaustivas.

**Tiempo estimado:** 1 hora

**Instrucciones:**

- Optimizar el rendimiento del componente.
- Realizar pruebas unitarias y de integración.
- Verificar la idempotencia de las validaciones de entrada.

**Entregable:** Componente de formulario optimizado y probado.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza herramientas de perfilado para identificar y solucionar cuellos de botella.
- Escribe pruebas unitarias y de integración para asegurar la calidad del código.
- Verifica que las validaciones de entrada sean idempotentes.

</details>

## Dimensiones Evaluadas

- **queEs**: En fase 1, ¿cuáles son los elementos básicos que debe tener un componente de formulario accesible?
- **paraQueSirve**: En fase 2, ¿para qué sirve implementar etiquetas ARIA en un componente de formulario?
- **comoSeUsa**: En fase 3, ¿cómo se puede verificar que las validaciones de entrada sean idempotentes?
- **erroresComunes**: En fase 1, ¿cuáles son los errores comunes al implementar validaciones básicas en un componente de formulario?
- **queDecisionesImplica**: En fase 2, ¿qué decisiones implica implementar funcionalidades de accesibilidad en un componente de formulario?

## Criterios de Evaluacion

- Implementación de un componente de formulario con validaciones básicas.
- Incorporación de funcionalidades de accesibilidad en el componente.
- Verificación de cumplimiento con WCAG 2.1 nivel AA.
- Optimización del rendimiento del componente.
- Realización de pruebas unitarias y de integración.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT). Devuelve un ZIP con el proyecto. Sirve si no tenes un agente en el IDE.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
