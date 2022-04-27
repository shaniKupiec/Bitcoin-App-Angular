import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import { ContactDetailsPageComponent } from './pages/contact-details-page/contact-details-page.component';
import { ContactResolverService } from './services/contact-resolver.service';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'chart',
    component: StatisticPageComponent,
  },
  {
    path: 'contact',
    component: ContactPageComponent,
  },
  {
    path: 'contact/edit/:id',
    component: ContactEditComponent,
    resolve: { contact: ContactResolverService },
  },
  {
    path: 'contact/edit',
    component: ContactEditComponent,
    resolve: { contact: ContactResolverService },
  },
  {
    path: 'contact/:id',
    component: ContactDetailsPageComponent,
    resolve: { contact: ContactResolverService },
  },

  // {
  //   path: 'contact',
  //   component: ContactPageComponent,
  //   children: [
  //     {
  //       path: ':id',
  //       component: ContactDetailsPageComponent,
  //       resolve: { contact: ContactResolverService },
  //     },
  //     {
  //       path: 'edit/:id',
  //       component: ContactEditComponent,
  //       // resolve: { contact: ContactResolverService },
  //     },
  //     {
  //       path: 'edit',
  //       component: ContactEditComponent,
  //       // resolve: { contact: ContactResolverService },
  //     },
  //   ],
  // },

  // {
  //   path: 'contact/:id',
  //   component: ContactDetailsPageComponent,
  //   resolve: { contact: ContactResolverService },
  // },
  // {
  //   path: '',
  //   component: ContactPageComponent,
  //   children: [
  //     {
  //       path: 'edit/:id',
  //       component: ContactEditComponent,
  //       // resolve: { contact: ContactResolverService },
  //     },
  //     {
  //       path: 'edit',
  //       component: ContactEditComponent,
  //       // resolve: { contact: ContactResolverService },
  //     },
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
