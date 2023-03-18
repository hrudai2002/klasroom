import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GenericPipesModule } from './pipes/pipes.module';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddResourcePageComponent } from './components/add-resource-page/add-resource-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { ResourcePageComponent } from './components/resource-page/resource-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthToastComponent } from './toasts/auth-toast/auth-toast.component';
import { AngularEditorModule } from '@kolkov/angular-editor';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    AddResourcePageComponent,
    AboutPageComponent,
    ResourcePageComponent,
    LoginComponent,
    RegisterComponent,
    AuthToastComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot(), 
    ToastrModule.forRoot({
      maxOpened: 3,
      autoDismiss: true,
      closeButton: false
    }),
    AngularEditorModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    GenericPipesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
