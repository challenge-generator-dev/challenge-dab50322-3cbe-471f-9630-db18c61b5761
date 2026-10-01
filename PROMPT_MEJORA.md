# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener un ZIP con el proyecto completo y arrancable.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `src/app/accessible-form/accessible-form.component.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- `src/app/accessible-form/services/form-validation.service.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- `src/app/accessible-form/components/form-field/form-field.component.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/app/accessible-form/accessible-form.component.ts` — `FormFieldModel.find`: Se invoca `find` sobre `FormFieldModel`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/accessible-form/accessible-form.component.ts` — `FormValidationService.validateFormData`: Se invoca `validateFormData` sobre `FormValidationService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Contexto técnico original
Crear componentes accesibles con Angular y Material Design System

### Reto
- Tema: diseño de componentes accesibles en Angular con Material Design
- Seniority: junior-l2
- Tipo: practical
- Título: Implementación de componente accesible
- Tiempo estimado: 4 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Diseño de componente básico — objetivo: Crear un componente de formulario que acepte texto y muestre validaciones básicas. — entregable (NO resolver): Componente de formulario con validaciones básicas.
- Fase 2: Implementación de accesibilidad — objetivo: Añadir funcionalidades de accesibilidad al componente de formulario. — entregable (NO resolver): Componente de formulario con funcionalidades de accesibilidad.
- Fase 3: Optimización y pruebas — objetivo: Optimizar el componente y realizar pruebas exhaustivas. — entregable (NO resolver): Componente de formulario optimizado y probado.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (ZIP).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Exportación en ZIP
Empaqueta todos los archivos en un único archivo ZIP descargable respetando exactamente
la estructura de rutas indicada por los marcadores.
El ZIP debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: El ZIP debe estar listo para descargar al finalizar. No preguntes si el usuario
quiere generarlo. Simplemente genera el archivo y proporciona el enlace de descarga; No debes desplegar en el chat el resumen de lo que arreglaste al Zip, solo entregalo.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del enlace de descarga del ZIP
No preguntes si el usuario quiere el ZIP: simplemente generalo siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: tsconfig.json ===
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": ".",
    "outDir": "./dist/out-tsc",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": false,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022",
    "lib": ["ES2022", "dom", "dom.iterable"],
    "useDefineForClassFields": false,
    "types": ["jasmine"],
    "paths": {
      "@angular/*": ["./node_modules/@angular/*"],
      "rxjs": ["./node_modules/rxjs"],
      "rxjs/*": ["./node_modules/rxjs/*"]
    }
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  },
  "exclude": [
    "node_modules",
    "**/*.stories.ts",
    "**/*.spec.ts"
  ]
}

// === ARCHIVO: src/main.ts ===
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { AccessibleFormModule } from './app/accessible-form/accessible-form.module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

if (process.env['NODE_ENV'] === 'production') {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(
            BrowserModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatNativeDateModule,
            AccessibleFormModule
        ),
        provideRouter(routes),
        provideHttpClient(),
        provideAnimationsAsync()
    ]
}).catch(err => console.error(err));

// === ARCHIVO: angular.json ===
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "accessible-form-app": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss",
          "skipTests": false
        },
        "@schematics/angular:application": {
          "strict": true
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "outputPath": "dist/accessible-form-app",
            "index": "src/index.html",
            "browser": "src/main.ts",
            "polyfills": ["zone.js"],
            "tsConfig": "tsconfig.json",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.scss",
              "node_modules/@angular/material/prebuilt-themes/indigo-pink.css"
            ],
            "scripts": []
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kb",
                  "maximumError": "1mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "2kb",
                  "maximumError": "4kb"
                }
              ],
              "outputHashing": "all",
              "optimization": true,
              "sourceMap": false,
              "namedChunks": false,
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": true
            },
            "development": {
              "optimization": false,
              "sourceMap": true,
              "vendorChunk": true,
              "extractLicenses": false,
              "buildOptimizer": false
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "accessible-form-app:build"
          },
          "configurations": {
            "production": {
              "browserTarget": "accessible-form-app:build:production"
            },
            "development": {
              "browserTarget": "accessible-form-app:build:development"
            }
          },
          "defaultConfiguration": "development"
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n",
          "options": {
            "browserTarget": "accessible-form-app:build"
          }
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "polyfills": ["zone.js", "zone.js/testing"],
            "tsConfig": "tsconfig.spec.json",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.scss",
              "node_modules/@angular/material/prebuilt-themes/indigo-pink.css"
            ],
            "scripts": []
          }
        }
      }
    }
  },
  "cli": {
    "analytics": false
  }
}

// === ARCHIVO: src/app/accessible-form/models/form-field.model.ts ===
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';

/**
 * Tipos de campos soportados por el formulario accesible.
 */
export type FormFieldType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';

/**
 * Opciones de configuración para la validación auditiva.
 */
export interface AuditFeedbackOptions {
  /** Mensaje a anunciar cuando el campo recibe foco */
  onFocus?: string;
  /** Mensaje a anunciar cuando el campo es válido */
  onValid?: string;
  /** Mensaje a anunciar cuando el campo es inválido */
  onInvalid?: string;
  /** Mensaje a anunciar cuando el campo es requerido pero vacío */
  onRequired?: string;
}

/**
 * Configuración de un campo de formulario accesible.
 */
export interface FormFieldConfig {
  /** Identificador único del campo */
  id: string;
  /** Etiqueta legible para humanos */
  label: string;
  /** Tipo de campo (text, email, etc.) */
  type: FormFieldType;
  /** Texto de ayuda opcional */
  helperText?: string;
  /** Texto de placeholder */
  placeholder?: string;
  /** Indica si el campo es obligatorio */
  required: boolean;
  /** Valor inicial del campo */
  initialValue?: string;
  /** Validaciones adicionales */
  validators?: ValidatorFn[];
  /** Configuración de retroalimentación auditiva */
  auditFeedback?: AuditFeedbackOptions;
  /** Atributos ARIA adicionales */
  ariaAttributes?: {[key: string]: string};
  /** Clases CSS adicionales */
  cssClasses?: string[];
}

/**
 * Modelo de estado para un campo de formulario accesible.
 */
export class FormFieldModel {
  /** Control reactivo del campo */
  readonly control: FormControl;
  /** Configuración original del campo */
  readonly config: FormFieldConfig;
  /** Estado actual de validación */
  private _validationState: 'pending' | 'valid' | 'invalid' = 'pending';

  constructor(config: FormFieldConfig) {
    this.config = config;
    this.control = new FormControl(
      config.initialValue || '',
      this.buildValidators(config)
    );

    // Suscripción a cambios de estado para retroalimentación auditiva
    this.control.statusChanges.subscribe(status => {
      this._validationState = status === 'VALID' ? 'valid' : 'invalid';
    });
  }

  private buildValidators(config: FormFieldConfig): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (config.required) {
      validators.push(Validators.required);
    }

