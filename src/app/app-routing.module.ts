import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmDetailsComponent } from './components/pages/film-details/film-details.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SearchResultsComponent } from './components/pages/search-results/search-results.component';
import { LoginComponent } from './auth/login/login.component';
import { SingUpComponent } from './auth/sing-up/sing-up.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'details/:id', component: FilmDetailsComponent},
  { path: 'searchResult', component: SearchResultsComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SingUpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 