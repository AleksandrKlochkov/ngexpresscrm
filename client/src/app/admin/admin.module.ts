import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutComponent } from './shared/layouts/admin-layout/admin-layout.component';
import { SharedModule } from '../shared/shared.module';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';


import { StaffPageComponent } from './staff-page/staff-page.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { OrderCategoriesComponent } from './order-page/order-categories/order-categories.component';
import { OrderPositionsComponent } from './order-page/order-positions/order-positions.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { CategoriesFormComponent } from './categories-page/categories-form/categories-form.component';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';
import { ContactsFormComponent } from './contacts-page/contacts-form/contacts-form.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HistoryListComponent } from './history-page/history-list/history-list.component';
import { HistoryFilterComponent } from './history-page/history-filter/history-filter.component';
import { PositionsFormComponent } from './categories-page/categories-form/positions-form/positions-form.component';
import { LoaderComponent } from './shared/components/loader/loader.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AuthLayoutComponent,
    LoginPageComponent,
    StaffPageComponent,
    OverviewPageComponent,
    AnalyticsPageComponent,
    HistoryPageComponent,
    OrderPageComponent,
    CategoriesPageComponent,
    LoaderComponent,
    CategoriesFormComponent,
    PositionsFormComponent,
    OrderCategoriesComponent,
    OrderPositionsComponent,
    HistoryListComponent,
    HistoryFilterComponent,
    ContactsPageComponent,
    ContactsFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '', component: AuthLayoutComponent, children : [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent}
        ]
      },
      {
        path: '', component: AdminLayoutComponent, children : [
          {path: '', redirectTo: '/admin/overwiew', pathMatch: 'full'},
          {path: 'overview', component: OverviewPageComponent},
          {path: 'analytics', component: AnalyticsPageComponent},
          {path: 'history', component: HistoryPageComponent},
          {path: 'order', component: OrderPageComponent, children: [
              {path: '', component: OrderCategoriesComponent},
              {path: ':id', component: OrderPositionsComponent}
          ] },
          {path: 'categories', component: CategoriesPageComponent},
          {path: 'categories/new', component: CategoriesFormComponent},
          {path: 'categories/:id', component: CategoriesFormComponent},
          {path: 'contacts', component: ContactsPageComponent},
          {path: 'contacts/:id', component: ContactsFormComponent},
          {path: 'staff', component: StaffPageComponent}
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AdminModule { }
