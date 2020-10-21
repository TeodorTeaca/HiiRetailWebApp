import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TenantCurrencyService } from './services/tenant-currency.service';
import { HttpClientModule } from '@angular/common/http';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component'
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { TenantComponent } from './tenant/tenant.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    AdministratorComponent,
    TenantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent
  ],
  providers: [TenantCurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
