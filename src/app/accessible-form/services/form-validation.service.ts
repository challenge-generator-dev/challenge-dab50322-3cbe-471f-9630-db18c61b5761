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