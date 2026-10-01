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