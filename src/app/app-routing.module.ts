import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministratorComponent } from './administrator/administrator.component';
import { CustomerComponent } from './customer/customer.component';
import { LoginComponent } from './login/login.component';
import { TenantComponent } from './tenant/tenant.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: LoginComponent },
  { path: 'tenant', component: TenantComponent },
  { path: 'administrator', component: AdministratorComponent },
  { path: 'customer', component: CustomerComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
