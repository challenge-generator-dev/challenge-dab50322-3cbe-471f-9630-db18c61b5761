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