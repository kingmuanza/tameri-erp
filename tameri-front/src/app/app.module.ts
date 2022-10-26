import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from "angular-datatables";
import { NotifierModule } from 'angular-notifier';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppbarComponent } from './_components/appbar/appbar.component';
import { ConnexionComponent } from './_components/connexion/connexion.component';
import { EmployeeListComponent } from './pages/employee/employee-list/employee-list.component';
import { EmployeeViewComponent } from './pages/employee/employee-view/employee-view.component';
import { EmployeeEditComponent } from './pages/employee/employee-edit/employee-edit.component';
import { ResourceEditComponent } from './pages/resource/resource-edit/resource-edit.component';
import { ResourceListComponent } from './pages/resource/resource-list/resource-list.component';
import { ResourceViewComponent } from './pages/resource/resource-view/resource-view.component';
import { ProductListComponent } from './pages/product/product-list/product-list.component';
import { ProductEditComponent } from './pages/product/product-edit/product-edit.component';
import { ProductViewComponent } from './pages/product/product-view/product-view.component';
import { ProductpackEditComponent } from './pages/productpack/productpack-edit/productpack-edit.component';
import { ProductpackListComponent } from './pages/productpack/productpack-list/productpack-list.component';
import { ProductpackViewComponent } from './pages/productpack/productpack-view/productpack-view.component';

@NgModule({
  declarations: [
    AppComponent,
    AppbarComponent,
    ConnexionComponent,
    EmployeeListComponent,
    EmployeeViewComponent,
    EmployeeEditComponent,
    ResourceEditComponent,
    ResourceListComponent,
    ResourceViewComponent,
    ProductListComponent,
    ProductEditComponent,
    ProductViewComponent,
    ProductpackEditComponent,
    ProductpackListComponent,
    ProductpackViewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
          distance: 12
        },
        vertical: {
          position: 'top',
          distance: 12,
          gap: 10,

        },
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
