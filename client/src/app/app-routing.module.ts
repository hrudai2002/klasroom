import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AddResourcePageComponent } from './components/add-resource-page/add-resource-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { ResourcePageComponent } from './components/resource-page/resource-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomePageComponent}, 
  {path: 'add', component: AddResourcePageComponent, canActivate: [AuthGuard]}, 
  {path: 'about', component: AboutPageComponent}, 
  {path: 'resource/:id', component: ResourcePageComponent},
  {path: 'login', component: LoginComponent}, 
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