    // Validaciones específicas por tipo
    switch (config.type) {
      case 'email':
        validators.push(Validators.email);
        break;
      case 'url':
        validators.push(Validators.pattern(/^(https?|ftp)://[^s/$.?#].[^s]*$/i));
        break;
      case 'tel':
        validators.push(Validators.pattern(/^[+]?[(]?[0-9]{1,4}[)]?[-s.]?[0-9]{1,3}[-s.]?[0-9]{3,4}[-s.]?[0-9]{3,4}$/));
        break;
      case 'number':
        validators.push(Validators.pattern(/^-?d*.?d+$/));
        break;
    }

    // Validaciones personalizadas
    if (config.validators && config.validators.length > 0) {
      validators.push(...config.validators);
    }

    return validators;
  }

  /**
   * Proporciona retroalimentación auditiva usando LiveAnnouncer.
   * @param announcer Servicio LiveAnnouncer de CDK
   */
  announceFeedback(announcer: LiveAnnouncer): void {
    if (!this.config.auditFeedback) return;

    const state = this._validationState;
    let message = '';

    switch (state) {
      case 'valid':
        message = this.config.auditFeedback.onValid || 'Campo válido';
        break;
      case 'invalid':
        if (this.control.errors?.['required']) {
          message = this.config.auditFeedback.onRequired || 'Este campo es obligatorio';
        } else {
          message = this.config.auditFeedback.onInvalid || 'Campo inválido';
        }
        break;
      default:
        message = this.config.auditFeedback.onFocus || `Campo ${this.config.label}`;
    }

    announcer.announce(message, 'assertive');
  }

  /**
   * Obtiene los atributos ARIA para el campo.
   */
  get ariaAttributes(): {[key: string]: string} {
    const baseAttrs = {
      'aria-label': this.config.label,
      'aria-invalid': this._validationState === 'invalid' ? 'true' : 'false',
      'aria-describedby': this.config.helperText ? `${this.config.id}-helper` : undefined
    };

    return {
      ...baseAttrs,
      ...this.config.ariaAttributes
    };
  }

  /**
   * Obtiene las clases CSS para el campo.
   */
  get cssClasses(): string[] {
    const baseClasses = ['form-field'];
    if (this._validationState === 'invalid') {
      baseClasses.push('form-field--invalid');
    }
    if (this.config.cssClasses) {
      baseClasses.push(...this.config.cssClasses);
    }
    return baseClasses;
  }

  /**
   * Valida si el campo cumple con las reglas de accesibilidad WCAG 2.1 AA.
   */
  validateAccessibility(): {isValid: boolean; issues: string[]} {
    const issues: string[] = [];

    // Verificar etiqueta asociada
    if (!this.config.label) {
      issues.push('El campo debe tener una etiqueta asociada (WCAG 3.3.2)');
    }

    // Verificar atributos ARIA
    if (this._validationState === 'invalid' && !this.ariaAttributes['aria-invalid']) {
      issues.push('Los campos inválidos deben tener aria-invalid=true (WCAG 3.3.1)');
    }

    return {
      isValid: issues.length === 0,
      issues
    };
  }
}

// === ARCHIVO: package.json ===
{
  "name": "accessible-form-app",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "lint": "ng lint"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "17.3.0",
    "@angular/cdk": "17.3.0",
    "@angular/common": "17.3.0",
    "@angular/compiler": "17.3.0",
    "@angular/core": "17.3.0",
    "@angular/forms": "17.3.0",
    "@angular/material": "17.3.0",
    "@angular/platform-browser": "17.3.0",
    "@angular/platform-browser-dynamic": "17.3.0",
    "@angular/router": "17.3.0",
    "rxjs": "7.8.0",
    "tslib": "2.6.0",
    "zone.js": "0.14.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "17.3.0",
    "@angular/cli": "17.3.0",
    "@angular/compiler-cli": "17.3.0",
    "@types/jasmine": "5.1.0",
    "@types/node": "20.11.0",
    "jasmine-core": "5.1.0",
    "karma": "6.4.0",
    "karma-chrome-launcher": "3.2.0",
    "karma-coverage": "2.2.0",
    "karma-jasmine": "5.1.0",
    "karma-jasmine-html-reporter": "2.1.0",
    "typescript": "5.2.2"
  }
}

// === ARCHIVO: src/index.html ===
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Accessible Form App</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Formulario accesible implementado con Angular y Material Design">
  <meta name="theme-color" content="#3f51b5">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body class="mat-typography">
  <app-root></app-root>
  <noscript>
    <div style="padding: 20px; text-align: center; font-family: Roboto, sans-serif;">
      <h1>JavaScript Requerido</h1>
      <p>Esta aplicación requiere JavaScript para funcionar. Por favor, habilite JavaScript en su navegador.</p>
    </div>
  </noscript>
</body>
</html>

// === ARCHIVO: src/styles.scss ===
@use '@angular/material' as mat;

$primary-palette: mat.m2-define-palette(mat.$m2-indigo-palette);
$accent-palette: mat.m2-define-palette(mat.$m2-pink-palette, A200, A100, A400);
$warn-palette: mat.m2-define-palette(mat.$m2-red-palette);

$accessible-theme: mat.m2-define-light-theme((
  color: (
    primary: $primary-palette,
    accent: $accent-palette,
    warn: $warn-palette,
  ),
  typography: mat.m2-define-typography-config(
    $font-family: 'Roboto, sans-serif',
    $headline-1: mat.m2-define-typography-level(96px, 96px, 300),
    $headline-2: mat.m2-define-typography-level(60px, 60px, 300),
    $headline-3: mat.m2-define-typography-level(48px, 48px, 400),
    $headline-4: mat.m2-define-typography-level(34px, 34px, 400),
    $headline-5: mat.m2-define-typography-level(24px, 24px, 400),
    $headline-6: mat.m2-define-typography-level(20px, 20px, 500),
  ),
  density: 0,
));

@include mat.core();
@include mat.all-component-themes($accessible-theme);

:root {
  --color-primary: #3f51b5;
  --color-primary-dark: #303f9f;
  --color-primary-light: #7986cb;
  --color-accent: #ff4081;
  --color-warn: #f44336;
  --color-success: #4caf50;
  --color-text-primary: rgba(0, 0, 0, 0.87);
  --color-text-secondary: rgba(0, 0, 0, 0.6);
  --color-background: #fafafa;
  --color-surface: #ffffff;
  --focus-outline-width: 2px;
  --focus-outline-color: #3f51b5;
  --spacing-unit: 8px;
  --border-radius: 4px;
  --transition-duration: 200ms;
  --transition-timing: ease-in-out;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  background-color: var(--color-background);
  color: var(--color-text-primary);
  line-height: 1.5;
  min-height: 100vh;
}

.mat-mdc-form-field {
  width: 100%;
  max-width: 400px;
}

.mat-mdc-card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.08) !important;
}

.mat-mdc-raised-button,
.mat-mdc-flat-button {
  transition: transform var(--transition-duration) var(--transition-timing),
              box-shadow var(--transition-duration) var(--transition-timing) !important;
}

.mat-mdc-raised-button:hover,
.mat-mdc-flat-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15), 0 6px 12px rgba(0, 0, 0, 0.1) !important;
}

.mat-mdc-raised-button:focus,
.mat-mdc-flat-button:focus,
.mat-mdc-button:focus {
  outline: var(--focus-outline-width) solid var(--focus-outline-color);
  outline-offset: 2px;
}

.mat-mdc-snack-bar-container {
  &.success-snackbar {
    --mdc-snackbar-container-color: var(--color-success);
    --mat-snack-bar-button-color: #ffffff;
  }

  &.error-snackbar {
    --mdc-snackbar-container-color: var(--color-warn);
    --mat-snack-bar-button-color: #ffffff;
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.sr-only-focusable:focus,
.sr-only-focusable:active {
  position: static;
  width: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}

.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary);
  color: white;
  padding: 8px 16px;
  z-index: 10000;
  transition: top var(--transition-duration) var(--transition-timing);
  text-decoration: none;
  font-weight: 500;

  &:focus {
    top: 0;
    outline: var(--focus-outline-width) solid var(--focus-outline-color);
    outline-offset: -2px;
  }
}

[aria-invalid="true"] {
  border-color: var(--color-warn) !important;
}

[aria-disabled="true"] {
  opacity: 0.6;
  cursor: not-allowed;
}

:focus-visible {
  outline: var(--focus-outline-width) solid var(--focus-outline-color);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

@media (prefers-contrast: more) {
  :root {
    --color-primary: #000080;
    --color-accent: #800040;
    --color-warn: #cc0000;
    --color-text-primary: #000000;
    --color-background: #ffffff;
    --focus-outline-width: 3px;
  }

  body {
    border: 2px solid currentColor;
  }
}

@media (max-width: 599px) {
  .mat-mdc-form-field {
    max-width: 100%;
  }
}

@media (min-width: 600px) and (max-width: 959px) {
  .mat-mdc-form-field {
    max-width: 350px;
  }
}

@media (min-width: 960px) {
  .mat-mdc-form-field {
    max-width: 400px;
  }
}

.cdk-visually-hidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
}

.mat-error {
  font-size: 0.75rem;
  line-height: 1.2;
  color: var(--color-warn);
}

.mat-mdc-form-field-subscript-wrapper {
  min-height: 1.5em;
}

// === ARCHIVO: src/test.ts ===
import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    <T>(id: string): T;
    keys(): string[];
  };
};

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  {
    teardown: { destroyAfterEach: true },
  }
);

const context = require.context('./', true, /\.spec\.ts$/);
context.keys().forEach((key: string) => {
  if (key.endsWith('.spec.ts')) {
    try {
      context(key);
    } catch (error) {
      console.error(`Error loading test file: ${key}`, error);
    }
  }
});

const coverageContext = require.context('../src/', true, /\.(spec|test)\.ts$/);
coverageContext.keys().forEach((key: string) => {
  if (key.match(/\.(spec|test)\.ts$/) && !key.includes('.stories.')) {
    try {
      coverageContext(key);
    } catch (error) {
      console.warn(`Could not load coverage test: ${key}`);
    }
  }
});

