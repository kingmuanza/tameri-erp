import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillEditComponent } from './pages/bill/bill-edit/bill-edit.component';
import { BillListComponent } from './pages/bill/bill-list/bill-list.component';
import { BillViewComponent } from './pages/bill/bill-view/bill-view.component';
import { ClientEditComponent } from './pages/client/client-edit/client-edit.component';
import { ClientListComponent } from './pages/client/client-list/client-list.component';
import { ClientViewComponent } from './pages/client/client-view/client-view.component';
import { EmployeeEditComponent } from './pages/employee/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './pages/employee/employee-list/employee-list.component';
import { EmployeeViewComponent } from './pages/employee/employee-view/employee-view.component';
import { HomeComponent } from './pages/home/home.component';
import { InventoryEditComponent } from './pages/inventory/inventory-edit/inventory-edit.component';
import { InventoryListComponent } from './pages/inventory/inventory-list/inventory-list.component';
import { InventoryViewComponent } from './pages/inventory/inventory-view/inventory-view.component';
import { InvoiceEditComponent } from './pages/invoice/invoice-edit/invoice-edit.component';
import { InvoiceListComponent } from './pages/invoice/invoice-list/invoice-list.component';
import { InvoiceViewComponent } from './pages/invoice/invoice-view/invoice-view.component';
import { PosComponent } from './pages/pos/pos.component';
import { ProductEditComponent } from './pages/product/product-edit/product-edit.component';
import { ProductListComponent } from './pages/product/product-list/product-list.component';
import { ProductViewComponent } from './pages/product/product-view/product-view.component';
import { ProductcategoryEditComponent } from './pages/productcategory/productcategory-edit/productcategory-edit.component';
import { ProductcategoryListComponent } from './pages/productcategory/productcategory-list/productcategory-list.component';
import { ProductitemEditComponent } from './pages/productitem/productitem-edit/productitem-edit.component';
import { ProductitemListComponent } from './pages/productitem/productitem-list/productitem-list.component';
import { ProductitemViewComponent } from './pages/productitem/productitem-view/productitem-view.component';
import { ProductpackEditComponent } from './pages/productpack/productpack-edit/productpack-edit.component';
import { ProductpackListComponent } from './pages/productpack/productpack-list/productpack-list.component';
import { ProductpackViewComponent } from './pages/productpack/productpack-view/productpack-view.component';
import { ProducttypeEditComponent } from './pages/producttype/producttype-edit/producttype-edit.component';
import { ProducttypeListComponent } from './pages/producttype/producttype-list/producttype-list.component';
import { ResourceitemConfirmationListComponent } from './pages/resourceitem/resourceitem-confirmation-list/resourceitem-confirmation-list.component';
import { ResourceEditComponent } from './pages/resource/resource-edit/resource-edit.component';
import { ResourceListComponent } from './pages/resource/resource-list/resource-list.component';
import { ResourceViewComponent } from './pages/resource/resource-view/resource-view.component';
import { ResourceitemEditComponent } from './pages/resourceitem/resourceitem-edit/resourceitem-edit.component';
import { ResourceitemListComponent } from './pages/resourceitem/resourceitem-list/resourceitem-list.component';
import { ResourceitemViewComponent } from './pages/resourceitem/resourceitem-view/resourceitem-view.component';
import { ResourcepackEditComponent } from './pages/resourcepack/resourcepack-edit/resourcepack-edit.component';
import { ResourcepackListComponent } from './pages/resourcepack/resourcepack-list/resourcepack-list.component';
import { ResourcepackViewComponent } from './pages/resourcepack/resourcepack-view/resourcepack-view.component';
import { ResourcetypeEditComponent } from './pages/resourcetype/resourcetype-edit/resourcetype-edit.component';
import { ResourcetypeListComponent } from './pages/resourcetype/resourcetype-list/resourcetype-list.component';
import { ResourcetypeViewComponent } from './pages/resourcetype/resourcetype-view/resourcetype-view.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SupplierEditComponent } from './pages/supplier/supplier-edit/supplier-edit.component';
import { SupplierListComponent } from './pages/supplier/supplier-list/supplier-list.component';
import { SupplierViewComponent } from './pages/supplier/supplier-view/supplier-view.component';
import { WarehouseEditComponent } from './pages/warehouse/warehouse-edit/warehouse-edit.component';
import { WarehouseListComponent } from './pages/warehouse/warehouse-list/warehouse-list.component';
import { WarehouseViewComponent } from './pages/warehouse/warehouse-view/warehouse-view.component';
import { InventorygroupEditComponent } from './pages/inventorygroup/inventorygroup-edit/inventorygroup-edit.component';
import { InventorygroupListComponent } from './pages/inventorygroup/inventorygroup-list/inventorygroup-list.component';
import { InventorygroupViewComponent } from './pages/inventorygroup/inventorygroup-view/inventorygroup-view.component';

