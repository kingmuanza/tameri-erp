import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityEditComponent } from './pages/community/community-edit/community-edit.component';
import { CommunityListComponent } from './pages/community/community-list/community-list.component';
import { CommunityViewComponent } from './pages/community/community-view/community-view.component';
import { CompanyEditComponent } from './pages/company/company-edit/company-edit.component';
import { CompanyListComponent } from './pages/company/company-list/company-list.component';
import { CompanyViewComponent } from './pages/company/company-view/company-view.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'company', component: CompanyListComponent },
  { path: 'company/edit', component: CompanyEditComponent },
  { path: 'company/edit/:id', component: CompanyEditComponent },
  { path: 'company/view/:id', component: CompanyViewComponent },

  { path: 'community', component: CommunityListComponent },
  { path: 'community/edit', component: CommunityEditComponent },
  { path: 'community/edit/:id', component: CommunityEditComponent },
  { path: 'community/view/:id', component: CommunityViewComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
