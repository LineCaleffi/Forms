import { CampoControlErroComponent } from './../campo-control-erro/campo-control-erro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplateFormComponent } from './template-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from '../form-debug/form-debug.component';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    TemplateFormComponent,
    FormDebugComponent,
    CampoControlErroComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class TemplateFormModule { }
