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