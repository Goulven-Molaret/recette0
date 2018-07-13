import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { NewComponent } from './new/new.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component'
import { AuthGuardService } from './auth-guard.service';

const appRoutes: Routes = [
  {path: 'new', component: NewComponent},
  {path: 'new/:id', component: NewComponent},
  {path: 'search', component: SearchComponent},
  {path: 'search/:query', component: SearchComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] }
];
@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    NewComponent,
    IngredientComponent,
    SearchBoxComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
