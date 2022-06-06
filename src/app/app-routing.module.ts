import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import { ContactDetailsPageComponent } from './pages/contact-details-page/contact-details-page.component';
import { ContactResolverService } from './services/contact-resolver.service';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { TransactionsPageComponent } from './pages/transactions-page/transactions-page.component';
import { DashboardComponent } from './pages/dashboard-page/dashboard.component';
import { RatePageComponent } from './pages/rate-page/rate-page.component';
import { SignInComponent } from './cmp/home/sign-in/sign-in.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './cmp/home/login/login.component';
import { InfoComponent } from './cmp/home/info/info.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: '',
        component: InfoComponent,
      },
      {
        path: 'signin',
        component: SignInComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ]
  },
  {
    path: 'about',
    component: AboutPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chart',
    component: StatisticPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contact',
    component: ContactPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'trans',
    component: TransactionsPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'rate',
    component: RatePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contact/edit/:id',
    component: ContactEditComponent,
    resolve: { contact: ContactResolverService },
    canActivate: [AuthGuard]
  },
  {
    path: 'contact/edit',
    component: ContactEditComponent,
    resolve: { contact: ContactResolverService },
    canActivate: [AuthGuard]
  },
  {
    path: 'contact/:id',
    component: ContactDetailsPageComponent,
    resolve: { contact: ContactResolverService },
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true , enableTracing: true}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
