import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeEditComponent } from './pages/employee/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './pages/employee/employee-list/employee-list.component';
import { EmployeeViewComponent } from './pages/employee/employee-view/employee-view.component';

const routes: Routes = [
  
  { path: 'employee', component: EmployeeListComponent },
  { path: 'employee/edit', component: EmployeeEditComponent },
  { path: 'employee/edit/:id', component: EmployeeEditComponent },
  { path: 'employee/view/:id', component: EmployeeViewComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
