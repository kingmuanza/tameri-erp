import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeEditComponent } from './pages/employee/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './pages/employee/employee-list/employee-list.component';
import { EmployeeViewComponent } from './pages/employee/employee-view/employee-view.component';
import { ProductEditComponent } from './pages/product/product-edit/product-edit.component';
import { ProductListComponent } from './pages/product/product-list/product-list.component';
import { ProductViewComponent } from './pages/product/product-view/product-view.component';
import { ProductpackEditComponent } from './pages/productpack/productpack-edit/productpack-edit.component';
import { ProductpackListComponent } from './pages/productpack/productpack-list/productpack-list.component';
import { ProductpackViewComponent } from './pages/productpack/productpack-view/productpack-view.component';
import { ProducttypeEditComponent } from './pages/producttype/producttype-edit/producttype-edit.component';
import { ProducttypeListComponent } from './pages/producttype/producttype-list/producttype-list.component';
import { ResourceEditComponent } from './pages/resource/resource-edit/resource-edit.component';
import { ResourceListComponent } from './pages/resource/resource-list/resource-list.component';
import { ResourceViewComponent } from './pages/resource/resource-view/resource-view.component';
import { ResourcepackEditComponent } from './pages/resourcepack/resourcepack-edit/resourcepack-edit.component';
import { ResourcepackListComponent } from './pages/resourcepack/resourcepack-list/resourcepack-list.component';
import { ResourcepackViewComponent } from './pages/resourcepack/resourcepack-view/resourcepack-view.component';

const routes: Routes = [
  
  { path: 'employee', component: EmployeeListComponent },
  { path: 'employee/edit', component: EmployeeEditComponent },
  { path: 'employee/edit/:id', component: EmployeeEditComponent },
  { path: 'employee/view/:id', component: EmployeeViewComponent },
  
  { path: 'product', component: ProductListComponent },
  { path: 'product/edit', component: ProductEditComponent },
  { path: 'product/edit/:id', component: ProductEditComponent },
  { path: 'product/view/:id', component: ProductViewComponent },

  { path: 'productpack', component: ProductpackListComponent },
  { path: 'productpack/edit', component: ProductpackEditComponent },
  { path: 'productpack/edit/:id', component: ProductpackEditComponent },
  { path: 'productpack/view/:id', component: ProductpackViewComponent },

  
  { path: 'parameter/producttype', component: ProducttypeListComponent },
  { path: 'parameter/producttype/edit', component: ProducttypeEditComponent },
  { path: 'parameter/producttype/edit/:id', component: ProducttypeEditComponent },

  { path: 'resource', component: ResourceListComponent },
  { path: 'resource/edit', component: ResourceEditComponent },
  { path: 'resource/edit/:id', component: ResourceEditComponent },
  { path: 'resource/view/:id', component: ResourceViewComponent },

  { path: 'resourcepack', component: ResourcepackListComponent },
  { path: 'resourcepack/edit', component: ResourcepackEditComponent },
  { path: 'resourcepack/edit/:id', component: ResourcepackEditComponent },
  { path: 'resourcepack/view/:id', component: ResourcepackViewComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
