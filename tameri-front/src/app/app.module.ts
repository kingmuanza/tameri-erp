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
import { ResourcepackViewComponent } from './pages/resourcepack/resourcepack-view/resourcepack-view.component';
import { ResourcepackListComponent } from './pages/resourcepack/resourcepack-list/resourcepack-list.component';
import { ResourcepackEditComponent } from './pages/resourcepack/resourcepack-edit/resourcepack-edit.component';
import { ProducttypeEditComponent } from './pages/producttype/producttype-edit/producttype-edit.component';
import { ProducttypeListComponent } from './pages/producttype/producttype-list/producttype-list.component';
import { ResourcetypeListComponent } from './pages/resourcetype/resourcetype-list/resourcetype-list.component';
import { ResourcetypeEditComponent } from './pages/resourcetype/resourcetype-edit/resourcetype-edit.component';
import { ProductcategoryListComponent } from './pages/productcategory/productcategory-list/productcategory-list.component';
import { ProductcategoryEditComponent } from './pages/productcategory/productcategory-edit/productcategory-edit.component';

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
    ResourcepackViewComponent,
    ResourcepackListComponent,
    ResourcepackEditComponent,
    ProducttypeEditComponent,
    ProducttypeListComponent,
    ResourcetypeListComponent,
    ResourcetypeEditComponent,
    ProductcategoryListComponent,
    ProductcategoryEditComponent,
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