if (typeof window !== 'undefined') {
  window.onbeforeunload = () => {
    const testBed = getTestBed();
    if (testBed) {
      testBed.resetTestingModule();
      testBed.resetTestEnvironment();
    }
  };
}

jasmine.getEnv().addReporter({
  specDone: (result: { description: string; status: string; failedExpectations: { message: string }[] }) => {
    if (result.status === 'failed') {
      console.error(`FAILED: ${result.description}`);
      result.failedExpectations.forEach((expectation: { message: string }) => {
        console.error(`  - ${expectation.message}`);
      });
    }
  },
  jasmineDone: () => {
    console.log('Test suite completed');
  },
});

(window as unknown as { __karma__: { start: (config: unknown, callback: () => void) => void } }).__karma__?.start?.({}, () => {
  console.log('Karma test runner initialized');
});

// === ARCHIVO: src/app/accessible-form/accessible-form.component.ts ===
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Subject, takeUntil } from 'rxjs';
import { FormFieldModel } from './models/form-field.model';
import { FormValidationService } from './services/form-validation.service';
import { FormFieldComponent } from './components/form-field/form-field.component';

@Component({
  selector: 'app-accessible-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    FormFieldComponent
  ],
  templateUrl: './accessible-form.component.html',
  styleUrls: ['./accessible-form.component.scss']
})
export class AccessibleFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('formFieldsContainer') formFieldsContainer!: HTMLElement;

  form!: FormGroup;
  formFields: FormFieldModel[] = [];
  isSubmitting = false;
  isFormValid = false;
  submittedSuccessfully = false;
  errorMessage = '';

  private destroy$ = new Subject<void>();
  private validationStateCache = new Map<string, 'valid' | 'invalid' | 'pending'>();

  constructor(
    private fb: FormBuilder,
    private validationService: FormValidationService,
    private liveAnnouncer: LiveAnnouncer,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.createFormFields();
    this.subscribeToFormChanges();
  }

  ngAfterViewInit(): void {
    this.announceFormReady();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.clearValidationCache();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      correoElectronico: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)]],
      confirmarContrasena: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{9,15}$/)]],
      urlPortfolio: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
      biografia: ['', [Validators.maxLength(500)]]
    }, {
      validators: this.validationService.passwordMatchValidator,
      updateOn: 'change'
    });
  }

  private createFormFields(): void {
    const fieldConfigs = [
      {
        id: 'nombreCompleto',
        label: 'Nombre completo',
        type: 'text' as const,
        placeholder: 'Ingrese su nombre completo',
        required: true,
        autocomplete: 'name'
      },
      {
        id: 'correoElectronico',
        label: 'Correo electrónico',
        type: 'email' as const,
        placeholder: 'ejemplo@correo.com',
        required: true,
        autocomplete: 'email'
      },
      {
        id: 'contrasena',
        label: 'Contraseña',
        type: 'password' as const,
        placeholder: 'Mínimo 8 caracteres',
        required: true,
        autocomplete: 'new-password'
      },
      {
        id: 'confirmarContrasena',
        label: 'Confirmar contraseña',
        type: 'password' as const,
        placeholder: 'Repita su contraseña',
        required: true,
        autocomplete: 'new-password'
      },
      {
        id: 'telefono',
        label: 'Teléfono',
        type: 'tel' as const,
        placeholder: '+1234567890',
        required: true,
        autocomplete: 'tel'
      },
      {
        id: 'urlPortfolio',
        label: 'URL del portafolio',
        type: 'url' as const,
        placeholder: 'https://mi-portafolio.com',
        required: true,
        autocomplete: 'url'
      },
      {
        id: 'biografia',
        label: 'Biografía',
        type: 'text' as const,
        placeholder: 'Cuéntanos sobre ti (máximo 500 caracteres)',
        required: false,
        maxLength: 500
      }
    ];

    this.formFields = fieldConfigs.map(config => new FormFieldModel(config));
  }

  private subscribeToFormChanges(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateFormValidityState();
        this.announceFormStateChange();
      });

    this.form.statusChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(status => {
        this.isFormValid = status === 'VALID';
        this.cacheValidationState();
      });
  }

  private updateFormValidityState(): void {
    const touchedControls = Object.keys(this.form.controls).filter(
      key => this.form.get(key)?.touched
    );
    this.isFormValid = this.form.valid;
  }

  private announceFormStateChange(): void {
    const invalidFields = this.getInvalidFieldNames();
    if (invalidFields.length > 0) {
      this.liveAnnouncer.announce(
        `Formulario inválido. Campos con errores: ${invalidFields.join(', ')}`,
        'assertive',
        3000
      );
    }
  }

  private announceFormReady(): void {
    this.liveAnnouncer.announce(
      'Formulario de registro cargado. Hay 7 campos por completar.',
      'polite',
      2000
    );
  }

  private getInvalidFieldNames(): string[] {
    const invalidFields: string[] = [];
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control && control.invalid && control.touched) {
        const field = this.formFields.find(f => f.config.id === key);
        if (field) {
          invalidFields.push(field.config.label);
        }
      }
    });
    return invalidFields;
  }

  private cacheValidationState(): void {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control) {
        const state = control.valid ? 'valid' : control.touched ? 'invalid' : 'pending';
        this.validationStateCache.set(key, state);
      }
    });
  }

  private clearValidationCache(): void {
    this.validationStateCache.clear();
  }

  getFieldControl(fieldId: string): any {
    return this.form.get(fieldId);
  }

  getFieldModel(fieldId: string): FormFieldModel | undefined {
    return this.formFields.find(f => f.config.id === fieldId);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.markAllFieldsAsTouched();
      this.announceFormErrors();
      return;
    }

    this.isSubmitting = true;
    this.submittedSuccessfully = false;
    this.errorMessage = '';

    const formData = this.form.value;

    this.validationService.validateFormData(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (isValid) => {
          this.isSubmitting = false;
          if (isValid) {
            this.submittedSuccessfully = true;
            this.showSuccessMessage();
            this.announceSuccess();
            this.form.reset();
          } else {
            this.handleValidationError();
          }
        },
        error: (error) => {
          this.isSubmitting = false;
          this.handleSubmissionError(error);
        }
      });
  }

  private markAllFieldsAsTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });
  }

  private announceFormErrors(): void {
    const errorCount = this.getTotalErrorCount();
    this.liveAnnouncer.announce(
      `El formulario tiene ${errorCount} error${errorCount !== 1 ? 'es' : ''}. Corrígelos para continuar.`,
      'assertive',
      5000
    );
  }

  private getTotalErrorCount(): number {
    let count = 0;
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control && control.errors) {
        count += Object.keys(control.errors).length;
      }
    });
    return count;
  }

  private showSuccessMessage(): void {
    this.snackBar.open(
      'Formulario enviado correctamente',
      'Cerrar',
      {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar']
      }
    );
  }

  private announceSuccess(): void {
    this.liveAnnouncer.announce(
      'Formulario enviado correctamente. Gracias por registrarte.',
      'polite',
      3000
    );
  }

  private handleValidationError(): void {
    this.errorMessage = 'Los datos del formulario no son válidos. Por favor, revisa los campos.';
    this.liveAnnouncer.announce(
      'Error: Los datos del formulario no son válidos.',
      'assertive',
      3000
    );
  }

  private handleSubmissionError(error: any): void {
    this.errorMessage = 'Error al enviar el formulario. Por favor, inténtalo de nuevo.';
    this.snackBar.open(
      this.errorMessage,
      'Cerrar',
      {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['error-snackbar']
      }
    );
    this.liveAnnouncer.announce(
      'Error al enviar el formulario. Por favor, inténtalo de nuevo.',
      'assertive',
      3000
    );
  }

  onReset(): void {
    this.form.reset();
    this.submittedSuccessfully = false;
    this.errorMessage = '';
    this.clearValidationCache();
    this.liveAnnouncer.announce(
      'Formulario reiniciado. Todos los campos han sido borrados.',
      'polite',
      2000
    );
  }

  getErrorMessage(fieldId: string): string {
    const control = this.form.get(fieldId);
    if (!control || !control.errors) {
      return '';
    }

    const errors = control.errors;
    const fieldModel = this.getFieldModel(fieldId);
    const fieldLabel = fieldModel?.config.label || fieldId;

    if (errors['required']) {
      return `${fieldLabel} es obligatorio`;
    }
    if (errors['email']) {
      return 'Por favor, ingresa un correo electrónico válido';
    }
    if (errors['minlength']) {
      const minLength = errors['minlength'].requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }
    if (errors['maxlength']) {
      const maxLength = errors['maxlength'].requiredLength;
      return `Máximo ${maxLength} caracteres`;
    }
    if (errors['pattern']) {
      if (fieldId === 'contrasena') {
        return 'La contraseña debe contener al menos una mayúscula, una minúscula y un número';
      }
      if (fieldId === 'telefono') {
        return 'Por favor, ingresa un número de teléfono válido';
      }
      if (fieldId === 'urlPortfolio') {
        return 'Por favor, ingresa una URL válida (debe comenzar con http:// o https://)';
      }
      return 'El formato no es válido';
    }
    if (errors['passwordMismatch']) {
      return 'Las contraseñas no coinciden';
    }

    return 'Campo inválido';
  }

  trackByFieldId(index: number, field: FormFieldModel): string {
    return field.config.id;
  }
}

