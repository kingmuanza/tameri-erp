import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityEditComponent } from './pages/community/community-edit/community-edit.component';
import { CommunityListComponent } from './pages/community/community-list/community-list.component';
import { CommunityViewComponent } from './pages/community/community-view/community-view.component';
import { CommunitytypeEditComponent } from './pages/communitytype/communitytype-edit/communitytype-edit.component';
import { CommunitytypeListComponent } from './pages/communitytype/communitytype-list/communitytype-list.component';
import { CompanyEditComponent } from './pages/company/company-edit/company-edit.component';
import { CompanyListComponent } from './pages/company/company-list/company-list.component';
import { CompanyViewComponent } from './pages/company/company-view/company-view.component';
import { CompanytypeEditComponent } from './pages/companytype/companytype-edit/companytype-edit.component';
import { CompanytypeListComponent } from './pages/companytype/companytype-list/companytype-list.component';
import { HomeComponent } from './pages/home/home.component';
import { PricingEditComponent } from './pages/pricing/pricing-edit/pricing-edit.component';
import { PricingListComponent } from './pages/pricing/pricing-list/pricing-list.component';
import { PricingViewComponent } from './pages/pricing/pricing-view/pricing-view.component';

const routes: Routes = [
  { path: 'dashboard', component: HomeComponent },

  { path: 'pricing', component: PricingListComponent },
  { path: 'pricing/edit', component: PricingEditComponent },
  { path: 'pricing/edit/:id', component: PricingEditComponent },
  { path: 'pricing/view/:id', component: PricingViewComponent },

  { path: 'company', component: CompanyListComponent },
  { path: 'company/edit', component: CompanyEditComponent },
  { path: 'company/edit/:id', component: CompanyEditComponent },
  { path: 'company/view/:id', component: CompanyViewComponent },

  { path: 'community', component: CommunityListComponent },
  { path: 'community/edit', component: CommunityEditComponent },
  { path: 'community/edit/:id', component: CommunityEditComponent },
  { path: 'community/view/:id', component: CommunityViewComponent },

  { path: 'parameter/communitytype', component: CommunitytypeListComponent },
  { path: 'parameter/communitytype/edit', component: CommunitytypeEditComponent },
  { path: 'parameter/communitytype/edit/:id', component:CommunitytypeEditComponent },

  { path: 'parameter/companytype', component: CompanytypeListComponent },
  { path: 'parameter/companytype/edit', component: CompanytypeEditComponent },
  { path: 'parameter/companytype/edit/:id', component:CompanytypeEditComponent },

  { path: '**', redirectTo:'dashboard' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
