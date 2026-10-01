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