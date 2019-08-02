import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AccessDeniedComponent } from './security/access-denied.component';

@NgModule({
  declarations: [NavbarComponent, AccessDeniedComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CommonModule, RouterModule, NavbarComponent, ReactiveFormsModule, AccessDeniedComponent
  ]
})
export class SharedModule {
}
