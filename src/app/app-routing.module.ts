import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

// Home
import { HomePage } from './pages/home/home';
import { LoginPage } from './pages/login/login';
import { SignUpComponent } from './pages/signup/signup';
import { WizardComponent } from './pages/signup/wizard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePage, data: { title: 'Home'} },
  { path: 'login', component: LoginPage, data: { title: 'Login'} },
  { path: 'signup', component: SignUpComponent, data: { title: 'SignUp'} },
  { path: 'wizard', component: WizardComponent, data: { title: 'Wizard'} },
];

@NgModule({
  imports: [ CommonModule, RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})


export class AppRoutingModule { }
