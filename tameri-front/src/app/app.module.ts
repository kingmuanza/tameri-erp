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
import { SupplierEditComponent } from './pages/supplier/supplier-edit/supplier-edit.component';
import { SupplierListComponent } from './pages/supplier/supplier-list/supplier-list.component';
import { SupplierViewComponent } from './pages/supplier/supplier-view/supplier-view.component';
import { PurchaseViewComponent } from './pages/purchase/purchase-view/purchase-view.component';
import { PurchaseListComponent } from './pages/purchase/purchase-list/purchase-list.component';
import { PurchaseEditComponent } from './pages/purchase/purchase-edit/purchase-edit.component';
import { ProductitemListComponent } from './pages/productitem/productitem-list/productitem-list.component';
import { ProductitemEditComponent } from './pages/productitem/productitem-edit/productitem-edit.component';
import { ProductitemViewComponent } from './pages/productitem/productitem-view/productitem-view.component';
import { SigninComponent } from './pages/signin/signin.component';
import { HomeComponent } from './pages/home/home.component';
import { PosComponent } from './pages/pos/pos.component';
import { ContactDisplayComponent } from './_components/contact-display/contact-display.component';
import { RequiredComponent } from './_components/required/required.component';
import { WarehouseListComponent } from './pages/warehouse/warehouse-list/warehouse-list.component';
import { WarehouseEditComponent } from './pages/warehouse/warehouse-edit/warehouse-edit.component';
import { WarehouseViewComponent } from './pages/warehouse/warehouse-view/warehouse-view.component';
import { ClientListComponent } from './pages/client/client-list/client-list.component';
import { ClientEditComponent } from './pages/client/client-edit/client-edit.component';
import { ClientViewComponent } from './pages/client/client-view/client-view.component';
import { ResourcetypeViewComponent } from './pages/resourcetype/resourcetype-view/resourcetype-view.component';
import { BillListComponent } from './pages/bill/bill-list/bill-list.component';
import { BillEditComponent } from './pages/bill/bill-edit/bill-edit.component';
import { BillViewComponent } from './pages/bill/bill-view/bill-view.component';

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
    SupplierEditComponent,
    SupplierListComponent,
    SupplierViewComponent,
    PurchaseViewComponent,
    PurchaseListComponent,
    PurchaseEditComponent,
    ProductitemListComponent,
    ProductitemEditComponent,
    ProductitemViewComponent,
    SigninComponent,
    HomeComponent,
    PosComponent,
    ContactDisplayComponent,
    RequiredComponent,
    WarehouseListComponent,
    WarehouseEditComponent,
    WarehouseViewComponent,
    ClientListComponent,
    ClientEditComponent,
    ClientViewComponent,
    ResourcetypeViewComponent,
    BillListComponent,
    BillEditComponent,
    BillViewComponent,
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