// === ARCHIVO: src/app/accessible-form/accessible-form.component.html ===
<div class="accessible-form-container" role="main" aria-labelledby="form-title">
  <header class="form-header">
    <h1 id="form-title" class="form-title">Formulario de Registro Accesible</h1>
    <p class="form-description">
      Completa los siguientes campos para crear tu cuenta. Todos los campos marcados con asterisco (*) son obligatorios.
    </p>
  </header>

  <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-content" aria-describedby="form-instructions">
    <div id="form-instructions" class="visually-hidden">
      Formulario con 7 campos. Usa tab para navegar entre campos. Los errores se anuncian automáticamente.
    </div>

    <div #formFieldsContainer class="form-fields-grid" role="group" aria-label="Campos del formulario">
      @for (field of formFields; track trackByFieldId($index, field)) {
        <app-form-field
          [field]="field"
          [control]="getFieldControl(field.config.id)"
          [errorMessage]="getErrorMessage(field.config.id)"
          [attr.aria-describedby]="field.config.id + '-help'"
        >
          <ng-container [ngSwitch]="field.config.type">
            <ng-container *ngSwitchCase="'text'">
              <input
                matInput
                [id]="field.config.id"
                [formControlName]="field.config.id"
                [type]="field.config.type"
                [placeholder]="field.config.placeholder || ''"
                [attr.aria-required]="field.config.required"
                [attr.autocomplete]="field.config.autocomplete"
                [attr.maxlength]="field.config.maxLength"
                [attr.aria-describedby]="field.config.id + '-error'"
              />
            </ng-container>
            <ng-container *ngSwitchCase="'email'">
              <input
                matInput
                [id]="field.config.id"
                [formControlName]="field.config.id"
                [type]="field.config.type"
                [placeholder]="field.config.placeholder || ''"
                [attr.aria-required]="field.config.required"
                [attr.autocomplete]="field.config.autocomplete"
                [attr.aria-describedby]="field.config.id + '-error'"
              />
            </ng-container>
            <ng-container *ngSwitchCase="'password'">
              <input
                matInput
                [id]="field.config.id"
                [formControlName]="field.config.id"
                [type]="field.config.type"
                [placeholder]="field.config.placeholder || ''"
                [attr.aria-required]="field.config.required"
                [attr.autocomplete]="field.config.autocomplete"
                [attr.aria-describedby]="field.config.id + '-error'"
              />
            </ng-container>
            <ng-container *ngSwitchCase="'tel'">
              <input
                matInput
                [id]="field.config.id"
                [formControlName]="field.config.id"
                [type]="field.config.type"
                [placeholder]="field.config.placeholder || ''"
                [attr.aria-required]="field.config.required"
                [attr.autocomplete]="field.config.autocomplete"
                [attr.inputmode]="'tel'"
                [attr.aria-describedby]="field.config.id + '-error'"
              />
            </ng-container>
            <ng-container *ngSwitchCase="'url'">
              <input
                matInput
                [id]="field.config.id"
                [formControlName]="field.config.id"
                [type]="field.config.type"
                [placeholder]="field.config.placeholder || ''"
                [attr.aria-required]="field.config.required"
                [attr.autocomplete]="field.config.autocomplete"
                [attr.inputmode]="'url'"
                [attr.aria-describedby]="field.config.id + '-error'"
              />
            </ng-container>
            <ng-container *ngSwitchDefault>
              <input
                matInput
                [id]="field.config.id"
                [formControlName]="field.config.id"
                type="text"
                [placeholder]="field.config.placeholder || ''"
                [attr.aria-required]="field.config.required"
                [attr.autocomplete]="field.config.autocomplete"
              />
            </ng-container>
          </ng-container>
          <mat-hint [id]="field.config.id + '-help'" *ngIf="field.config.maxLength">
            {{ form.get(field.config.id)?.value?.length || 0 }} / {{ field.config.maxLength }}
          </mat-hint>
          <mat-error [id]="field.config.id + '-error'" role="alert" aria-live="polite">
            {{ getErrorMessage(field.config.id) }}
          </mat-error>
        </app-form-field>
      }
    </div>

    <div class="form-actions" role="group" aria-label="Acciones del formulario">
      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="isSubmitting"
        [attr.aria-disabled]="isSubmitting"
        class="submit-button"
      >
        @if (isSubmitting) {
          <mat-spinner diameter="20" aria-label="Enviando formulario"></mat-spinner>
          <span class="button-text">Enviando...</span>
        } @else {
          <mat-icon aria-hidden="true">send</mat-icon>
          <span class="button-text">Enviar</span>
        }
      </button>

      <button
        mat-stroked-button
        type="button"
        (click)="onReset()"
        [disabled]="isSubmitting"
        class="reset-button"
      >
        <mat-icon aria-hidden="true">refresh</mat-icon>
        <span class="button-text">Reiniciar</span>
      </button>
    </div>

    @if (errorMessage) {
      <div
        class="error-summary"
        role="alert"
        aria-live="assertive"
        aria-describedby="error-summary-title"
      >
        <mat-icon aria-hidden="true">error_outline</mat-icon>
        <div class="error-content">
          <h2 id="error-summary-title" class="error-title">Error en el formulario</h2>
          <p>{{ errorMessage }}</p>
        </div>
      </div>
    }

    @if (submittedSuccessfully) {
      <div
        class="success-summary"
        role="status"
        aria-live="polite"
        aria-describedby="success-summary-title"
      >
        <mat-icon aria-hidden="true">check_circle</mat-icon>
        <div class="success-content">
          <h2 id="success-summary-title" class="success-title">¡Registro exitoso!</h2>
          <p>Tu cuenta ha sido creada correctamente. Recibirás un correo de confirmación.</p>
        </div>
      </div>
    }
  </form>

  <footer class="form-footer">
    <p class="accessibility-notice">
      <mat-icon aria-hidden="true">accessibility_new</mat-icon>
      <span>Este formulario cumple con los estándares WCAG 2.1 nivel AA de accesibilidad.</span>
    </p>
  </footer>
</div>

// === ARCHIVO: src/app/accessible-form/accessible-form.component.scss ===
@use '@angular/material' as mat;

.accessible-form-container {
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    padding: 1rem;
    margin: 0.5rem;
  }
}

.form-header {
  margin-bottom: 2rem;
  text-align: center;

  .form-title {
    font-size: 1.75rem;
    font-weight: 500;
    color: mat.$dark-primary-text;
    margin-bottom: 0.5rem;
    line-height: 1.3;
  }

  .form-description {
    font-size: 1rem;
    color: mat.$light-primary-text;
    line-height: 1.5;
    max-width: 600px;
    margin: 0 auto;
  }
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-fields-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  app-form-field {
    display: block;

    &:nth-child(7) {
      grid-column: 1 / -1;
    }
  }
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.12);

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
  }

  button {
    min-width: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    transition: all 0.2s ease-in-out;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    mat-spinner {
      margin-right: 0.5rem;
    }

    .button-text {
      font-weight: 500;
    }
  }

  .submit-button {
    background-color: mat.m2-define-palette(mat.$m2-indigo-palette);
    color: white;

    &:hover:not(:disabled) {
      background-color: mat.m2-define-palette(mat.$m2-indigo-palette, 700);
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }

  .reset-button {
    border-color: mat.m2-define-palette(mat.$m2-grey-palette, 400);
    color: mat.$dark-primary-text;

    &:hover:not(:disabled) {
      background-color: rgba(0, 0, 0, 0.04);
      border-color: mat.m2-define-palette(mat.$m2-grey-palette, 600);
    }
  }
}

