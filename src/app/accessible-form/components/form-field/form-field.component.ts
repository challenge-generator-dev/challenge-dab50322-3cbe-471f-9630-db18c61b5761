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