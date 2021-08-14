
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewHomepageComponent } from './pages/new-homepage/new-homepage.component';
import { NewRegisterpageComponent } from './pages/new-registerpage/new-registerpage.component';

export const routes: Routes = [
  {
    path: 'home',
    component: NewHomepageComponent
  },
  {
    path: 'register-now',
    component: NewRegisterpageComponent
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'error/404', pathMatch: 'full' },
];

@NgModule({

  imports: [
    RouterModule.forRoot(routes , {
    useHash: false,
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload',
    scrollPositionRestoration: 'enabled',
    scrollOffset: [0, 64],
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
