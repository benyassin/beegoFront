import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

// Home
import { HomePage } from './pages/home/home';
import { LoginPage } from './pages/login/login';
import { SignUpComponent } from './pages/signup/signup';
import { WizardComponent } from './pages/signup/wizard';
import { CampaignPage } from './pages/campaign/campaign';
import { CampaignsPage } from './pages/campaigns/campaigns';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePage, data: { title: 'Home'} },
  { path: 'login', component: LoginPage, data: { title: 'Login'} },
  { path: 'signup', component: SignUpComponent, data: { title: 'SignUp'} },
  { path: 'wizard', component: WizardComponent, data: { title: 'Wizard'} },
  { path: 'campaign', component: CampaignPage, data: {title: 'Campaign'}},
  { path: 'campaigns', component: CampaignsPage, data: {title: 'Campaigns'}}
];

@NgModule({
  imports: [ CommonModule, RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})


export class AppRoutingModule { }
