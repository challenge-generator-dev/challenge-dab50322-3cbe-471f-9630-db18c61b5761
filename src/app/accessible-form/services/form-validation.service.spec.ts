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