.error-summary,
.success-summary {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-radius: 8px;
  margin-top: 1rem;
  animation: slideIn 0.3s ease-out;

  mat-icon {
    flex-shrink: 0;
    font-size: 24px;
    width: 24px;
    height: 24px;
  }

  .error-content,
  .success-content {
    flex: 1;

    .error-title,
    .success-title {
      font-size: 1rem;
      font-weight: 600;
      margin: 0 0 0.25rem 0;
      line-height: 1.3;
    }

    p {
      margin: 0;
      font-size: 0.9rem;
      line-height: 1.5;
    }
  }
}

.error-summary {
  background-color: #ffebee;
  border: 1px solid #ef5350;

  mat-icon {
    color: #c62828;
  }

  .error-title {
    color: #c62828;
  }

  p {
    color: #b71c1c;
  }
}

.success-summary {
  background-color: #e8f5e9;
  border: 1px solid #66bb6a;

  mat-icon {
    color: #2e7d32;
  }

  .success-title {
    color: #2e7d32;
  }

  p {
    color: #1b5e20;
  }
}

.form-footer {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.08);

  .accessibility-notice {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: mat.$light-primary-text;
    margin: 0;

    mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
      color: mat.m2-define-palette(mat.$m2-green-palette, 600);
    }
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

:host ::ng-deep {
  .mat-mdc-form-field {
    width: 100%;

    &.mat-focused {
      .mat-mdc-form-field-focus-overlay {
        background-color: rgba(63, 81, 181, 0.04);
      }
    }

    &.mat-form-field-invalid {
      .mat-mdc-text-field-wrapper {
        background-color: rgba(211, 47, 47, 0.04);
      }
    }
  }

  .mat-mdc-form-field-subscript-wrapper {
    min-height: 1.5em;
  }

  .mat-mdc-form-field-hint-wrapper {
    padding: 0 16px;
  }

  .mat-mdc-form-field-error-wrapper {
    padding: 0 16px;
  }

  .mat-mdc-form-field-hint {
    color: mat.$light-primary-text;
    font-size: 0.75rem;
  }

  .mat-mdc-form-field-error {
    font-size: 0.75rem;
    line-height: 1.2;
  }

  .mdc-text-field--outlined {
    &:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,
    &:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,
    &:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing {
      border-color: rgba(0, 0, 0, 0.23);
    }

    &:not(.mdc-text-field--disabled):hover .mdc-notched-outline__leading,
    &:not(.mdc-text-field--disabled):hover .mdc-notched-outline__notch,
    &:not(.mdc-text-field--disabled):hover .mdc-notched-outline__trailing {
      border-color: rgba(0, 0, 0, 0.42);
    }

    &.mat-focused {
      &:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,
      &:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,
      &:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing {
        border-color: mat.m2-define-palette(mat.$m2-indigo-palette);
        border-width: 2px;
      }
    }
  }

  .mat-mdc-raised-button.mat-primary {
    --mdc-protected-button-container-color: #{mat.m2-define-palette(mat.$m2-indigo-palette)};
  }

  .snack-bar-container {
    &.success-snackbar {
      .mdc-snackbar__surface {
        background-color: #2e7d32;
      }
    }

    &.error-snackbar {
      .mdc-snackbar__surface {
        background-color: #c62828;
      }
    }
  }
}

// === ARCHIVO: src/app/accessible-form/accessible-form.component.spec.ts ===
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessibleFormComponent } from './accessible-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LiveAnnouncer } from '@angular/cdk/a11y';

describe('AccessibleFormComponent', () => {
  let component: AccessibleFormComponent;
  let fixture: ComponentFixture<AccessibleFormComponent>;
  let liveAnnouncer: LiveAnnouncer;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccessibleFormComponent],
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
      ],
      providers: [
        LiveAnnouncer
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccessibleFormComponent);
    component = fixture.componentInstance;
    liveAnnouncer = TestBed.inject(LiveAnnouncer);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with all required fields', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('name')).toBeTruthy();
    expect(component.form.get('email')).toBeTruthy();
    expect(component.form.get('phone')).toBeTruthy();
  });

  it('should mark form as invalid when required fields are empty', () => {
    component.form.get('name')?.setValue('');
    component.form.get('email')?.setValue('');
    component.form.get('phone')?.setValue('');
    expect(component.form.valid).toBeFalse();
  });

  it('should validate email format correctly', () => {
    const emailControl = component.form.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('email')).toBeTrue();
    emailControl?.setValue('valid@example.com');
    expect(emailControl?.hasError('email')).toBeFalse();
  });

  it('should submit form when all validations pass', () => {
    component.form.patchValue({
      name: 'Test User',
      email: 'test@example.com',
      phone: '1234567890'
    });
    expect(component.form.valid).toBeTrue();
  });

  it('should announce validation errors via LiveAnnouncer', () => {
    spyOn(liveAnnouncer, 'announce');
    component.form.get('name')?.setValue('');
    component.form.get('name')?.markAsTouched();
    fixture.detectChanges();
  });

  it('should have proper aria-labels on form fields', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const inputs = compiled.querySelectorAll('input');
    inputs.forEach(input => {
      expect(input.getAttribute('aria-label')).toBeTruthy();
    });
  });

  it('should display error messages for invalid fields', () => {
    component.form.get('email')?.setValue('bad');
    component.form.get('email')?.markAsTouched();
    fixture.detectChanges();
    const errorElement = fixture.nativeElement.querySelector('mat-error');
    expect(errorElement).toBeTruthy();
  });
});

// === ARCHIVO: src/app/accessible-form/services/form-validation.service.ts ===
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FormFieldType, FormFieldConfig } from '../models/form-field.model';

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationErrors | null;
  errorMessage?: string;
}

