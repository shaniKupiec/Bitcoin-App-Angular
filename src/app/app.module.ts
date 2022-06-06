import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';
// import { ServiceWorkerModule } from '@angular/service-worker';

import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ContactDetailsPageComponent } from './pages/contact-details-page/contact-details-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { TransactionsPageComponent } from './pages/transactions-page/transactions-page.component';
import { DashboardComponent } from './pages/dashboard-page/dashboard.component';
import { RatePageComponent } from './pages/rate-page/rate-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AppComponent } from './cmp/app-root/app.component';
import { ContactPreviewComponent } from './cmp/contact/contact-preview/contact-preview.component';
import { ContactListComponent } from './cmp/contact/contact-list/contact-list.component';
import { ContactFilterComponent } from './cmp/contact/contact-filter/contact-filter.component';
import { AppHeaderComponent } from './cmp/app-header/app-header.component';
import { SideNavComponent } from './cmp/side-nav/side-nav.component';
import { TransferFundComponent } from './cmp/contact/transfer-fund/transfer-fund.component';
import { TransactionListComponent } from './cmp/transactions/transaction-list/transaction-list.component';
import { TransactionPreviewComponent } from './cmp/transactions/transaction-preview/transaction-preview.component';
import { RateComponent } from './cmp/rate/rate.component';
import { CoinDataComponent } from './cmp/dashboard/coin-data/coin-data.component';
import { SignInComponent } from './cmp/home/sign-in/sign-in.component';
import { LoginComponent } from './cmp/home/login/login.component';
import { InfoComponent } from './cmp/home/info/info.component';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    AboutPageComponent,
    ContactDetailsPageComponent,
    ContactPageComponent,
    StatisticPageComponent,
    ContactPreviewComponent,
    ContactListComponent,
    ContactFilterComponent,
    AppHeaderComponent,
    SideNavComponent,
    ContactEditComponent,
    TransferFundComponent,
    TransactionsPageComponent,
    TransactionListComponent,
    TransactionPreviewComponent,
    DashboardComponent,
    RatePageComponent,
    RateComponent,
    CoinDataComponent,
    SignInComponent,
    HomePageComponent,
    LoginComponent,
    InfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory }),
    BrowserAnimationsModule,
    NgxChartsModule,
    NgChartsModule,
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: environment.production,
    //   // Register the ServiceWorker as soon as the application is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000'
    // }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
