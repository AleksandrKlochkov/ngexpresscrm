import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './shared/layouts/admin-layout/admin-layout.component';
import { LoginPageComponent } from '../login-page/login-page.component';
import { SharedModule } from '../shared/shared.module';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AuthLayoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AuthLayoutComponent, children : [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent}
        ]
      },
      {
        path: '', component: AdminLayoutComponent, children : [
          {path: '', redirectTo: '/admin/dashboard', pathMatch: 'full'},
          {path: '/dashboard', component: LoginPageComponent}
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AdminModule { }
