import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PosterComponent} from './components/poster/poster.component';
import {QrcodeComponent} from './components/qrcode/qrcode.component';
import {FormsModule} from '@angular/forms';
import {IntegrationComponent} from './components/integration/integration.component';
import {SaleDataComponent} from './components/sale-data/sale-data.component';
import {HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    PosterComponent,
    QrcodeComponent,
    IntegrationComponent,
    SaleDataComponent,
    HomeComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
