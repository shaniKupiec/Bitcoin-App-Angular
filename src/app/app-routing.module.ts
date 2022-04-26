import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import { ContactDetailsPageComponent } from './pages/contact-details-page/contact-details-page.component';
import { ContactResolverService } from './services/contact-resolver.service';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'contact/:id',
    component: ContactDetailsPageComponent,
    resolve: { contact: ContactResolverService },
  },
  {
    path: 'chart',
    component: StatisticPageComponent,
  },
  {
    path: 'contact',
    component: ContactPageComponent,
    children: [
      // {
      //   path: ':id',
      //   component: ContactDetailsPageComponent,
      //   resolve: { pet: ContactResolverService },
      // },
      // {
      //   path: 'edit/:id',
      //   component: PetEditComponent,
      //   resolve: { pet: PetResolverService },
      // },
      // {
      //   path: 'edit',
      //   component: PetEditComponent,
      //   resolve: { pet: PetResolverService },
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
