import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CatalogComponent } from './components/pages/catalog/catalog.component';
import { MainPageComponent } from './components/pages/main-page/main-page/main-page.component';
import { MainSliderComponent } from './components/pages/main-page/main-slider/main-slider.component';
import { ProductPageComponent } from './components/pages/product-page/product-page.component';
import { LoginRegistrationComponent } from './components/pages/login-registration/login-registration.component';
import { AccountComponent } from './components/pages/account/account.component';
import { SearchResultComponent } from './components/pages/search-result/search-result.component';
import { ErrorPageComponent } from './components/pages/error-page/error-page.component';
import { InformationPageComponent } from './components/pages/information-page/information-page.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CatalogComponent,
    MainPageComponent,
    MainSliderComponent,
    ProductPageComponent,
    LoginRegistrationComponent,
    AccountComponent,
    SearchResultComponent,
    ErrorPageComponent,
    InformationPageComponent,
    BreadcrumbComponent,
    MainLayoutComponent,
    CartPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