const routes: Routes = [
  
  { path: 'signin', component: SigninComponent },
  { path: 'home', component: HomeComponent },
  { path: 'pos', component: PosComponent },

  { path: 'bill', component: BillListComponent },
  { path: 'bill/edit', component: BillEditComponent },
  { path: 'bill/edit/:id', component: BillEditComponent },
  { path: 'bill/view/:id', component: BillViewComponent },
  
  { path: 'invoice', component: InvoiceListComponent },
  { path: 'invoice/edit', component: InvoiceEditComponent },
  { path: 'invoice/edit/:id', component: InvoiceEditComponent },
  { path: 'invoice/view/:id', component: InvoiceViewComponent },
  
  { path: 'inventory', component: InventoryListComponent },
  { path: 'inventory-edit', component: InventoryEditComponent },
  { path: 'inventory/edit/:id', component: InventoryEditComponent },
  { path: 'inventory/view/:id', component: InventoryViewComponent },
  
  { path: 'inventorygroup', component: InventorygroupListComponent },
  { path: 'inventorygroup/edit', component: InventorygroupEditComponent },
  { path: 'inventorygroup/edit/:id', component: InventorygroupEditComponent },
  { path: 'inventorygroup/view/:id', component: InventorygroupViewComponent },
  
  { path: 'client', component: ClientListComponent },
  { path: 'client/edit', component: ClientEditComponent },
  { path: 'client/edit/:id', component: ClientEditComponent },
  { path: 'client/view/:id', component: ClientViewComponent },
  
  { path: 'employee', component: EmployeeListComponent },
  { path: 'employee/edit', component: EmployeeEditComponent },
  { path: 'employee/edit/:id', component: EmployeeEditComponent },
  { path: 'employee/view/:id', component: EmployeeViewComponent },
  
  { path: 'product', component: ProductListComponent },
  { path: 'product/edit', component: ProductEditComponent },
  { path: 'product/edit/:id', component: ProductEditComponent },
  { path: 'product/view/:id', component: ProductViewComponent },

  { path: 'productitem', component: ProductitemListComponent },
  { path: 'productitem/edit', component: ProductitemEditComponent },
  { path: 'productitem/edit/:id', component: ProductitemEditComponent },
  { path: 'productitem/view/:id', component: ProductitemViewComponent },

  { path: 'productpack', component: ProductpackListComponent },
  { path: 'productpack/edit', component: ProductpackEditComponent },
  { path: 'productpack/edit/:id', component: ProductpackEditComponent },
  { path: 'productpack/view/:id', component: ProductpackViewComponent },

  { path: 'parameter/producttype', component: ProducttypeListComponent },
  { path: 'parameter/producttype/edit', component: ProducttypeEditComponent },
  { path: 'parameter/producttype/edit/:id', component: ProducttypeEditComponent },

  { path: 'parameter/productcategory', component: ProductcategoryListComponent },
  { path: 'parameter/productcategory/edit', component: ProductcategoryEditComponent },
  { path: 'parameter/productcategory/edit/:id', component: ProductcategoryEditComponent },

  { path: 'parameter/resourcecategory', component: ResourcetypeListComponent },
  { path: 'parameter/resourcecategory/edit', component: ResourcetypeEditComponent },
  { path: 'parameter/resourcecategory/edit/:id', component: ResourcetypeEditComponent },
  { path: 'parameter/resourcecategory/view/:id', component: ResourcetypeViewComponent },

  { path: 'resource', component: ResourceListComponent },
  { path: 'resource/edit', component: ResourceEditComponent },
  { path: 'resource/edit/:id', component: ResourceEditComponent },
  { path: 'resource/view/:id', component: ResourceViewComponent },

  { path: 'resourceitem-confirmation', component: ResourceitemConfirmationListComponent },
  
  { path: 'resourceitem', component: ResourceitemListComponent },
  { path: 'resourceitem/edit', component: ResourceitemEditComponent },
  { path: 'resourceitem/edit/:id', component: ResourceitemEditComponent },
  { path: 'resourceitem/view/:id', component: ResourceitemViewComponent },

  { path: 'resourcepack', component: ResourcepackListComponent },
  { path: 'resourcepack/edit', component: ResourcepackEditComponent },
  { path: 'resourcepack/edit/:id', component: ResourcepackEditComponent },
  { path: 'resourcepack/view/:id', component: ResourcepackViewComponent },

  { path: 'supplier', component: SupplierListComponent },
  { path: 'supplier/edit', component: SupplierEditComponent },
  { path: 'supplier/edit/:id', component: SupplierEditComponent },
  { path: 'supplier/view/:id', component: SupplierViewComponent },

  { path: 'warehouse', component: WarehouseListComponent },
  { path: 'warehouse/edit', component: WarehouseEditComponent },
  { path: 'warehouse/edit/:id', component: WarehouseEditComponent },
  { path: 'warehouse/view/:id', component: WarehouseViewComponent },

  { path: '**', redirectTo: 'signin' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
