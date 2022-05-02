import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactDetailsPageComponent } from './pages/contact-details-page/contact-details-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { TransactionsPageComponent } from './pages/transactions-page/transactions-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppComponent } from './cmp/app-root/app.component';
import { ContactPreviewComponent } from './cmp/contact/contact-preview/contact-preview.component';
import { ContactListComponent } from './cmp/contact/contact-list/contact-list.component';
import { ContactFilterComponent } from './cmp/contact/contact-filter/contact-filter.component';
import { CartComponent } from './cmp/cart/cart.component';
import { AppHeaderComponent } from './cmp/app-header/app-header.component';
import { SideNavComponent } from './cmp/side-nav/side-nav.component';
import { TransferFundComponent } from './cmp/contact/transfer-fund/transfer-fund.component';
import { TransactionListComponent } from './cmp/transactions/transaction-list/transaction-list.component';
import { TransactionPreviewComponent } from './cmp/transactions/transaction-preview/transaction-preview.component';
import { TransferHistoryComponent } from './cmp/contact/transfer-history/transfer-history.component';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ContactDetailsPageComponent,
    ContactPageComponent,
    StatisticPageComponent,
    ContactPreviewComponent,
    ContactListComponent,
    ContactFilterComponent,
    CartComponent,
    AppHeaderComponent,
    SideNavComponent,
    ContactEditComponent,
    TransferFundComponent,
    TransactionsPageComponent,
    TransactionListComponent,
    TransactionPreviewComponent,
    TransferHistoryComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
