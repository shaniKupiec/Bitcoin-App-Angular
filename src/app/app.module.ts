import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactDetailsPageComponent } from './pages/contact-details-page/contact-details-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import { AppComponent } from './cmp/app-root/app.component';
import { ContactPreviewComponent } from './cmp/contact/contact-preview/contact-preview.component';
import { ContactListComponent } from './cmp/contact/contact-list/contact-list.component';
import { ContactFilterComponent } from './cmp/contact/contact-filter/contact-filter.component';
import { CartComponent } from './cmp/cart/cart.component';
import { AppHeaderComponent } from './cmp/app-header/app-header.component';
import { SideNavComponent } from './cmp/side-nav/side-nav.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { TransferFundComponent } from './cmp/contact/transfer-fund/transfer-fund.component';
import { TransactionsPageComponent } from './pages/transactions-page/transactions-page.component';
import { TransactionListComponent } from './cmp/transactions/transaction-list/transaction-list.component';
import { TransactionPreviewComponent } from './cmp/transactions/transaction-preview/transaction-preview.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