export interface ValidationRule {
  type: string;
  validator: ValidatorFn;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {
  private validationCache: Map<string, ValidationErrors | null> = new Map();
  private readonly cacheKeySeparator = '::';
  private readonly maxCacheSize = 1000;

  constructor() {}

  validateField(value: string | number | null | undefined, config: FormFieldConfig): ValidationResult {
    const cacheKey = this.generateCacheKey(value, config);
    const cached = this.getCachedValidation(cacheKey);
    if (cached !== undefined) {
      return { isValid: Object.keys(cached).length === 0, errors: cached };
    }

    const validators = this.buildValidators(config);
    const control = { value: value } as AbstractControl;
    const errors: ValidationErrors = {};

    validators.forEach(validator => {
      const error = validator(control);
      if (error) {
        Object.assign(errors, error);
      }
    });

    const result: ValidationResult = {
      isValid: Object.keys(errors).length === 0,
      errors: Object.keys(errors).length > 0 ? errors : null
    };

    if (!result.isValid) {
      result.errorMessage = this.getFirstErrorMessage(errors);
    }

    this.setCachedValidation(cacheKey, result.errors);
    return result;
  }

  validateEmail(email: string | null | undefined): ValidationResult {
    const config: FormFieldConfig = {
      fieldId: 'temp-email',
      fieldType: 'email',
      label: 'Email',
      required: true
    };
    return this.validateField(email, config);
  }

  validateRequired(value: string | number | null | undefined, fieldName: string): ValidationResult {
    const isEmpty = value === null || value === undefined || value === '';
    const errors: ValidationErrors = isEmpty ? { required: { field: fieldName } } : {};
    return {
      isValid: !isEmpty,
      errors,
      errorMessage: isEmpty ? `${fieldName} es obligatorio` : undefined
    };
  }

  validateMinLength(value: string | null | undefined, minLength: number, fieldName: string): ValidationResult {
    const isTooShort = value !== null && value !== undefined && value.length < minLength;
    const errors: ValidationErrors = isTooShort ? { minlength: { requiredLength: minLength, actualLength: value.length } } : {};
    return {
      isValid: !isTooShort,
      errors,
      errorMessage: isTooShort ? `${fieldName} debe tener al menos ${minLength} caracteres` : undefined
    };
  }

  validateMaxLength(value: string | null | undefined, maxLength: number, fieldName: string): ValidationResult {
    const isTooLong = value !== null && value !== undefined && value.length > maxLength;
    const errors: ValidationErrors = isTooLong ? { maxlength: { requiredLength: maxLength, actualLength: value.length } } : {};
    return {
      isValid: !isTooLong,
      errors,
      errorMessage: isTooLong ? `${fieldName} no puede exceder ${maxLength} caracteres` : undefined
    };
  }

  validatePattern(value: string | null | undefined, pattern: RegExp, fieldName: string, errorMessage: string): ValidationResult {
    const isInvalid = value !== null && value !== undefined && !pattern.test(value);
    const errors: ValidationErrors = isInvalid ? { pattern: { message: errorMessage } } : {};
    return {
      isValid: !isInvalid,
      errors,
      errorMessage: isInvalid ? errorMessage : undefined
    };
  }

  validatePhone(phone: string | null | undefined): ValidationResult {
    const phonePattern = /^[0-9]{10,15}$/;
    return this.validatePattern(phone, phonePattern, 'Teléfono', 'Ingrese un número de teléfono válido');
  }

  validateUrl(url: string | null | undefined): ValidationResult {
    try {
      if (!url) {
        return { isValid: false, errors: { required: true }, errorMessage: 'URL es obligatoria' };
      }
      new URL(url);
      return { isValid: true, errors: null };
    } catch {
      return { isValid: false, errors: { url: true }, errorMessage: 'Ingrese una URL válida' };
    }
  }

  validateNumber(value: string | number | null | undefined, min?: number, max?: number): ValidationResult {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    const errors: ValidationErrors = {};

    if (numValue === null || numValue === undefined || isNaN(numValue as number)) {
      errors['number'] = true;
    } else {
      if (min !== undefined && (numValue as number) < min) {
        errors['min'] = { min, actual: numValue };
      }
      if (max !== undefined && (numValue as number) > max) {
        errors['max'] = { max, actual: numValue };
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors: Object.keys(errors).length > 0 ? errors : null,
      errorMessage: Object.keys(errors).length > 0 ? 'El valor debe ser un número válido' : undefined
    };
  }

  buildValidators(config: FormFieldConfig): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (config.required) {
      validators.push(Validators.required);
    }

    if (config.minLength !== undefined) {
      validators.push(Validators.minLength(config.minLength));
    }

    if (config.maxLength !== undefined) {
      validators.push(Validators.maxLength(config.maxLength));
    }

    if (config.pattern) {
      validators.push(Validators.pattern(config.pattern));
    }

    switch (config.fieldType) {
      case 'email':
        validators.push(Validators.email);
        break;
      case 'number':
      case 'tel':
        validators.push(Validators.pattern(/^[0-9]+$/));
        break;
    }

    return validators;
  }

  validateAllFields(fields: Map<string, FormFieldConfig>): Map<string, ValidationResult> {
    const results = new Map<string, ValidationResult>();
    fields.forEach((config, fieldName) => {
      const value = config.value;
      results.set(fieldName, this.validateField(value, config));
    });
    return results;
  }

  clearCache(): void {
    this.validationCache.clear();
  }

  private generateCacheKey(value: string | number | null | undefined, config: FormFieldConfig): string {
    const valueStr = String(value ?? '');
    const configStr = JSON.stringify({
      id: config.fieldId,
      type: config.fieldType,
      required: config.required,
      minLength: config.minLength,
      maxLength: config.maxLength,
      pattern: config.pattern?.source
    });
    return `${valueStr}${this.cacheKeySeparator}${configStr}`;
  }

  private getCachedValidation(key: string): ValidationErrors | undefined {
    return this.validationCache.get(key);
  }

  private setCachedValidation(key: string, errors: ValidationErrors | null): void {
    if (this.validationCache.size >= this.maxCacheSize) {
      const firstKey = this.validationCache.keys().next().value;
      if (firstKey) {
        this.validationCache.delete(firstKey);
      }
    }
    this.validationCache.set(key, errors);
  }

  private getFirstErrorMessage(errors: ValidationErrors): string {
    const errorKey = Object.keys(errors)[0];
    const errorValue = errors[errorKey];

    const messages: Record<string, string> = {
      required: 'Este campo es obligatorio',
      email: 'Ingrese un correo electrónico válido',
      minlength: `Mínimo ${errorValue?.requiredLength} caracteres`,
      maxlength: `Máximo ${errorValue?.requiredLength} caracteres`,
      pattern: 'El formato no es válido',
      number: 'Debe ser un número válido',
      min: `El valor mínimo es ${errorValue?.min}`,
      max: `El valor máximo es ${errorValue?.max}`
    };

    return messages[errorKey] || 'Error de validación';
  }
}

// === ARCHIVO: src/app/accessible-form/services/form-validation.service.spec.ts ===
import { TestBed } from '@angular/core/testing';
import { FormValidationService, ValidationResult } from './form-validation.service';
import { FormFieldConfig } from '../models/form-field.model';

describe('FormValidationService', () => {
  let service: FormValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('validateRequired', () => {
    it('should return invalid for empty string', () => {
      const result = service.validateRequired('', 'Nombre');
      expect(result.isValid).toBeFalse();
      expect(result.errorMessage).toContain('obligatorio');
    });

    it('should return invalid for null value', () => {
      const result = service.validateRequired(null, 'Nombre');
      expect(result.isValid).toBeFalse();
    });

    it('should return invalid for undefined value', () => {
      const result = service.validateRequired(undefined, 'Nombre');
      expect(result.isValid).toBeFalse();
    });

    it('should return valid for non-empty value', () => {
      const result = service.validateRequired('Test', 'Nombre');
      expect(result.isValid).toBeTrue();
    });
  });

  describe('validateEmail', () => {
    it('should validate correct email format', () => {
      const result = service.validateEmail('test@example.com');
      expect(result.isValid).toBeTrue();
    });

    it('should reject invalid email format', () => {
      const result = service.validateEmail('invalid-email');
      expect(result.isValid).toBeFalse();
    });

    it('should reject email without domain', () => {
      const result = service.validateEmail('test@');
      expect(result.isValid).toBeFalse();
    });

    it('should reject empty email', () => {
      const result = service.validateEmail('');
      expect(result.isValid).toBeFalse();
    });
  });

  describe('validatePhone', () => {
    it('should validate correct phone number', () => {
      const result = service.validatePhone('1234567890');
      expect(result.isValid).toBeTrue();
    });

    it('should reject phone with letters', () => {
      const result = service.validatePhone('1234ABC789');
      expect(result.isValid).toBeFalse();
    });

    it('should reject short phone number', () => {
      const result = service.validatePhone('123');
      expect(result.isValid).toBeFalse();
    });
  });

  describe('validateMinLength', () => {
    it('should return valid when length is equal to minimum', () => {
      const result = service.validateMinLength('abc', 3, 'Campo');
      expect(result.isValid).toBeTrue();
    });

    it('should return valid when length exceeds minimum', () => {
      const result = service.validateMinLength('abcd', 3, 'Campo');
      expect(result.isValid).toBeTrue();
    });

    it('should return invalid when length is below minimum', () => {
      const result = service.validateMinLength('ab', 3, 'Campo');
      expect(result.isValid).toBeFalse();
    });
  });

  describe('validateMaxLength', () => {
    it('should return valid when length is equal to maximum', () => {
      const result = service.validateMaxLength('abc', 3, 'Campo');
      expect(result.isValid).toBeTrue();
    });

    it('should return valid when length is below maximum', () => {
      const result = service.validateMaxLength('ab', 3, 'Campo');
      expect(result.isValid).toBeTrue();
    });

    it('should return invalid when length exceeds maximum', () => {
      const result = service.validateMaxLength('abcd', 3, 'Campo');
      expect(result.isValid).toBeFalse();
    });
  });

  describe('validateUrl', () => {
    it('should validate correct URL', () => {
      const result = service.validateUrl('https://example.com');
      expect(result.isValid).toBeTrue();
    });

    it('should validate URL with path', () => {
      const result = service.validateUrl('https://example.com/path');
      expect(result.isValid).toBeTrue();
    });

    it('should reject invalid URL', () => {
      const result = service.validateUrl('not-a-url');
      expect(result.isValid).toBeFalse();
    });

    it('should reject empty URL', () => {
      const result = service.validateUrl('');
      expect(result.isValid).toBeFalse();
    });
  });

  describe('validateNumber', () => {
    it('should validate correct number', () => {
      const result = service.validateNumber('42');
      expect(result.isValid).toBeTrue();
    });

    it('should validate numeric input', () => {
      const result = service.validateNumber(42);
      expect(result.isValid).toBeTrue();
    });

    it('should validate number within range', () => {
      const result = service.validateNumber(50, 0, 100);
      expect(result.isValid).toBeTrue();
    });

    it('should reject number below minimum', () => {
      const result = service.validateNumber(-5, 0, 100);
      expect(result.isValid).toBeFalse();
    });

    it('should reject number above maximum', () => {
      const result = service.validateNumber(150, 0, 100);
      expect(result.isValid).toBeFalse();
    });

    it('should reject non-numeric string', () => {
      const result = service.validateNumber('abc');
      expect(result.isValid).toBeFalse();
    });
  });

  describe('idempotency', () => {
    it('should return consistent results for same input', () => {
      const config: FormFieldConfig = {
        fieldId: 'test-field',
        fieldType: 'email',
        label: 'Email',
        required: true
      };

      const result1 = service.validateField('test@example.com', config);
      const result2 = service.validateField('test@example.com', config);

      expect(result1.isValid).toEqual(result2.isValid);
      expect(result1.errors).toEqual(result2.errors);
    });

    it('should use cache for repeated validations', () => {
      const config: FormFieldConfig = {
        fieldId: 'cached-field',
        fieldType: 'text',
        label: 'Nombre',
        required: true
      };

      service.validateField('value', config);
      service.validateField('value', config);
      service.validateField('value', config);

      const result = service.validateField('value', config);
      expect(result).toBeTruthy();
    });
  });

  describe('clearCache', () => {
    it('should clear validation cache', () => {
      const config: FormFieldConfig = {
        fieldId: 'clear-field',
        fieldType: 'text',
        label: 'Test',
        required: true
      };

      service.validateField('test', config);
      service.clearCache();

      const result = service.validateField('test', config);
      expect(result).toBeTruthy();
    });
  });
})

// === ARCHIVO: src/app/accessible-form/components/form-field/form-field.component.ts ===
import { Component, Input, Output, EventEmitter, forwardRef, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatErrorModule } from '@angular/material/core';
import { MatLabel } from '@angular/material/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { FormFieldModel, FormFieldConfig, FormFieldType } from '../../models/form-field.model';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatErrorModule,
    MatLabel
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true
    }
  ],
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: FormFieldType = 'text';
  @Input() placeholder: string = '';
  @Input() hint: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() minLength: number | null = null;
  @Input() maxLength: number | null = null;
  @Input() pattern: string | null = null;
  @Input() customErrorMessages: Record<string, string> = {};

  @Output() valueChange = new EventEmitter<string | number>();
  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();

  control = new FormControl<string | number>('');
  model!: FormFieldModel;
  isFocused: boolean = false;
  showPassword: boolean = false;

  private destroy$ = new Subject<void>();
  private onChange: (value: string | number) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(
    private cdr: ChangeDetectorRef,
    private liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    const config: FormFieldConfig = {
      label: this.label,
      type: this.type,
      placeholder: this.placeholder,
      hint: this.hint,
      required: this.required,
      disabled: this.disabled,
      readonly: this.readonly,
      minLength: this.minLength,
      maxLength: this.maxLength,
      pattern: this.pattern,
      customErrorMessages: this.customErrorMessages
    };

    this.model = new FormFieldModel(config);
    this.control = this.model.control;

    this.setupControlListeners();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupControlListeners(): void {
    this.control.valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        const typedValue = value ?? '';
        this.onChange(typedValue);
        this.valueChange.emit(typedValue);
        this.cdr.markForCheck();
      });
  }

  writeValue(value: string | number): void {
    const normalizedValue = value ?? '';
    this.control.setValue(normalizedValue, { emitEvent: false });
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: string | number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (isDisabled) {
      this.control.disable({ emitEvent: false });
    } else {
      this.control.enable({ emitEvent: false });
    }
    this.cdr.markForCheck();
  }

  onInputFocus(): void {
    this.isFocused = true;
    this.focus.emit();
    this.announceToScreenReader('Campo enfocado');
  }

  onInputBlur(): void {
    this.isFocused = false;
    this.onTouched();
    this.blur.emit();
    this.validateAndAnnounce();
  }

  onInputChange(value: string): void {
    this.control.setValue(value, { emitEvent: true });
  }

  private validateAndAnnounce(): void {
    if (this.control.invalid && this.control.touched) {
      const errorKey = this.getFirstErrorKey();
      const errorMessage = this.getErrorMessage(errorKey);
      this.announceToScreenReader(`Error: ${errorMessage}`);
      this.model.announceFeedback(this.liveAnnouncer);
    } else if (this.control.valid && this.control.dirty) {
      this.announceToScreenReader('Campo válido');
    }
  }

  private getFirstErrorKey(): string {
    const errors = this.control.errors;
    if (!errors) return '';
    return Object.keys(errors)[0] || '';
  }

  getErrorMessage(errorKey: string): string {
    const defaultMessages: Record<string, string> = {
      required: 'Este campo es obligatorio',
      email: 'Ingrese un correo electrónico válido',
      minlength: `La longitud mínima es ${this.minLength} caracteres`,
      maxlength: `La longitud máxima es ${this.maxLength} caracteres`,
      pattern: 'El formato no es válido',
      invalidInput: 'El valor ingresado no es válido'
    };

    return this.customErrorMessages[errorKey] || defaultMessages[errorKey] || 'Error de validación';
  }

  get ariaDescribedBy(): string {
    const ids: string[] = [];
    if (this.hint) ids.push(`${this.label}-hint`);
    if (this.control.invalid && this.control.touched) {
      ids.push(`${this.label}-error`);
    }
    return ids.join(' ') || '';
  }

  get inputId(): string {
    return `form-field-${this.label.toLowerCase().replace(/\s+/g, '-')}`;
  }

  get errorId(): string {
    return `${this.inputId}-error`;
  }

  get hintId(): string {
    return `${this.inputId}-hint`;
  }

  get showError(): boolean {
    return this.control.invalid && this.control.touched;
  }

  get inputType(): string {
    if (this.type === 'password' && this.showPassword) {
      return 'text';
    }
    return this.type;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    this.cdr.markForCheck();
  }

  private announceToScreenReader(message: string): void {
    this.liveAnnouncer.announce(message, 'polite');
  }

  get cssClasses(): string[] {
    return this.model?.cssClasses || [];
  }

  validateAccessibility(): boolean {
    return this.model?.validateAccessibility() ?? false;
  }

  get ariaAttributes(): Record<string, string> {
    return this.model?.ariaAttributes || {};
  }
}

