import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IgxStepperModule } from 'igniteui-angular';
import { DataTablesModule } from "angular-datatables";
import { NotifierModule } from 'angular-notifier';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/home/home.component';
import { AppbarComponent } from './_components/appbar/appbar.component';
import { CompanyListComponent } from './pages/company/company-list/company-list.component';
import { CompanyEditComponent } from './pages/company/company-edit/company-edit.component';
import { CompanyViewComponent } from './pages/company/company-view/company-view.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommunityEditComponent } from './pages/community/community-edit/community-edit.component';
import { CommunityListComponent } from './pages/community/community-list/community-list.component';
import { CommunityViewComponent } from './pages/community/community-view/community-view.component';
import { PricingEditComponent } from './pages/pricing/pricing-edit/pricing-edit.component';
import { PricingListComponent } from './pages/pricing/pricing-list/pricing-list.component';
import { PricingViewComponent } from './pages/pricing/pricing-view/pricing-view.component';
import { CommunitytypeListComponent } from './pages/communitytype/communitytype-list/communitytype-list.component';
import { CommunitytypeEditComponent } from './pages/communitytype/communitytype-edit/communitytype-edit.component';
import { CompanytypeEditComponent } from './pages/companytype/companytype-edit/companytype-edit.component';
import { CompanytypeListComponent } from './pages/companytype/companytype-list/companytype-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppbarComponent,
    CompanyListComponent,
    CompanyEditComponent,
    CompanyViewComponent,
    CommunityEditComponent,
    CommunityListComponent,
    CommunityViewComponent,
    PricingEditComponent,
    PricingListComponent,
    PricingViewComponent,
    CommunitytypeListComponent,
    CommunitytypeEditComponent,
    CompanytypeEditComponent,
    CompanytypeListComponent
  ],
  imports: [
    BrowserModule,
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
    FormsModule,
    AppRoutingModule,
    DataTablesModule,
    NgbModule,
    IgxStepperModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
