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