// === ARCHIVO: src/app/accessible-form/components/form-field/form-field.component.html ===
<div class="form-field-container" [class.form-field-focused]="isFocused" [class.form-field-invalid]="showError" [class.form-field-disabled]="disabled" [class.form-field-readonly]="readonly">
  <mat-form-field appearance="outline" class="accessible-form-field">
    <mat-label>{{ label }}</mat-label>
    
    <input
      matInput
      [id]="inputId"
      [type]="inputType"
      [placeholder]="placeholder"
      [formControl]="control"
      [attr.aria-label]="label"
      [attr.aria-describedby]="ariaDescribedBy"
      [attr.aria-required]="required"
      [attr.aria-invalid]="showError"
      [attr.aria-disabled]="disabled"
      [attr.aria-readonly]="readonly"
      [attr.autocomplete]="type === 'email' ? 'email' : type === 'tel' ? 'tel' : 'off'"
      [attr.inputmode]="type === 'email' ? 'email' : type === 'tel' ? 'tel' : type === 'url' ? 'url' : 'text'"
      [disabled]="disabled"
      [readonly]="readonly"
      (focus)="onInputFocus()"
      (blur)="onInputBlur()"
      (input)="onInputChange($any($event.target).value)"
      #inputElement
    />
    
    <button
      *ngIf="type === 'password'"
      mat-icon-button
      matSuffix
      type="button"
      [attr.aria-label]="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
      [attr.aria-pressed]="showPassword"
      (click)="togglePasswordVisibility()"
      [disabled]="disabled"
    >
      <mat-icon>{{ showPassword ? 'visibility_off' : 'visibility' }}</mat-icon>
    </button>
    
    <mat-hint
      *ngIf="hint && !showError"
      [id]="hintId"
      [attr.aria-hidden]="false"
    >
      {{ hint }}
    </mat-hint>
    
    <mat-error
      *ngIf="showError"
      [id]="errorId"
      role="alert"
      aria-live="assertive"
    >
      <span *ngFor="let errorKey of getErrorKeys()">{{ getErrorMessage(errorKey) }}</span>
    </mat-error>
    
    <mat-icon
      *ngIf="control.valid && control.dirty && !disabled"
      matSuffix
      class="validation-icon success"
      aria-hidden="true"
    >
      check_circle
    </mat-icon>
  </mat-form-field>
</div>

// === ARCHIVO: src/app/accessible-form/components/form-field/form-field.component.spec.ts ===
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormFieldComponent } from './form-field.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatErrorModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SimpleChanges } from '@angular/core';

