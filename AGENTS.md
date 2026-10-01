# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Implementación de componente accesible**.

| | |
|---|---|
| Tema | diseño de componentes accesibles en Angular con Material Design |
| Nivel | junior-l2 |
| Chapter | Frontend |
| Especialidad | Angular |
| Stack | TypeScript / Angular 17 |
| Patron arquitectonico | componentes modulares con separación de responsabilidades (presentación, lógica, validación) |
| Tiempo estimado | 4 horas |

## Receta del stack

Esqueleto obligatorio:

- `package.json, angular.json y tsconfig.json en la raiz`
- `src/main.ts con bootstrapApplication`
- `src/app/app.config.ts con los providers`
- `src/app/core con servicios y modelos`
- `src/app/features con componentes contenedores`
- `src/app/shared con componentes presentacionales`

Trampas conocidas:

- No inventes versiones de npm: una version inexistente hace fallar `npm install` con ETARGET y el proyecto no instala. Usa rango con caret sobre una version que exista.
- El `package.json` tiene que ser JSON valido y UNICO: nada despues de la llave de cierre.
- Angular necesita `angular.json` y `tsconfig.json` ademas del `package.json`, o `ng build` no corre.

Dependencias:

- @angular/core 17.3.0
- @angular/material 17.3.0
- @angular/cdk 17.3.0
- @angular/forms 17.3.0
- @angular/common 17.3.0
- @angular/platform-browser 17.3.0
- @angular/router 17.3.0
- rxjs 7.8.0
- typescript 5.2.2
- @angular-devkit/build-angular 17.3.0
- @angular/cli 17.3.0
- @angular/compiler-cli 17.3.0
- jasmine-core 5.1.0
- karma 6.4.0
- karma-jasmine 5.1.0
- karma-chrome-launcher 3.2.0
- @types/jasmine 5.1.0

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Corre `npm install && npm run build` y mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `npm install && npm run build` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Diseño de componente básico**: Componente de formulario con validaciones básicas.
- **Fase 2 — Implementación de accesibilidad**: Componente de formulario con funcionalidades de accesibilidad.
- **Fase 3 — Optimización y pruebas**: Componente de formulario optimizado y probado.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Superficie de practica (NO completes)

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs. No toques la logica que el reto pide completar.

- [ ] `src/app/accessible-form/accessible-form.component.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- [ ] `src/app/accessible-form/services/form-validation.service.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- [ ] `src/app/accessible-form/components/form-field/form-field.component.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.

## Lo que falta y tenes que completar

### 1. Referencias colgando (2)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `src/app/accessible-form/accessible-form.component.ts` — `FormFieldModel.find`
      Se invoca `find` sobre `FormFieldModel`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/accessible-form/accessible-form.component.ts` — `FormValidationService.validateFormData`
      Se invoca `validateFormData` sobre `FormValidationService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

### Presentes (20)

- `tsconfig.json`
- `src/main.ts`
- `angular.json`
- `src/app/accessible-form/models/form-field.model.ts`
- `package.json`
- `src/index.html`
- `src/styles.scss`
- `src/test.ts`
- `src/app/accessible-form/accessible-form.component.ts`
- `src/app/accessible-form/accessible-form.component.html`
- `src/app/accessible-form/accessible-form.component.scss`
- `src/app/accessible-form/accessible-form.component.spec.ts`
- `src/app/accessible-form/services/form-validation.service.ts`
- `src/app/accessible-form/services/form-validation.service.spec.ts`
- `src/app/accessible-form/components/form-field/form-field.component.ts`
- `src/app/accessible-form/components/form-field/form-field.component.html`
- `src/app/accessible-form/components/form-field/form-field.component.spec.ts`
- `src/app/accessible-form/accessible-form.module.ts`
- `src/app/app.module.ts`
- `src/app/app.component.html`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `src/app/accessible-form`
- `src/app/accessible-form/components`
- `src/app/accessible-form/services`
- `src/app/accessible-form/models`
- `src/app/accessible-form/tests`

## Verificacion

```bash
npm install && npm run build
```

El comando tiene que pasar SIN implementar los archivos de la superficie de practica: solo andamiaje.

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- El patron es **componentes modulares con separación de responsabilidades (presentación, lógica, validación)**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Brecha que el reto ataca: Crear componentes accesibles con Angular y Material Design System

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