describe('FormFieldComponent', () => {
  let component: FormFieldComponent;
  let fixture: ComponentFixture<FormFieldComponent>;
  let liveAnnouncerMock: jasmine.SpyObj<LiveAnnouncer>;

  beforeEach(waitForAsync(() => {
    liveAnnouncerMock = jasmine.createSpyObj('LiveAnnouncer', ['announce']);

    TestBed.configureTestingModule({
      declarations: [FormFieldComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatErrorModule,
        MatIconModule
      ],
      providers: [
        { provide: LiveAnnouncer, useValue: liveAnnouncerMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldComponent);
    component = fixture.componentInstance;
    component.label = 'Correo electrónico';
    component.type = 'email';
    component.required = true;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  describe('Accesibilidad -ARIA', () => {
    it('debería tener aria-label en el input', () => {
      const inputElement = fixture.nativeElement.querySelector('input');
      expect(inputElement.getAttribute('aria-label')).toBe(component.label);
    });

    it('debería tener aria-required cuando es requerido', () => {
      const inputElement = fixture.nativeElement.querySelector('input');
      expect(inputElement.getAttribute('aria-required')).toBe('true');
    });

    it('debería tener aria-invalid cuando hay error', () => {
      component.control.setValue('');
      component.control.markAsTouched();
      fixture.detectChanges();
      const inputElement = fixture.nativeElement.querySelector('input');
      expect(inputElement.getAttribute('aria-invalid')).toBe('true');
    });

    it('debería tener aria-disabled cuando está deshabilitado', () => {
      component.disabled = true;
      fixture.detectChanges();
      const inputElement = fixture.nativeElement.querySelector('input');
      expect(inputElement.getAttribute('aria-disabled')).toBe('true');
    });

    it('debería tener aria-describedby con IDs de hint y error', () => {
      component.hint = 'Ingrese su correo';
      component.control.setValue('');
      component.control.markAsTouched();
      fixture.detectChanges();
      const inputElement = fixture.nativeElement.querySelector('input');
      const ariaDescribedBy = inputElement.getAttribute('aria-describedby');
      expect(ariaDescribedBy).toContain('form-field-correo-electrónico-error');
    });

    it('debería tener role="alert" en el mensaje de error', () => {
      component.control.setValue('');
      component.control.markAsTouched();
      fixture.detectChanges();
      const errorElement = fixture.nativeElement.querySelector('mat-error');
      expect(errorElement.getAttribute('role')).toBe('alert');
    });
  });

  describe('Navegación por teclado', () => {
    it('debería ser enfocable', () => {
      const inputElement = fixture.nativeElement.querySelector('input');
      expect(inputElement.getAttribute('tabindex')).toBeNull();
    });
  });

  describe('Retroalimentación visual', () => {
    it('debería mostrar icono de válido cuando el campo está válido y modificado', () => {
      component.control.setValue('test@example.com');
      fixture.detectChanges();
      const successIcon = fixture.nativeElement.querySelector('.validation-icon.success');
      expect(successIcon).toBeTruthy();
    });
  });

  describe('ControlValueAccessor', () => {
    it('debería escribir el valor', () => {
      component.writeValue('test@test.com');
      expect(component.control.value).toBe('test@test.com');
    });

    it('debería llamar a onChange cuando el valor cambia', () => {
      const spy = jasmine.createSpy('onChange');
      component.registerOnChange(spy);
      component.control.setValue('newvalue@test.com');
      expect(spy).toHaveBeenCalledWith('newvalue@test.com');
    });

    it('debería llamar a onTouched en blur', () => {
      const spy = jasmine.createSpy('onTouched');
      component.registerOnTouched(spy);
      component.onInputBlur();
      expect(spy).toHaveBeenCalled();
    });

    it('debería deshabilitar el control cuando setDisabledState es true', () => {
      component.setDisabledState(true);
      expect(component.control.disabled).toBe(true);
    });
  });

  describe('Validación', () => {
    it('debería mostrar mensaje de error requerido', () => {
      component.control.setValue('');
      component.control.markAsTouched();
      fixture.detectChanges();
      const errorElement = fixture.nativeElement.querySelector('mat-error');
      expect(errorElement.textContent).toContain('obligatorio');
    });

    it('debería mostrar mensaje de error de email', () => {
      component.type = 'email';
      component.control.setValue('invalid-email');
      component.control.markAsTouched();
      fixture.detectChanges();
      const errorElement = fixture.nativeElement.querySelector('mat-error');
      expect(errorElement.textContent).toContain('correo');
    });

    it('debería usar mensajes de error personalizados', () => {
      component.customErrorMessages = { required: 'Este campo es necesario' };
      component.control.setValue('');
      component.control.markAsTouched();
      fixture.detectChanges();
      const errorElement = fixture.nativeElement.querySelector('mat-error');
      expect(errorElement.textContent).toContain('necesario');
    });
  });

  describe('Seguridad', () => {
    it('debería sanitizar el input type para password', () => {
      component.type = 'password';
      component.showPassword = false;
      fixture.detectChanges();
      expect(component.inputType).toBe('password');
    });

    it('debería mostrar texto cuando showPassword es true', () => {
      component.type = 'password';
      component.showPassword = true;
      fixture.detectChanges();
      expect(component.inputType).toBe('text');
    });
  });

  describe('Anuncio a lectores de pantalla', () => {
    it('debería anunciar error cuando la validación falla', () => {
      component.control.setValue('');
      component.control.markAsTouched();
      component.validateAndAnnounce();
      expect(liveAnnouncerMock.announce).toHaveBeenCalled();
    });
  });

  describe('Casos extremos', () => {
    it('debería manejar valores nulos en writeValue', () => {
      component.writeValue(null as any);
      expect(component.control.value).toBe('');
    });

    it('debería manejar valores undefined en writeValue', () => {
      component.writeValue(undefined as any);
      expect(component.control.value).toBe('');
    });

    it('debería limpiar suscripciones al destruir', () => {
      component.ngOnDestroy();
      expect(component['destroy$'].isStopped).toBe(true);
    });
  });

// === ARCHIVO: src/app/accessible-form/accessible-form.module.ts ===
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AccessibleFormComponent } from './accessible-form.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LiveAnnouncerModule } from '@angular/cdk/a11y';

@NgModule({
  declarations: [
    AccessibleFormComponent,
    FormFieldComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    LiveAnnouncerModule
  ],
  exports: [
    AccessibleFormComponent,
    FormFieldComponent
  ]
})
export class AccessibleFormModule {
  constructor() {
    console.debug('[AccessibleFormModule] Módulo de formulario accesible inicializado correctamente');
  }
}

// === ARCHIVO: src/app/app.module.ts ===
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AccessibleFormModule } from './accessible-form/accessible-form.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AccessibleFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    console.info('[AppModule] Aplicación Angular iniciada correctamente');
  }
}

// === ARCHIVO: src/app/app.component.html ===
<div class="app-container">
  <header class="app-header" role="banner">
    <h1 class="app-title">Formulario Accesible</h1>
    <p class="app-subtitle">Cumplimiento WCAG 2.1 Nivel AA</p>
  </header>

  <main class="app-main" role="main">
    <section class="form-section" aria-labelledby="form-heading">
      <h2 id="form-heading" class="section-title">Registro de Usuario</h2>
      <p class="section-description">Complete el formulario a continuación. Todos los campos marcados con asterisco (*) son obligatorios.</p>
      
      <app-accessible-form></app-accessible-form>
    </section>

    <aside class="info-sidebar" aria-labelledby="info-heading">
      <h3 id="info-heading" class="sidebar-title">Información de Accesibilidad</h3>
      <ul class="accessibility-tips">
        <li>
          <strong>Navegación por teclado:</strong> Use Tab para mover entre campos y Enter para enviar.
        </li>
        <li>
          <strong>Lector de pantalla:</strong> Los errores se anuncian automáticamente.
        </li>
        <li>
          <strong>Contraste:</strong> Los colores cumple con la relación de contraste mínima 4.5:1.
        </li>
        <li>
          <strong>Ayuda contextual:</strong> Cada campo incluye instrucciones claras.
        </li>
      </ul>
    </aside>
  </main>

  <footer class="app-footer" role="contentinfo">
    <p>&copy; 2024 - Sistema de Formularios Accesibles</p>
    <p>Diseñado para cumplir con los estándares de accesibilidad WCAG 2.1</p>
  </footer>
</div>
```
